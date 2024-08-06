import { Request } from "express";
import { z } from "zod";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

import { generateToken } from "../middleware/auth";
import prisma from "../utils/client";
import { reqObj } from "../utils/utils";

const signCheck = z.object({
  username: z.string().email().min(1),
  password: z.string().min(6),
});

const signUpCheck = signCheck.extend({
  name: z.string().min(1),
});

type signUp = z.infer<typeof signUpCheck>;

// SignUp logic
export const userSignUp = asyncHandler(async (req, res) => {
  const result = signUpCheck.safeParse(req.body);
  if (result.error) {
    res.json({
      error: true,
      message: "Invalid Inputs",
    });
    return;
  }
  const { username, password, name } = req.body;
  const existUser = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  if (existUser) {
    res.json({
      error: true,
      message: `User already exist for type ${existUser.userType}`,
    });
    return;
  }

  const record = await prisma.user.create({
    data: {
      username,
      name,
      password: bcrypt.hashSync(password, 8),
      userType: "learner",
      isApproved: true,
    },
  });
  const token = generateToken({ id: record.id, username: username }, "learner");
  res.setHeader("set-cookie", `token=${token}; HttpOnly;`);
  res.send({ error: false });
});

// Signin logic
export const userSignIn = asyncHandler(async (req, res) => {
  const result = signCheck.safeParse(req.body);
  if (result.error) {
    res.json({
      error: true,
      message: "Invalid Inputs",
    });
    return;
  }
  const { username, password } = req.body;

  const existUser = await prisma.user.findFirst({
    where: {
      username: username,
      userType: "learner",
    },
    include: {
      user_courses: true,
    },
  });
  if (!existUser) {
    res.json({
      error: true,
      message: "Can't find user please signUp",
    });
    return;
  }

  if (!bcrypt.compareSync(password, existUser.password)) {
    res.json({
      error: true,
      message: "Incorrect password",
    });
    return;
  }
  const token = generateToken(
    { id: existUser.id, username: username },
    "learner"
  );
  const { password: pwd, ...user } = existUser;
  res.setHeader("set-cookie", `token=${token}; HttpOnly; Max-Age=60*60*24*2`);
  res.send({ error: false, user });
});

// get all publish course
export const getCourses = asyncHandler(async (req, res) => {
  const courses = await prisma.course.findMany({
    where: {
      published: true,
    },
  });
  res.send({ error: false, courses });
});

// Sign out  logic
export const userSignout = asyncHandler(async (req, res) => {
  res.setHeader("set-Cookie", "token=; HttpOnly; Max-Age=;");
  res.json({ error: false, message: "Log out successfull" });
});

// get current user
export const getMe = asyncHandler(async (req: reqObj, res) => {
  const user = await prisma.user.findFirst({
    where: {
      id: req.headers.uid,
    },
    include: {
      user_courses: {
        where: {
          course: {
            published: true,
          },
        },
        select: {
          course_id: true,
          user_contents: {
            where: {
              content: {
                published: true,
              },
            },
          },
        },
      },
    },
  });
  if (user) {
    const { password: pwd, ...userData } = user;
    res.json({ error: false, user: userData });
    return;
  }
  res.json({ error: true, message: "couldn't find" });
});

// get id specific course
export const getSelectedCourse = asyncHandler(async (req, res) => {
  const course = await prisma.course.findUnique({
    where: {
      id: req.params.courseId,
      published: true,
    },
    include: {
      contents: {
        where: {
          published: true,
        },
      },
    },
  });
  if (!course) {
    res.json({ error: true, message: "couldn't find" });
    return;
  }
  res.json({ error: false, course });
});

// buy course logic
export const buyCourse = asyncHandler(async (req, res) => {
  if (typeof req.headers.uid == "string") {
    try {
      // make sure course is publish
      await prisma.user_course.create({
        data: {
          course: {
            connect: {
              id: req.params.courseId,
            },
          },
          user: {
            connect: {
              id: req.headers.uid,
            },
          },
        },
      });
    } catch (err) {
      res.send({ error: true, message: "couldn't find" });
      return;
    }
  }
  res.json({ error: false, message: "Course bought" });
});

// get content by id and creates user_content record to determine user had visited the content
export const getContent = asyncHandler(async (req: reqObj, res) => {
  const courseId: string = req.body.courseId;
  const contentId = req.params.contentId;
  const uid = req.headers.uid || "";
  if (!courseId) {
    res.json({ error: true, message: "Please provide courseId" });
    return;
  }
  const content = await prisma.content.findUnique({
    where: {
      id: contentId,
      published: true,
      course: {
        user_courses: {
          some: {
            course_id: courseId,
            user_id: req.headers.uid,
          },
        },
      },
    },
    include: {
      user_content: {
        where: {
          user_course: {
            user_id: req.headers.uid,
          },
        },
      },
    },
  });
  console.log(content);
  if (!content) {
    res.json({ error: true, message: "Couldn't find content" });
    return;
  }
  const userCourse = await prisma.user_course.findFirst({
    where: {
      course_id: courseId,
      user_id: uid,
    },
    include: {
      user_contents: {
        where: {
          content_id: content.id,
        },
        select: {
          id: true,
        },
      },
    },
  });

  if (!userCourse) {
    res.json({ error: true, message: "Please purchase course" });
    return;
  }
  console.log(userCourse.user_contents);
  if (!userCourse.user_contents.length) {
    const data = await prisma.user_course.update({
      where: {
        id: userCourse.id,
      },
      data: {
        user_contents: {
          create: {
            content_id: contentId,
          },
        },
      },
    });
  }

  res.json({ error: false, content: content });
});
