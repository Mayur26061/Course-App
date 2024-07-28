import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// import adminRoute from "./routes/adminRoute";
import userRoute from "./routes/userRoute";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// app.use("/admin", adminRoute);
app.use("/api/learner", userRoute);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
