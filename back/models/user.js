const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isOwner: {
    type: Boolean,
    default: false,
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const userCollection = mongoose.model("user", userSchema);

const User = {
  create: async (newUser) => {
    const createdUser = await userCollection.create(newUser);
    return createdUser;
  },
  findByEmail: async (email) => {
    const user = await userCollection.findOne({ email });
    return user;
  },
  findAllByName: async (name, _id) => {
    const users = await userCollection
      .find({
        _id: { $ne: _id },
        name: { $regex: name, $options: "i" },
      })
      .select("_id name email friendRequests");
    return users;
  },
  sendFriendRequest: async (_id, _friendId) => {
    const user = userCollection.updateOne(
      { _id: _friendId },
      { $push: { friendRequests: _id } }
    );
    return user;
  },
  acceptFriendRequest: async (_id, _friendId) => {
    const deletePromise = userCollection.updateOne(
      { _id },
      { $pull: { friendRequests: _friendId } }
    );
    const createPromise = userCollection.updateOne(
      { _id },
      { $push: { friends: _friendId } }
    );
    const [deleted, created] = await Promise.all([
      deletePromise,
      createPromise,
    ]);
    return created;
  },
  deleteFriendRequest: async (_id, _friendId) => {
    const deleted = await userCollection.updateOne(
      { _id },
      { $pull: { friendRequests: _friendId } }
    );
    return deleted;
  },
  deleteFriend: async (_id, _friendId) => {
    const deleted = await userCollection.updateOne(
      { _id },
      { $pull: { friends: _friendId } }
    );
    return deleted;
  },
};

module.exports = User;
