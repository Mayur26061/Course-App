/* eslint-disable no-undef */
import express from "express";
import { User, Course } from "../db/schema";
import { generateToken, AuthenticateUser, CustomRequest } from "../middleware/auth";
import {getCourse, userSignIn, userSignUp} from "../controllers/userController"


const router = express.Router()

router.post("/signup", userSignUp);

router.post("/login", userSignIn);
// async (req:CustomRequest, res) => {
//   const { username, password } = req.headers;
//   let userExist = await User.findOne({ username, password });
//   if (userExist) {
//     const token = generateToken({ id: String(userExist._id),  user:{username:userExist.username} });
//     return res.send({ message: "Logged in successfully", token, user:userExist });
//   }
//   res.status(401).send({ error: "User not found" });
// });

router.get("/courses",AuthenticateUser,getCourse)
  //  async (req:CustomRequest, res) => {
//   const course = await Course.find({ published: true })
//   res.send({ courses: course });
// });

// router.post("/courses/:courseId", AuthenticateUser, async (req:CustomRequest, res) => {
//   try {
//     const courseId = req.params.courseId;
//     let selectedCourse = await Course.findOne({ _id: courseId, published: true });
//     if (selectedCourse) {
//       let currentUser = await User.findOne({ username: req.user?.username }).populate('purchaseCourses');
//       if (currentUser) {
//         // currentUser.purchaseCourses.push(selectedCourse);
//         await currentUser.save()
//         return res.send({ message: "Course purchased successfully" });
//       }
//     res.sendStatus(500);
//   } else {
//     res.status(404).send({ error: "Course not found" });
//   }
// }
// catch (err) {
//   console.log(err)
//   res.status(500).send({ error: "Something went wrong" });

// }
//   });

// router.get("/purchasedCourses", AuthenticateUser, async (req:CustomRequest, res) => {
//   let currentUser = await User.findOne({ username: req.user?.username }).populate({
//     path: 'purchaseCourses',
//     match: { published: true }
//   });
//   if (currentUser) {
//     res.send({ purchasecourse: currentUser.purchaseCourses });
//   } else {
//     res.sendStatus(500);
//   }
// });

// router.get("/course/:cid",async(req:CustomRequest, res)=>{
//   let courseId = req.params.cid 
//   const course = await Course.findById(courseId).populate('content')
//   res.send({ course })
//   // res.status(404).send({error:"Not Found"})
// })

// router.get("/me", AuthenticateUser, async (req:CustomRequest, res) => {
//   const isExist = await User.findById(req.user)
//   if (!isExist){
//     return res.status(404).send({error:"User not found"});
//   }
//   res.send({ user: isExist })
// })

export default router
