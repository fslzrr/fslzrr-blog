const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { DATABASE_URL, PORT } = require("./config");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();

const jsonParser = bodyParser.json();
app.use(jsonParser);

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
