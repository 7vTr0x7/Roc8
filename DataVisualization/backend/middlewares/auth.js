import jwt from "jsonwebtoken";
import { VisualizationUser } from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  if (!req.cookies) {
    return res.status(500).json({ success: false, message: "Login First" });
  }
  const { token } = req?.cookies;

  if (!token) {
    return res.status(500).json({ success: false, message: "Login First" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await VisualizationUser.findById(decoded._id);
  next();
};
