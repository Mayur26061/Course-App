import { z } from "zod";
import { Request } from "express";

export type userType = "admin" | "instructor" | "learner";

// return secret key for different user
export function getSecretKey(type: userType): string {
  const secreteKeyObject = {
    admin: "",
    instructor: process.env.INSTRUCTOR_TOKEN_SECRET_KEY,
    learner: process.env.LEARNER_TOKEN_SECRET_KEY,
  };
  return secreteKeyObject[type];
}

export const signCheck = z.object({
  username: z.string().email().min(1),
  password: z.string().min(6),
});

export const signUpCheck = signCheck.extend({
  name: z.string().min(1),
});
interface CustomHeaders {
  uid?: string;
}
export interface reqObj extends Request {
  headers: CustomHeaders & Request["headers"];
}
