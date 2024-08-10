import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// import adminRoute from "./routes/adminRoute";
import userRoute from "./routes/userRoute";
import instructorRoute from "./routes/instructorRoute";

dotenv.config();

const app = express();

const corsConfig = {
  origin:'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsConfig));
app.use(express.json());
app.use(bodyParser.json());

// app.use("/admin", adminRoute);
app.use("/api/learner", userRoute);
app.use("/api/instructor", instructorRoute);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
