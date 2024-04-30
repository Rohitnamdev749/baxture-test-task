const mongoose = require("mongoose");
const { v4: uuid4 } = require("uuid");

const UserSchema = mongoose.Schema({
  id: {
    type: String,
    default: uuid4,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  hobbies: {
    type: [String],
    default: [],
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
