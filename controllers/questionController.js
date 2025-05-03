import Question from "../models/Question.js";
import Answer from "../models/Answer.js";

// Create a question
export const createQuestion = async (req, res) => {
  try {
    const { title, description, userId, skill  } = req.body;
    const newQuestion = new Question({
      userId,
      title,
      description,
      skill
    });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ message: "Failed to create question", error: err });
  }
};

// Get all questions of logged-in user
export const getUserQuestions = async (req, res) => {
  try {
    const { userId, page = 1, perPage = 10, skillId } = req.query;

    let filter = userId ? { userId } : {};
     filter = skillId ? {...filter, skill:skillId } : {};
    
    const questions = await Question.find(filter)
      .populate({ path: "userId", select: "name" })
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    const total = await Question.countDocuments(filter);

    res.json({
      questions:questions.map((q) => ({
        _id: q._id,
        title: q.title,
        description: q.description,
        skill: q.skill,
        isResolved: q.isResolved,
        name: q.userId?.name || "Unknown",
      })),
      total,
      page: Number(page),
      perPage: Number(perPage),
      totalPages: Math.ceil(total / perPage),
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch questions", error: err });
  }
};
export const getSingleDiscussion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id).populate("userId", "name");

    const replies = await Answer.find({ questionId: question._id })
      .sort({ createdAt: -1 })  // Fix typo: 'createAt' → 'createdAt'
      .populate("userId", "name"); // populate only the 'name' field of the user

    res.json({
      question,
      replies,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch question", error: err });
  }
};


export const discussionReply = async (req, res) => {
  try {

    await Answer.create(req.body)

    res.json({
      message:"Commented Successfully"
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to fetch questions", error: err });
  }
};

// Mark question as resolved
export const resolveQuestion = async (req, res) => {
  try {
    const question = await Question.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { isResolved: true },
      { new: true }
    );
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.json({ message: "Marked as resolved", question });
  } catch (err) {
    res.status(500).json({ message: "Failed to resolve question", error: err });
  }
};
