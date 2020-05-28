const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("express-jwt");
const cors = require("cors");

const { DATABASE_URL, PORT, JWT } = require("./config");
const Errors = require("./utils/errors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const friendRoutes = require("./routes/friend");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.use(cors());
app.use(bodyParser.json());

app.use(
  jwt({
    secret: JWT.secret,
    credentialsRequired: JWT.credentialsRequired,
  }).unless({
    path: JWT.usecurePaths,
  })
);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(406).send(Errors.generic.unauthorized);
  }
});

app.listen(PORT, async () => {
  console.log(`server running on port: ${PORT}`);

  const settings = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };

  try {
    await mongoose.connect(DATABASE_URL, settings);
    console.log("database connected successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/friend", friendRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

app.get("/app", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
