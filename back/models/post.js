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
      isApproved: {
        type: Boolean,
        default: false,
      },
      createdDate: {
        type: Date,
        default: Date.now,
      },
      replies: [
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
          isApproved: {
            type: Boolean,
            default: false,
          },
          createdDate: {
            type: Date,
            default: Date.now,
          },
        },
      ],
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
  findAll: async (_id, query) => {
    const sort =
      query.orderBy === "latest" ? { updatedDate: "desc" } : { claps: "desc" };

    const title = query.title
      ? [{ title: { $regex: query.title, $options: "i" } }]
      : [];

    const { friends } = await User.findById(_id);

    const author = query.justUsers
      ? [{ author: _id }]
      : [{ author: { $in: [...friends, _id] } }];

    const foundPosts = await postCollection
      .find({
        $and: [
          { $or: [{ isPublic: true }, { author: _id, isPublic: false }] },
          ...author,
          ...title,
        ],
      })
      .select("_id title content updatedDate author")
      .populate("author")
      .sort(sort);

    const filteredPosts = query.name
      ? foundPosts.filter((post) =>
          post.author.name.toLowerCase().includes(query.name.toLowerCase())
        )
      : foundPosts;

    return filteredPosts;
  },
  findById: async (_id) => {
    const foundPost = await postCollection
      .findOne({ _id })
      .populate("author comments.author comments.replies.author");
    return foundPost;
  },
  createComment: async (_id, newComment) => {
    const post = await postCollection.updateOne(
      { _id },
      { $push: { comments: newComment } }
    );
    return post;
  },
  approveComment: async (_id, _commentId) => {
    const post = await postCollection.updateOne(
      { _id, comments: { $elemMatch: { _id: _commentId } } },
      { $set: { "comments.$.isApproved": true } }
    );
    return post;
  },
  deleteComment: async (_id, _commentId) => {
    const commentQuery = { _id: _commentId };
    const post = await postCollection.updateOne(
      { _id },
      { $pull: { comments: commentQuery } }
    );
    return post;
  },
  createSubcomment: async (_id, _commentId, newComment) => {
    const post = await postCollection.updateOne(
      { _id, comments: { $elemMatch: { _id: _commentId } } },
      { $push: { "comments.$.replies": newComment } }
    );
    return post;
  },
  approveSubcomment: async (_id, _commentId, _subcommentId) => {
    const post = await postCollection.updateOne(
      {
        _id,
      },
      { $set: { "comments.$[i].replies.$[j].isApproved": true } },
      { arrayFilters: [{ "i._id": _commentId }, { "j._id": _subcommentId }] }
    );
    return post;
  },
  deleteSubcomment: async (_id, _commentId, _subcommentId) => {
    const commentQuery = { _id: _subcommentId };
    const post = await postCollection.updateOne(
      { _id, comments: { $elemMatch: { _id: _commentId } } },
      { $pull: { "comments.$.replies": commentQuery } }
    );
    return post;
  },
};

module.exports = Post;
