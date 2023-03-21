const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Auth = new Schema(
  {
    fullName: { type: String, require: true },
    password: { type: String, require: true },
    avatar: { type: String, require: true },
    userName: { type: String, require: true },
    email: {
      type: String,
      require: true,
      // match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    },
    role: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Auth", Auth);
