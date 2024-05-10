/* eslint-disable no-undef */
const express = require("express");
const router = express.Router()
const { Admin, Course, Content } = require("../db/schema")
const { generateToken, AuthenticateUser } = require("../middleware/auth")

router.post("/signup", async (req, res) => {
    let uname = req.body.username;
    let pass = req.body.password;
    if (uname && pass) {
        let admin = await Admin.findOne({ username: uname });
        if (admin) {
            return res.status(409).send({ error: "Admin username already exist" });
        } else {
            let credential = { username: uname, password: pass };
            const newUser = await Admin.create(credential);
            let token = generateToken({ id: newUser._id, username: uname });
            return res
                .status(201)
                .send({ message: "Admin created successfully", token });
        }
    }
    res.status(400).send({ error: "Bad request" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.headers;
    let adminExist = await Admin.findOne({
        username: username,
        password: password,
    });
    if (adminExist) {
        let token = generateToken({ id: adminExist._id, username });
        return res.send({ message: "Logged in successfully", token });
    }
    res.status(200).send({ error: "User not found" });
});

router.post("/courses", AuthenticateUser, async (req, res) => {
    // logic to create a course
    let course = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price || 0,
        imageLink: req.body.imageLink || "",
        published: req.body.published || false,
    };
    console.log(req.user)
    const newCourse = await Course.create(course);

    res.send({
        message: "Course created successfully",
        courseId: newCourse._id,
    });
});

router.put("/courses/:courseId", AuthenticateUser, async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.courseId,
            req.body,
            {
                new: true,
            }
        );
        if (course) {
            return res.send({ message: "Updated", data: course });
        }
        return res.status(404).send({ message: "Course not found" });
    } catch (error) {
        return res.sendStatus(503);
    }
});

router.get("/courses", AuthenticateUser, async (req, res) => {
    // logic to get all courses
    const course = await Course.find({});
    res.send({ courses: course });
});

router.get("/getcourse", AuthenticateUser, async (req, res) => {
    const course = await Course.findById(req.query.courseId).populate('content')
    if (!course) {
        return res.status(500).send({ error: "Something went wrong" })
    }
    res.send({ course })
})

router.get("/me", AuthenticateUser, async (req, res) => {
    res.send({ user: req.user })
})
router.post("/:courseId/content", AuthenticateUser, async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
        return res.status(500).send({ error: "Something went wrong" })
    }
    const co = {
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        url: req.body.url,
        published: req.body.published || true,
        courses: course._id
    }
    const content = await Content.create(co);
    course.content.push(content);
    await course.save()
    res.send({ cont: content })
})
router.put("/content/:contentId", AuthenticateUser, async (req, res) => {
    const content = await Content.findByIdAndUpdate(
        req.params.contentId,
        req.body,
        {
            new: true,
        });
    res.send({ cont: content })
})
router.get("/content/:contentId", AuthenticateUser, async (req, res) => {
    const content = await Content.findById(req.params.contentId);
    res.send({ cont: content })
})
module.exports = router
