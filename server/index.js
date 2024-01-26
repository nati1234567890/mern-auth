import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./routes/UserRoute.js";
import AuthRouter from "./routes/AuthRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    app.listen(3000, () => {
      console.log("connected to db listen on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);
app.use((err, req, res, next) => {
  const statusCode = err.sttusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({ success: false, message, statusCode });
});
