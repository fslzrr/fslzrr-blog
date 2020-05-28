const express = require("express");
const User = require("../models/user");
const Errors = require("../utils/errors");

const router = express.Router();

router
  .route("/")
  .post(async (req, res) => {
    const { _friendId } = req.body;
    const { _id } = req.user;
    try {
      const sentRequest = await User.acceptFriendRequest(_id, _friendId);
      res.send(sentRequest);
    } catch (error) {
      console.error(error);
      res.status(406).send(Errors.generic.default);
    }
  })
  .delete(async (req, res) => {
    const { _friendId } = req.body;
    const { _id } = req.user;
    try {
      const sentRequest = await User.deleteFriend(_id, _friendId);
      res.send(sentRequest);
    } catch (error) {
      console.error(error);
      res.status(406).send(Errors.generic.default);
    }
  });

router
  .route("/request")
  .post(async (req, res) => {
    const { _friendId } = req.body;
    const { _id } = req.user;
    try {
      const sentRequest = await User.sendFriendRequest(_id, _friendId);
      res.send(sentRequest);
    } catch (error) {
      console.error(error);
      res.status(406).send(Errors.generic.default);
    }
  })
  .delete(async (req, res) => {
    const { _friendId } = req.body;
    const { _id } = req.user;
    try {
      const sentRequest = await User.deleteFriendRequest(_id, _friendId);
      res.send(sentRequest);
    } catch (error) {
      console.error(error);
      res.status(406).send(Errors.generic.default);
    }
  });

module.exports = router;
