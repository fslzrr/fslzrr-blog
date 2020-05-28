const express = require("express");
const User = require("../models/user");
const Errors = require("../utils/errors");
const AuthUtils = require("../utils/auth");

const router = express.Router();

router.route("/").post(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(406).send(Errors.user.missingValue);
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
    res.status(406).send(Errors.generic.default);
  }
});

router.route("/:name").get(async (req, res) => {
  const { name } = req.params;
  const { _id } = req.user;

  if (name === "<null>") {
    res.send([]);
    return;
  }

  try {
    const users = await User.findAllByName(name, _id);
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(406).send(Errors.generic.default);
  }
});

module.exports = router;
