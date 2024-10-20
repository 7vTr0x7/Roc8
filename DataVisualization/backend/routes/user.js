import express from "express";
import {
  getChartData,
  getUser,
  login,
  logout,
  registerUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", registerUser);
router.post("/logout", isAuthenticated, logout);

router.get("/chart/data", isAuthenticated, getChartData);

export default router;
