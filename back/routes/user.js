const express = require("express");
const User = require("../models/user");
const Errors = require("../utils/errors");
const AuthUtils = require("../utils/auth");

const router = express.Router();

router.route("/").post(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(404).send(Errors.user.missingValue);
    return;
  }

  try {
    const newUser = await User.create({
      name,
      email,
      password,
    });
    const token = AuthUtils.generateAuthToken(newUser);
    res.send({ token, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(404).send(Errors.generic.default);
  }
});

module.exports = router;
