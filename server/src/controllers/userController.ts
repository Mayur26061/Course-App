import { Response } from "express";
import { z } from "zod";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

import { AuthenticateUser, CustomRequest, generateToken } from "../middleware/auth";
import prisma from "../utils/client";

type userType = "admin" | "instructor" | "learner";
const signCheck = z.object({
  username: z.string().email().min(1),
  password: z.string().min(6),
});
const signUpCheck = signCheck.extend({
  name: z.string().min(1),
});
type signUp = z.infer<typeof signUpCheck>;

export const userSignUp = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const result = signUpCheck.safeParse(req.body);
    if (result.error) {
      res.json({
        status: "error",
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
        status: "error",
        message: `User already exist for type ${existUser.userType}`,
      });
      return;
    }
    // todo: z.enum for userType
    const record = await prisma.user.create({
      data: {
        username,
        name,
        password: bcrypt.hashSync(password, 8),
        userType: "learner",
      },
    });
    const token = generateToken({ id: record.id, username: username });
    res.send({ status: "success", token });
  }
);

export const userSignIn = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const result = signCheck.safeParse(req.body);
    if (result.error) {
      res.json({
        status: "error",
        message: "Invalid Inputs",
      });
      return;
    }
    const { username, password } = req.body;

    // todo: z.enum for userType
    const existUser = await prisma.user.findFirst({
      where: {
        username: username,
        userType: "learner",
      },
    });
    if (!existUser) {
      res.json({
        status: "error",
        message: "Can't find user please signUp",
      });
      return;
    }

    if (!bcrypt.compareSync(password, existUser.password)) {
      res.json({
        status: "error",
        message: "Incorrect password",
      });
      return;
    }
    const token = generateToken({ id: existUser.id, username: username });
    res.setHeader("set-cookie", `jwt=${token}; HttpOnly;`);
    res.send({ status: "success", token});
  }
);

export const getCourse = asyncHandler(
    async (req: CustomRequest, res: Response) => {
    res.send({status:"success",message:"DONEE"})
    })
