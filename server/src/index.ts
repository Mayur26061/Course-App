import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import adminRoute from "./routes/adminRoute";
import userRoute from "./routes/userRoute";
import instructorRoute from "./routes/instructorRoute";

dotenv.config();

const app = express();

const corsConfig = {
  origin:['http://localhost:5173','http://localhost:5174','http://localhost:5175'],
  credentials: true,
};
app.use(cors(corsConfig));
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/learner", userRoute);
app.use("/api/instructor", instructorRoute);
app.use("/api/admin", adminRoute);

app.listen(3002, () => {
  console.log("Server is listening on port 3000");
});
