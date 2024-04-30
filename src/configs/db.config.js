const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection established");
  } catch (e) {
    console.log(`Error while connecting to Mongoose: ${e.message}`);
  }
};

module.exports = dbConnect;


