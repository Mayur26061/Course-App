/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { getSecretKey, userType } from "../utils/utils";

interface target {
  id: String;
  username: String;
}

const getCookieToken = (cookie: string | undefined, cname: string) => {
  if (cookie) {
    const cookies = cookie.split("; ");
    for (let cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === cname) {
        return value;
      }
    }
    return null;
  }
  return undefined;
};

const _commonMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
  userType: userType
) => {
  const token = getCookieToken(req.headers.cookie, "token");
  if (token) {
    jwt.verify(token, getSecretKey(userType), (err, data: any) => {
      if (err) {
        res.setHeader("set-Cookie", "token=; HttpOnly; Max-Age=;");

        res.status(403).json({
          status: "error",
          message: "Forbidden Invalid Token",
        });
        return;
      }
      // todo: store user id in session
      req.headers.uid = data.id || "";
      next();
    });
  } else {
    res.status(403).send({ error: "Unauthorized" });
  }
};

export const generateToken = (target: target, type: userType) => {
  const token = jwt.sign(target, getSecretKey(type), {
    expiresIn: "2 days",
  }); // we have to pass target as object to use expiresIN as string
  return token;
};

export const AuthenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  _commonMiddleware(req, res, next, "learner");
};

export const AuthenticateInstructor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  _commonMiddleware(req, res, next, "instructor");
};

export const AuthenticateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  _commonMiddleware(req, res, next, "admin");
};
