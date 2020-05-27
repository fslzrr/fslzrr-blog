const express = require("express");
const User = require("../models/user");
const Errors = require("../utils/errors");
const AuthUtils = require("../utils/auth");

const router = express.Router();

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(406).send(Errors.auth.missingValue);
    return;
  }

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      res.status(406).send(Errors.auth.userNotFound);
      return;
    }
    if (user.password !== password) {
      res.status(406).send(Errors.auth.incorrectPassword);
      return;
    }

    const token = AuthUtils.generateAuthToken(user);
    res.send({ token, user });
  } catch (error) {
    console.error(error);
    res.status(406).send(Errors.generic.default);
  }
});

module.exports = router;
