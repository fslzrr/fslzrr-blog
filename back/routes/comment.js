const express = require("express");
const Post = require("../models/post");
const Errors = require("../utils/errors");

const router = express.Router();

router.route("/:_postId").post(async (req, res) => {
  const { _postId } = req.params;
  const { content } = req.body;
  if (!content) {
    res.status(406).send(Errors.comment.missingValue);
    return;
  }

  try {
    const updatedPost = await Post.createComment(_postId, {
      content,
      author: req.user._id,
    });
    res.send(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(406).send(Errors.generic.default);
  }
});

router
  .route("/:_postId/:_id")
  .post(async (req, res) => {
    const { _postId, _id } = req.params;
    const { content } = req.body;
    if (!content) {
      res.status(406).send(Errors.comment.missingValue);
      return;
    }

    try {
      const updatedPost = await Post.createSubcomment(_postId, _id, {
        content,
        author: req.user._id,
      });
      res.send(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(406).send(Errors.generic.default);
    }
  })
  .put(async (req, res) => {
    const { _postId, _id } = req.params;
    try {
      const updatedPost = await Post.approveComment(_postId, _id);
      res.send(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(406).send(Errors.generic.default);
    }
  })
  .delete(async (req, res) => {
    const { _postId, _id } = req.params;

    try {
      const updatedPost = await Post.deleteComment(_postId, _id);
      res.send(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(406).send(Errors.generic.default);
    }
  });

router
  .route("/:_postId/:_commentId/:_id")
  .put(async (req, res) => {
    const { _postId, _commentId, _id } = req.params;
    try {
      const updatedPost = await Post.approveSubcomment(
        _postId,
        _commentId,
        _id
      );
      res.send(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(406).send(Errors.generic.default);
    }
  })
  .delete(async (req, res) => {
    const { _postId, _commentId, _id } = req.params;

    try {
      const updatedPost = await Post.deleteSubcomment(_postId, _commentId, _id);
      res.send(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(406).send(Errors.generic.default);
    }
  });

module.exports = router;
