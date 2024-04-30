const mongoose = require("mongoose");
const users = require("./data/user.data");
const User = require("./models/user.model");
const dbConnect = require("./configs/db.config");
const dotenv = require("dotenv");
dotenv.config();

dbConnect();

const importData = async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(users);
    // process.exit();
  } catch (err) {
    console.log(err);
    // process.exit(1);
  }
};

const destroyData = async () => {
  await User.deleteMany();
  // process.exit();
};

importData().then(() => mongoose.connection.close());
