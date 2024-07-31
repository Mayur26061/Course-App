declare global {
    namespace NodeJS {
      interface ProcessEnv {
        INSTRUCTOR_TOKEN_SECRET_KEY: string;
        NODE_ENV: 'development' | 'production';
        LEARNER_TOKEN_SECRET_KEY: string;
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}