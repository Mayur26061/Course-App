/* eslint-disable no-undef */
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors")
const adminRoute = require("./routes/adminRoute")
const userRoute = require("./routes/userRoute")
require("dotenv").config();

const app = express();

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());

app.use('/admin', adminRoute)
app.use('/users', userRoute)

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

async function connectDB(){
  try{
    await mongoose.connect(process.env.MONGO_CONNECTION_URI);
    console.log("DB Connected")
  }catch{
    console.log("Failed to connect DB")
  }
}

connectDB()
