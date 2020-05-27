const mongoose = require("mongoose");

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
  findAll: async () => {
    const foundPosts = await postCollection
      .find()
      .select("_id title content updatedDate")
      .sort({ updatedDate: "desc" });
    return foundPosts;
  },
  findById: async (_id) => {
    // TODO: aggregate comments author
    const foundPost = await postCollection.findOne({ _id });
    return foundPost;
  },
  createComment: async (_id, newComment) => {
    const post = postCollection.updateOne(
      { _id },
      { $push: { comments: newComment } }
    );
    return post;
  },
};

module.exports = Post;
