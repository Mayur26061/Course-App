import { Prisma } from "@prisma/client";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { generateToken } from "../middleware/auth";
import prisma from "../utils/client";
import { generatePdf, reqObj } from "../utils/utils";

const signCheck = z.object({
  username: z.string().email().min(1),
  password: z.string().min(6),
});

const signUpCheck = signCheck.extend({
  name: z.string().min(1),
});
const resetCheck = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
  confirmPassword: z.string().min(6),
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
  res.setHeader("set-cookie", `token=${token};Max-Age=172800;HttpOnly;SameSite=None;Secure;`);
  res.send({ error: false, user: record });
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
  res.setHeader("set-cookie", `token=${token};Max-Age=172800;HttpOnly;SameSite=None;Secure;`);
  res.send({ error: false, user });
});

// get all publish course
export const getCourses = asyncHandler(async (req, res) => {
  const courses = await prisma.course.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  res.send({ error: false, courses });
});

// Sign out  logic
export const userSignout = asyncHandler(async (req, res) => {
  res.setHeader("set-cookie", "token=; HttpOnly; Max-Age=; SameSite=None; Secure;");
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
export const getSelectedCourse = asyncHandler(async (req: reqObj, res) => {
  const uid: string = req.headers["uid"] || "";
  let condition: Prisma.courseWhereUniqueInput = { id: req.params.courseId };
  let contCondition: Prisma.contentWhereInput = {};
  if (uid) {
    // if logged in user show publish as well as his course
    condition.OR = [
      {
        published: true,
      },
      {
        author_id: uid,
      },
    ];

    // if logged in user show publish as well as his content
    contCondition.OR = [
      {
        published: true,
      },
      {
        course: {
          author_id: uid,
        },
      },
    ];
  } else {
    contCondition.published = true;
    condition.published = true;
  }

  const course = await prisma.course.findUnique({
    where: condition,
    include: {
      contents: {
        where: contCondition,
      },
    },
  });
  if (!course) {
    res.json({ error: true, course: null, message: "couldn't find" });
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

const _getContent = async (
  contendId: string,
  course_id: string,
  userId: string
) => {
  const content = await prisma.content.findUnique({
    where: {
      id: contendId,
      OR: [
        {
          published: true,
          course: {
            user_courses: {
              some: {
                course_id: course_id,
                user_id: userId,
              },
            },
          },
        },
        {
          course: {
            author_id: userId,
          },
        },
      ],
    },
    include: {
      user_content: {
        where: {
          user_course: {
            user_id: userId,
          },
        },
      },
    },
  });
  return content;
};
// get content by id and creates user_content record to determine user had visited the content
export const getContent = asyncHandler(async (req: reqObj, res) => {
  const courseId: string = req.body.courseId;
  const contentId = req.params.contentId;
  const uid = req.headers.uid || "";
  if (!courseId) {
    res.json({ error: true, message: "Please provide courseId" });
    return;
  }
  const content = await _getContent(contentId, courseId, uid);
  if (!content) {
    res.json({ error: true, message: "Couldn't find content" });
    return;
  }
  res.json({ error: false, content: content });
});

export const markasCompleteContent = asyncHandler(async (req: reqObj, res) => {
  const cid = req.params.contentId;
  const courseId = req.body.courseId;
  const uid: string = req.headers.uid || "";
  const userCourse = await prisma.user_course.findFirst({
    where: {
      course_id: courseId,
      user_id: uid,
    },
    include: {
      user_contents: {
        where: {
          content_id: cid,
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
  if (!userCourse.user_contents.length) {
    await prisma.user_content.create({
      data: {
        user_course_id: userCourse.id,
        content_id: cid,
        completed: true,
      },
    });
  }
  const content = await _getContent(cid, courseId, uid);
  res.json({ error: false, content: content });
});

export const getSearchedCourses = asyncHandler(async (req: reqObj, res) => {
  const uid: string = req.headers["uid"] || "";
  const data = z
    .object({
      searchTerm: z.string().trim(),
    })
    .safeParse(req.body);

  if (data.error || !data.data?.searchTerm) {
    res.send({ error: false, courses: [] });
    return;
  }

  let condition: Prisma.courseWhereInput = {
    title: { contains: data.data?.searchTerm || "", mode: "insensitive" },
  };

  // if logged in user show publish as well as his course
  if (uid) {
    condition.OR = [
      {
        published: true,
      },
      {
        author_id: uid,
      },
    ];
  } else {
    condition.published = true;
  }

  const courses = await prisma.course.findMany({
    where: condition,
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  res.send({ error: false, courses });
});

export const getMyCourse = asyncHandler(async (req: reqObj, res) => {
  const uid: string = req.headers["uid"] || "";
  const myCourses = await prisma.course.findMany({
    where: {
      user_courses: {
        some: {
          user_id: uid,
        },
      },
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  res.send({ error: false, courses: myCourses });
});

export const resetPassword = asyncHandler(async (req: reqObj, res) => {
  const uid: string = req.headers["uid"] || "";
  const result = resetCheck.safeParse(req.body);
  if (result.error) {
    res.json({
      error: true,
      message: "Invalid Inputs",
    });
    return;
  }
  const { oldPassword, newPassword, confirmPassword } = result.data;

  const existUser = await prisma.user.findUnique({
    where: { id: uid },
  });
  if (!existUser) {
    res.json({
      error: true,
      message: "Please SignUp",
    });
    return;
  }

  if (!bcrypt.compareSync(oldPassword, existUser.password)) {
    res.json({
      error: true,
      message: "Incorrect password",
    });
    return;
  }

  if (newPassword === confirmPassword) {
    await prisma.user.update({
      data: {
        password: bcrypt.hashSync(newPassword, 8),
      },
      where: {
        id: existUser.id,
      },
    });
    res.redirect(307, "/api/learner/signout");
    return;
  }

  res.json({
    error: true,
    message: "Password Didn't match",
  });
});

export const getCompletedCourse = asyncHandler(async (req: reqObj, res) => {
  // const
  const completedCourse = await prisma.user_course.findMany({
    where: {
      user_id: req.headers.uid,
      status: "completed",
    },
    include: {
      course: {
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  res.send({ error: false, data: completedCourse });
});

export const generateCertificate = asyncHandler(async (req: reqObj, res) => {
  const data = await prisma.user_course.findUnique({
    where: {
      id: req.params.ucourseId,
      status: "completed",
    },
    select: {
      completed_date: true,
      user: {
        select: {
          name: true,
        },
      },
      course: {
        select: {
          title: true,
        },
      },
    },
  });
  let html = "<html><head></head><body>Something went wrong</body></html>";
  let responseHeaders = {
    "Content-Type": "application/pdf",
    "Access-Control-Expose-Headers": "Content-Disposition",
    "Content-Disposition": "attachment; filename=error.pdf",
  };
  if (data) {
    const name = data.user.name;
    const course = data.course.title;
    const date = data.completed_date;
    html = `
    <html>
    <head>
    <style>
    body { font-family: Arial; text-align: center; padding: 50px; }
    .certificate { border: 5px solid #555; padding: 50px; }
    h1 { font-size: 48px; margin-bottom: 20px; }
    </style>
    </head>
    <body>
    <div class="certificate">
    <h1>Certificate of Completion</h1>
    <p>This is to certify that</p>
    <h2>${name}</h2>
    <p>has successfully completed the course</p>
    <h3>${course}</h3>
    <p>on ${date?.toLocaleDateString()}</p>
    </div>
    </body>
    </html>
    `;
    responseHeaders[
      "Content-Disposition"
    ] = `attachment; filename=${name}-${course}.pdf`;
  }
  const buffer = await generatePdf(html);
  res.set(responseHeaders);
  res.send(buffer);
});
