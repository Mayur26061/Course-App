export type userType = "admin" | "instructor" | "learner";

export function getSecretKey(type: userType): string {
  const secreteKeyObject = {
    admin: "",
    instructor: process.env.INSTRUCTOR_TOKEN_SECRET_KEY,
    learner: process.env.LEARNER_TOKEN_SECRET_KEY,
  };
  return secreteKeyObject[type];
}
