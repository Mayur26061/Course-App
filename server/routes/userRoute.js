/* eslint-disable no-undef */
const express = require("express");
const { User, Course } = require("../db/schema")
const { generateToken, AuthenticateUser } = require("../middleware/auth")

const router = express.Router()

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const existUser = await User.findOne({ username });
    if (existUser) {
      return res.status(409).send({ error: "Username already exist" });
    }
    const newUser = await User.create({ username, password });
    const token = generateToken({ id: newUser._id, username:newUser });
    return res
      .status(201)
      .send({ message: "User created successfully", token,user:newUser });
  }
  res.status(400).send({ error: "Bad request" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  let userExist = await User.findOne({ username, password });
  if (userExist) {
    const token = generateToken({ id: userExist._id,  username:userExist });
    return res.send({ message: "Logged in successfully", token, user:userExist });
  }
  res.status(401).send({ error: "User not found" });
});

router.get("/courses", async (req, res) => {
  const course = await Course.find({ published: true })
  res.send({ courses: course });
});

router.post("/courses/:courseId", AuthenticateUser, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    let selectedCourse = await Course.findOne({ _id: courseId, published: true });
    if (selectedCourse) {
      let currentUser = await User.findOne({ username: req.user.username }).populate('purchaseCourses');
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
  let currentUser = await User.findOne({ username: req.user.username }).populate({
    path: 'purchaseCourses',
    match: { published: true }
  });
  if (currentUser) {
    res.send({ purchasecourse: currentUser.purchaseCourses });
  } else {
    res.sendStatus(500);
  }
});

router.get("/course/:cid",async(req, res)=>{
  let courseId = req.params.cid 
  const course = await Course.findById(courseId).populate('content')
  res.send({ course })
  // res.status(404).send({error:"Not Found"})
})

router.get("/me", AuthenticateUser, async (req, res) => {
  const isExist = await User.findById(req.user._id)
  if (!isExist){
    return res.status(404).send({error:"User not found"});
  }
  res.send({ user: isExist })
})

module.exports = router
