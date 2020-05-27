const CONFIG = {
  DATABASE_URL: process.env.DATABASE_URL || "mongodb://localhost/fslzrr-blog",
  PORT: process.env.PORT || 8080,
  JWT: {
    credentialsRequired: true,
    secret: "why-so-serioussss",
    usecurePaths: ["/user", "/auth/login", /\/post*/],
  },
};

module.exports = CONFIG;
