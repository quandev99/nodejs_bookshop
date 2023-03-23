// Using Node.js `require()`
const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1/bookshop_dev", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Connected failue!!!", error);
  }
}
module.exports = { connect };
