/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

export interface CustomRequest extends Request {
  user?: {
    username:String
  };
}

interface target {
  id: String;
  username: String;
}

export const generateToken = (target: target) => {
  const token = jwt.sign(target, process.env.TOKEN_SECRET_KEY || "", {
    expiresIn: "2 days",
  }); // we have to pass object as target to use expiresIN as string
  return token;
};

export const AuthenticateUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (authorization) {
    let token = authorization.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET_KEY || "", (err, data:any) => {
      if (err) {
        res.status(403).json({ 
          status:"error",
          message: "Forbidden Invalid Token" });
          return 
      }
      // todo: store user id in session
      console.log(data)
      req.headers.uid = data.id;
      next();
    });
  } else {
    res.status(403).send({ error: "Unauthorized" });
  }
};
