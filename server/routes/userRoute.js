/* eslint-disable no-undef */

const express = require("express");
const router = express.Router()
const { User, Course } = require("../db/schema")
const { generateToken, AuthenticateUser } = require("../middleware/auth")

router.post("/signup", async (req, res) => {
  // logic to sign up user
  const { username, password } = req.body;
  if (username && password) {
    const existUser = await User.findOne({ username });
    if (existUser) {
      return res.status(409).send({ error: "Username already exist" });
    }
    const newUser = await User.create({ username, password });
    const token = generateToken({ id: newUser._id, username });
    return res
      .status(201)
      .send({ message: "User created successfully", token });
  }
  res.status(400).send({ error: "Bad request" });
});

router.post("/login", async (req, res) => {
  // logic to log in user
  const { username, password } = req.headers;
  let userExist = await User.findOne({ username, password });
  if (userExist) {
    const token = generateToken({ id: userExist._id, username });
    return res.send({ message: "Logged in successfully", token });
  }
  res.status(401).send({ error: "User not found" });
});

router.get("/courses", AuthenticateUser, async (req, res) => {
  // logic to list all courses
  const course = await Course.find({ published: true })
  res.send({ courses: course });
});

router.post("/courses/:courseId", AuthenticateUser, async (req, res) => {
  // logic to purchase a course
  try {
    const courseId = req.params.courseId;
    let selectedCourse = await Course.findOne({ _id: courseId, published: true });
    if (selectedCourse) {
      let currentUser = await User.findOne({ username: req.user }).populate('purchaseCourses');
      if (currentUser) {
        currentUser.purchaseCourses.push(selectedCourse);
        await currentUser.save()
        return res.send({ message: "Course purchased successfully" });
      }
    res.sendStatus(500);
  } else {
    res.status(404).send({ error: "Course not found" });
  }
}
catch (err) {
  console.log(err)
  res.status(500).send({ error: "Something went wrong" });

}
  });

router.get("/purchasedCourses", AuthenticateUser, async (req, res) => {
  // logic to view purchased courses
  let currentUser = await User.findOne({ username: req.user }).populate({
    path: 'purchaseCourses',
    match: { published: true }
  });
  if (currentUser) {
    res.send({ purchasecourse: currentUser.purchaseCourses });
  } else {
    res.sendStatus(500);
  }
});

module.exports = router
