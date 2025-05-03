import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET=process.env.JWT_SECRET;


export const protect = (requiredRole=[]) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // use correct header
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const payload = jwt.verify(token, JWT_SECRET);

      // Check if role matches
      if ( !requiredRole.includes(payload.role) ) {
        return res.status(403).json({ message: `Access denied: ${requiredRole} only` });
      }
      req.body = {...req.body, userId:payload.id, role:payload.role}; // Attach full payload (id, role, email, etc.)
      next();
    } catch (error) {
      console.error("Auth error:", error);
      res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};
