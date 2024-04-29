import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user-route.js";
import authRoute from "./routes/auth-route.js";

const app = express();
dotenv.config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Mogodb connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server running on PORT- ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

//middleware handling errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
