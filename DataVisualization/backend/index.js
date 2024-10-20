import express from "express";
import cors from "cors";
import { initializeDatabase } from "./db/db.connection.js";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
config({ path: "D:/DataVisualization/backend/.env" });

const app = express();

app.use(express.json());

const corsOption = {
  origin: ["http://localhost:5173", "https://charts-v1.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOption));

app.use(cookieParser());

app.use("/api/user", userRouter);

initializeDatabase();

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
