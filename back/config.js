const CONFIG = {
  DATABASE_URL: process.env.DATABASE_URL || "mongodb://localhost/fslzrr-blog",
  PORT: process.env.PORT || 8080,
  JWT: {
    credentialsRequired: true,
    secret: "why-so-serioussss",
    usecurePaths: ["/api/auth-user/recoverPassword", "/api/auth-user"],
  },
};

module.exports = CONFIG;
