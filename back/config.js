const CONFIG = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  JWT: {
    credentialsRequired: true,
    secret: process.env.SECRET,
    usecurePaths: ["", "/user", "/auth/login"],
  },
};

module.exports = CONFIG;
