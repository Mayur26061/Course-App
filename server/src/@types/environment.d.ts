declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      LEARNER_TOKEN_SECRET_KEY: string;
      ADMIN_TOKEN_SECRET_KEY: string;
      FRONTEND_URL: string;
      ADMIN_URL: string;
      PORT: number;
    }
  }
}

export {};
