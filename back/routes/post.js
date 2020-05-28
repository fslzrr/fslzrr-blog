const express = require("express");
const Post = require("../models/post");
const Errors = require("../utils/errors");

const router = express.Router();

router
  .route("/")
  .put(async (req, res) => {
    const { _id } = req.user;
    try {
      const posts = await Post.findAll(
        _id,
        !req.body.orderBy || req.body.justUsers === undefined
          ? { orderBy: "latest", justUsers: false }
          : req.body
      );
      res.send(posts);
    } catch (error) {
      console.error(error);
      res.status(406).send(Errors.generic.default);
    }
  })
  .post(async (req, res) => {
    const { title, content, isPublic } = req.body;
    const { user } = req;
    if (!title || !content || isPublic === undefined) {
      res.status(406).send(Errors.post.missingValue);
      return;
    }

    try {
      const newPost = await Post.create({
        title,
        content,
        isPublic,
        author: user._id,
      });
      res.send(newPost);
    } catch (error) {
      console.error(error);
      res.status(406).send(Errors.generic.default);
    }
  });

router
  .route("/:_id")
  .get(async (req, res) => {
    const { _id } = req.params;
    try {
      const post = await Post.findById(_id);
      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(406).send(Errors.generic.default);
    }
  })
  .put(async (req, res) => {
    const { title, content, isUpdating, isPublic } = req.body;
    const { _id } = req.params;

    if (!title || !content) {
      res.status(406).send(Errors.post.missingValue);
      return;
    }

    const base = { _id, title, content, isPublic };
    const postToUpdate = isUpdating
      ? { ...base, updatedDate: Date.now() }
      : { ...base };

    try {
      const updatedPost = await Post.update(postToUpdate);
      res.send(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(406).send(Errors.generic.default);
    }
  })
  .delete(async (req, res) => {
    const { _id } = req.params;

    try {
      const deletedPost = await Post.delete(_id);
      res.send(deletedPost);
    } catch (error) {
      console.error(error);
      res.status(406).send(Errors.generic.default);
    }
  });

router.route("/:_id/clap").post(async (req, res) => {
  const { _id } = req.params;
  try {
    const post = await Post.findById(_id);
    const updatedPost = await Post.update({ _id, claps: post.claps + 1 });
    res.send(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(406).send(Errors.generic.default);
  }
});

module.exports = router;
