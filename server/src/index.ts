import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import adminRoute from "./routes/adminRoute";
import userRoute from "./routes/userRoute";

dotenv.config();

const app = express();

const corsConfig = {
  origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/learner", userRoute);
app.use("/api/admin", adminRoute);

app.listen(3002, () => {
  console.log("Server is listening on port 3000");
});
