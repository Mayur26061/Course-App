declare global {
  namespace NodeJS {
    interface ProcessEnv {
      INSTRUCTOR_TOKEN_SECRET_KEY: string;
      NODE_ENV: "development" | "production";
      LEARNER_TOKEN_SECRET_KEY: string;
    }
  }
}

export {};
