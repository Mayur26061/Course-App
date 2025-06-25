import { Request } from "express";
import { z } from "zod";

export type userType = "admin" | "learner";

// return secret key for different user
export function getSecretKey(type: userType): string {
  const secreteKeyObject = {
    admin: process.env.ADMIN_TOKEN_SECRET_KEY,
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

export const updateUserVals = z.object({
  name: z.string().trim().min(1).optional(),
  username: z.string().email().optional(),
  password: z.string().min(6).optional(),
  userType: z.enum(["admin", "learner"]).optional(),
  isApproved: z.boolean().optional(),
});
