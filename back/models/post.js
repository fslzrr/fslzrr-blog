const mongoose = require("mongoose");
const User = require("./user");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  claps: {
    type: Number,
    default: 0,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      createdDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  isPublic: {
    type: Boolean,
    required: true,
  },
});

const postCollection = mongoose.model("post", postSchema);

const Post = {
  create: async (newPost) => {
    const createdPost = await postCollection.create(newPost);
    return createdPost;
  },
  update: async ({ _id, ...dataToUpdate }) => {
    const updated = await postCollection.findByIdAndUpdate(
      { _id },
      dataToUpdate
    );
    return updated;
  },
  delete: async (_id) => {
    const deleted = await postCollection.findByIdAndDelete({ _id });
    return deleted;
  },
  findAll: async (_id) => {
    const { friends } = await User.findById(_id);
    const foundPosts = await postCollection
      .find({
        $and: [
          { $or: [{ isPublic: true }, { author: _id, isPublic: false }] },
          { author: { $in: [...friends, _id] } },
        ],
      })
      .select("_id title content updatedDate author")
      .populate("author")
      .sort({ updatedDate: "desc" });
    return foundPosts;
  },
  findById: async (_id) => {
    const foundPost = await postCollection
      .findOne({ _id })
      .populate("author comments.author");
    return foundPost;
  },
  createComment: async (_id, newComment) => {
    const post = postCollection.updateOne(
      { _id },
      { $push: { comments: newComment } }
    );
    return post;
  },
  deleteComment: async (_id, _commentId, _authorId, isOwner) => {
    const commentQuery = isOwner
      ? { _id: _commentId }
      : { _id: _commentId, author: _authorId };
    const post = postCollection.updateOne(
      { _id },
      { $pull: { comments: commentQuery } }
    );
    return post;
  },
};

module.exports = Post;
