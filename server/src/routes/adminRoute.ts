// /* eslint-disable no-undef */
// import express from "express";
// import { Admin, Course, Content } from "../db/schema";
// import { generateToken, AuthenticateUser,CustomRequest } from "../middleware/auth";

// const router = express.Router()

// const getContent = async (query={})=>{
//     const content = await Content.find(query)
//     return content
// }

// router.post("/signup", async (req, res) => {
//     let uname = req.body.username;
//     let pass = req.body.password;
//     if (uname && pass) {
//         let admin = await Admin.findOne({ username: uname });
//         if (admin) {
//             return res.status(409).send({ error: "Admin username already exist" });
//         } else {
//             let credential = { username: uname, password: pass };
//             const newUser = await Admin.create(credential);
//             let token = generateToken({ id: String(newUser._id), user: {username:uname }});
//             return res
//                 .status(201)
//                 .send({ message: "Admin created successfully", token });
//         }
//     }
//     res.status(400).send({ error: "Bad request" });
// });

// router.post("/login", async (req, res) => {
//     const { username, password } = req.headers;
//     let adminExist = await Admin.findOne({
//         username: username,
//         password: password,
//     });
//     if (adminExist) {
//         let token = generateToken({ id: String(adminExist._id), user:{username:adminExist.username} });
//         return res.send({ message: "Logged in successfully", token });
//     }
//     res.status(200).send({ error: "User not found" });
// });

// router.post("/courses", AuthenticateUser, async (req:CustomRequest, res) => {
//     let course = {
//         title: req.body.title,
//         description: req.body.description,
//         price: req.body.price || 0,
//         imageLink: req.body.imageLink || "",
//         published: req.body.published || false,
//     };
//     console.log(req.user)
//     const newCourse = await Course.create(course);

//     res.send({
//         message: "Course created successfully",
//         courseId: newCourse._id,
//     });
// });

// router.put("/courses/:courseId", AuthenticateUser, async (req:CustomRequest, res) => {
//     try {
//         const course = await Course.findByIdAndUpdate(
//             req.params.courseId,
//             req.body,
//             {
//                 new: true,
//             }
//         );
//         if (course) {
//             return res.send({ message: "Updated", data: course });
//         }
//         return res.status(404).send({ message: "Course not found" });
//     } catch (error) {
//         return res.sendStatus(503);
//     }
// });

// router.get("/courses", AuthenticateUser, async (req:CustomRequest, res) => {
//     const course = await Course.find({});
//     res.send({ courses: course });
// });

// router.get("/getcourse", AuthenticateUser, async (req:CustomRequest, res) => {
//     const course = await Course.findById(req.query.courseId)
//     const content = await getContent({"courses":course._id})
//     if (!course) {
//         return res.status(404).send({ error: "Course not found" })
//     }
//     res.send({ course,content })
// })

// router.get("/me", AuthenticateUser, async (req:CustomRequest, res) => {
//     res.send({ user: req.user })
// })

// router.post("/:courseId/content", AuthenticateUser, async (req:CustomRequest, res) => {
//     const course = await Course.findById(req.params.courseId);
//     if (!course) {
//         return res.status(500).send({ error: "Something went wrong" })
//     }
//     const co = {
//         title: req.body.title,
//         description: req.body.description,
//         type: req.body.type,
//         url: req.body.url,
//         published: req.body.published || true,
//         courses: course._id
//     }
//     const content = await Content.create(co);
//     // course.content.push(content);
//     // await course.save()
//     res.send({ cont: content })
// })

// router.put("/content/:contentId", AuthenticateUser, async (req, res) => {
//     const content = await Content.findByIdAndUpdate(
//         req.params.contentId,
//         req.body,
//         {
//             new: true,
//         });
//     res.send({ cont: content })
// })

// router.get("/content/:contentId", AuthenticateUser, async (req, res) => {
//     const content = await Content.findById(req.params.contentId);
//     res.send({ cont: content })
// })

// router.get("/content", AuthenticateUser, async (req, res) => {
//     const content = await getContent({"courses":req.query.courseId});
//     res.send(content)
// })

// router.delete("/course/delete/:courseId", AuthenticateUser, async (req, res) => {
//     await Course.findByIdAndDelete(req.params.courseId)
//     res.send({ message: "Course Deleted" })
// })

// router.delete("/content/delete/:contentId", AuthenticateUser, async (req, res) => {
//     await Content.findByIdAndDelete(req.params.contentId)
//     res.send({ message: "Content Deleted" })

// })

// export default router
