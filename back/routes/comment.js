const express = require("express");
const Post = require("../models/post");
const Errors = require("../utils/errors");

const router = express.Router();

router.route("/:_postId").post(async (req, res) => {
  const { _postId } = req.params;
  const { content, author } = req.body;
  if (!content) {
    res.status(406).send(Errors.comment.missingValue);
    return;
  }

  try {
    const createdComment = Post.createComment(_postId, { content, author });
    res.send(createdComment);
  } catch (error) {
    console.error(error);
    res.status(406).send(Errors.generic.default);
  }
});

module.exports = router;
