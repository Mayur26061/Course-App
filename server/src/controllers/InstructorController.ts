import asyncHandler from "express-async-handler";
import { z } from "zod";

import { reqObj } from "../utils/utils";
import prisma from "../utils/client";

const courseInp = z.object({
  title: z.string().min(3),
  description: z.string().min(1),
  price: z.number().gte(0).finite().default(0),
  image: z.string().url().min(1),
  published: z.boolean().optional(),
});

export const courseOptional = z
  .object({
    title: z.string().min(3).optional(),
    description: z.string().min(1).optional(),
    price: z.number().gte(0).finite().default(0).optional(),
    image: z.string().url().min(1).optional(),
    published: z.boolean().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "Empty Object",
  });

const contentValidator = z.object({
  title: z.string().trim().min(3),
  description: z.string().trim(),
  type: z.enum(["image", "document", "video"]),
  content_url: z.string().url(),
  duration: z.string().time().optional(),
});

export const contentOptional = z
  .object({
    title: z.string().trim().min(3).optional(),
    description: z.string().trim().optional(),
    type: z.enum(["image", "document", "video"]).optional(),
    content_url: z.string().url().optional(),
    duration: z.string().time().optional(),
    published: z.boolean().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "Empty Object",
  });

export const getMyCreations = asyncHandler(async (req: reqObj, res) => {
  const course = await prisma.course.findMany({
    where: {
      author_id: req.headers.uid,
    },
  });
  res.json({ error: false, course: course });
});

// add new course
export const addCourse = asyncHandler(async (req: reqObj, res) => {
  const result = courseInp.safeParse(req.body);
  if (result.error) {
    res.json({
      error: true,
      message: "Invalid Inputs",
    });
    return;
  }
  const { title, description, price, image } = result.data;
  const courseObject = {
    data: {
      title,
      description,
      price,
      image,
      author: {
        connect: {
          id: req.headers.uid || "",
        },
      },
    },
  };
  const course = await prisma.course.create(courseObject);
  res.json({ error: false, course });
});

// add new content
export const addContent = asyncHandler(async (req: reqObj, res) => {
  const result = contentValidator.safeParse(req.body);
  if (result.error) {
    res.json({
      error: true,
      message: "Invalid Inputs",
    });
    return;
  }
  const courseId = req.params.courseId;
  const course = await prisma.course.count({
    where: {
      id: courseId,
      author_id: req.headers.uid,
    },
  });
  if (!course) {
    res.json({
      error: true,
      message: "Course doesn't exist",
    });
    return;
  }
  const { title, description, type, content_url, duration } = result.data; // for duration will see the format later
  const contentObj = {
    data: {
      title,
      description,
      type,
      content_url,
      course: {
        connect: {
          id: courseId,
        },
      },
    },
  };
  const content = await prisma.content.create(contentObj);
  res.json({ error: false, content });
});

export const deleteContent = asyncHandler(async (req: reqObj, res) => {
  const courseId: string = req.body.courseId;
  const { count } = await prisma.content.deleteMany({
    where: {
      id: req.params.contentId,
      course_id: courseId,
    },
  });
  if (count) {
    res.json({ error: false, message: "Content Deleted successfully" });
    return;
  }
  res.json({ error: true, message: "Couldn't find content" });
});

export const deleteCourse = asyncHandler(async (req: reqObj, res) => {
  const { count } = await prisma.course.deleteMany({
    where: {
      id: req.params.courseId,
      author_id: req.headers.uid,
    },
  });
  if (count) {
    res.json({ error: false, message: "Course Deleted successfully" });
    return;
  }
  res.json({ error: true, message: "Couldn't find course" });
});

export const updateCourse = asyncHandler(async (req: reqObj, res) => {
  const result = courseOptional.safeParse(req.body);
  if (result.error) {
    res.json({
      error: true,
      message: "Invalid Inputs",
    });
    return;
  }
  const course = await prisma.course.update({
    where: {
      id: req.params.courseId,
    },
    data: {
      ...req.body,
    },
    include: {
      contents: true,
    },
  });
  res.json({ error: false, course: course });
});

export const updateContent = asyncHandler(async (req: reqObj, res) => {
  const result = contentOptional.safeParse(req.body);
  if (result.error) {
    res.json({
      error: true,
      message: "Invalid Inputs",
    });
    return;
  }
  const content = await prisma.content.update({
    data: {
      ...req.body,
    },
    where: {
      id: req.params.contentId,
    },
  });

  res.json({ error: false, content: content });
});
