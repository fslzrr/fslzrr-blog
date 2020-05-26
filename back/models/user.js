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
};

module.exports = User;
