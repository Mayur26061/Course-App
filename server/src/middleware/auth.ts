/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { getSecretKey, userType } from "../utils/utils";

interface target {
  id: String;
  username: String;
}

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
  const token = getCookieToken(req.headers.cookie, "ltoken");
  if (token) {
    jwt.verify(
      token,
      process.env.LEARNER_TOKEN_SECRET_KEY,
      (err, data: any) => {
        if (err) {
          res.setHeader("set-Cookie", "ltoken=; HttpOnly; Max-Age=;");

          res.status(403).json({
            status: "error",
            message: "Forbidden Invalid Token",
          });
          return;
        }
        // todo: store user id in session
        req.headers.uid = data.id || "";
        next();
      }
    );
  } else {
    res.status(403).send({ error: "Unauthorized" });
  }
};

export const AuthenticateInstructor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = getCookieToken(req.headers.cookie, "itoken");
  if (token) {
    jwt.verify(
      token,
      process.env.INSTRUCTOR_TOKEN_SECRET_KEY,
      (err, data: any) => {
        if (err) {
          res.setHeader("set-Cookie", "itoken=; HttpOnly; Max-Age=;");
          res.status(403).json({
            status: "error",
            message: "Forbidden Invalid Token",
          });
          return;
        }
        // todo: store user id in session
        req.headers.uid = data.id;
        next();
      }
    );
  } else {
    res.status(403).send({ error: "Unauthorized" });
  }
};

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
