import asyncHandler from "express-async-handler";
import { z } from "zod";

import { reqObj } from "../utils/utils";
import prisma from "../utils/client";
import imageKit from "../utils/imagekit";

interface ContentObj {
  data: {
    title: string;
    description: string;
    type: "image" | "document" | "video";
    content_url?: string;
    body?: string;
    course: {
      connect: {
        id: string;
      };
    };
  };
}

const courseInp = z.object({
  title: z.string().min(3),
  description: z.string().min(1),
  price: z.coerce.number().gte(0).finite().default(0),
  published: z.boolean().optional(),
});

export const courseOptional = z
  .object({
    title: z.string().min(3).optional(),
    description: z.string().min(1).optional(),
    price: z.number().gte(0).finite().default(0).optional(),
    published: z.boolean().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "Empty Object",
  });

const contentValidator = z
  .object({
    title: z.string().trim().min(3),
    description: z.string().trim(),
    type: z.enum(["image", "document", "video"]),
    body: z.string().optional(),
    duration: z.string().time().optional(),
  })
  .refine((data) => (data.type === "document" && data.body) || data.type !== "document", {
    message: "Invalid content type",
  });

export const contentOptional = z
  .object({
    title: z.string().trim().min(3).optional(),
    description: z.string().trim().optional(),
    type: z.enum(["image", "document", "video"]).optional(),
    body: z.string().optional(),
    duration: z.string().time().optional(),
    published: z.boolean().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "Empty Object",
  })
  .refine(
    (data) => !data.type || (data.type === "document" && data.body) || data.type !== "document",
    {
      message: "Invalid content type",
    }
  );

export const getMyCreations = asyncHandler(async (req: reqObj, res) => {
  const course = await prisma.course.findMany({
    where: {
      author_id: req.headers.uid,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  res.json({ error: false, course: course });
});

// add new course
export const addCourse = asyncHandler(async (req: reqObj, res) => {
  // const data = [
  //   {
  //     title: "Full-Stack Web Development",
  //     description:
  //       "Learn to build dynamic web applications using HTML, CSS, JavaScript, Node.js, and React.",
  //     price: 1499,
  //     image:
  //       "https://www.upshottechnologies.in/images/course/full-stack-developer-training-course.jpg",
  //     author_id: req.headers.uid,
  //   },
  //   {
  //     title: "Python for Data Science",
  //     description:
  //       "Master Python and explore data analysis, visualization, and machine learning techniques.",
  //     price: 1299,
  //     image:
  //       "https://acr.iitm.ac.in/wp-content/uploads/2021/07/PythonDataScience1.jpg",
  //     author_id: req.headers.uid,
  //   },
  //   {
  //     title: "UI/UX Design Bootcamp",
  //     description:
  //       "Design user-centered products using Figma, Adobe XD, and prototyping tools.",
  //     price: 999,
  //     image:
  //       "https://d1aeya7jd2fyco.cloudfront.net/thumbnail/online-ui-ux-design-bootcamp-course.webp",
  //     author_id: req.headers.uid,
  //   },
  //   {
  //     title: "Digital Marketing Mastery",
  //     description:
  //       "Become a digital marketing expert with SEO, SEM, social media, and analytics skills.",
  //     price: 799,
  //     image:
  //       "https://d502jbuhuh9wk.cloudfront.net/articles/6576b5b1e4b0de0a8d19d1af/LdSiidigitalmarketingmastery.jpg",
  //     author_id: req.headers.uid,
  //   },
  //   {
  //     title: "Android App Development",
  //     description:
  //       "Build Android apps using Kotlin, Android Studio, and modern development practices.",
  //     price: 1199,
  //     image:
  //       "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/5f5b11b6a6b679001ce6c799.png",
  //     author_id: req.headers.uid,
  //   },
  //   {
  //     title: "Cybersecurity Fundamentals",
  //     description:
  //       "Understand core cybersecurity principles, threats, and defensive techniques.",
  //     price: 1399,
  //     image:
  //       "https://academy-wp-media-prod.storage.googleapis.com/wp-content/uploads/2023/02/20023034/thumbnail_cybersecurity-fundamentals_2024.jpg",
  //     author_id: req.headers.uid,
  //   },
  //   {
  //     title: "AWS Cloud Practitioner",
  //     description:
  //       "Gain foundational knowledge of AWS services, architecture, and pricing models.",
  //     price: 999,
  //     image:
  //       "https://td-portal-cdn.tutorialsdojo.com/wp-content/uploads/2021/06/AWS-Certified-Cloud-Practitioner-Essentials-CLF-C01-Exam-Course-Training-2022.png",
  //     author_id: req.headers.uid,
  //   },
  //   {
  //     title: "Machine Learning with Python",
  //     description:
  //       "Build predictive models using scikit-learn, pandas, and other ML tools.",
  //     price: 1499,
  //     image:
  //       "https://pyimagesearch.com/wp-content/uploads/2019/01/python_ml_header.png",
  //     author_id: req.headers.uid,
  //   },
  //   {
  //     title: "Ethical Hacking Essentials",
  //     description:
  //       "Learn ethical hacking techniques and tools used by security professionals.",
  //     price: 1099,
  //     image: "https://i.ytimg.com/vi/AbRJNZ-B-BM/maxresdefault.jpg",
  //     author_id: req.headers.uid,
  //   },
  //   {
  //     title: "Excel for Business Analytics",
  //     description:
  //       "Analyze business data using Excel functions, pivot tables, and dashboards.",
  //     price: 699,
  //     image:
  //       "https://static-media.hotmart.com/_-S6ftOV1gDhfaIV5_ztaPGl4Yw=/705x0/https://uploads.teachablecdn.com/attachments/TxTlT0DSlu7RNbifOABK_Excel+for+Biz+Analysts.jpg",
  //     author_id: req.headers.uid,
  //   },
  // ];
  // await prisma.course.createMany({ data });

  if (!req.file) {
    res.json({
      error: true,
      message: "Invalid Inputs",
    });
    return;
  }

  const result = courseInp.safeParse(req.body);
  if (result.error) {
    res.json({
      error: true,
      message: "Invalid Inputs",
    });
    return;
  }

  const fileResponese = await imageKit.upload({
    file: req.file.buffer.toString("base64"),
    fileName: req.file.originalname,
  });

  const image = fileResponese.url;
  const { title, description, price } = result.data;
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
      message: "Invalid Inputss",
    });
    return;
  }

  const { title, description, type, body } = result.data; // for duration will see the format later
  console.log(type);
  let content_url;
  if (!req.file && type !== "document") {
    res.json({
      error: true,
      message: "File Error",
    });
    return;
  } else if (req.file) {
    const fileResponese = await imageKit.upload({
      file: req.file.buffer.toString("base64"),
      fileName: req.file.originalname,
    });
    content_url = fileResponese.url;
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
  const contentObj: ContentObj = {
    data: {
      title,
      description,
      type,
      course: {
        connect: {
          id: courseId,
        },
      },
    },
  };

  if (type === "document") {
    contentObj.data.body = body;
  } else {
    contentObj.data.content_url = content_url;
  }
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
  if (result.error && !req.file) {
    res.json({
      error: true,
      message: "Invalid Inputs",
    });
    return;
  }
  let data = req.body;
  if (req.file) {
    const fileResponese = await imageKit.upload({
      file: req.file.buffer.toString("base64"),
      fileName: req.file.originalname,
    });

    const image = fileResponese.url;
    if (image) {
      data = { image };
    }
  }
  const course = await prisma.course.update({
    where: {
      id: req.params.courseId,
    },
    data: {
      ...data,
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
      message: result.error.message,
    });
    return;
  }
  const data = req.body;

  if (req.file) {
    const fileResponese = await imageKit.upload({
      file: req.file.buffer.toString("base64"),
      fileName: req.file.originalname,
    });

    const content_url = fileResponese.url;
    if (content_url) {
      data.content_url = content_url;
    }
  }

  const content = await prisma.content.update({
    data: {
      ...data,
    },
    where: {
      id: req.params.contentId,
    },
  });

  res.json({ error: false, content: content });
});
