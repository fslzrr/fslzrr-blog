const CONFIG = {
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "mongodb+srv://admin:Pass.word1@cluster0-0b5w8.mongodb.net/fslzrr-blog?retryWrites=true&w=majority" ||
    "mongodb://localhost/fslzrr-blog",
  PORT: process.env.PORT || 8080,
  JWT: {
    credentialsRequired: true,
    secret: process.env.SECRET || "why-so-serioussss",
    usecurePaths: ["*", "/user", "/auth/login"],
  },
};

module.exports = CONFIG;
