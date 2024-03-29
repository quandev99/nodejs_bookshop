const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userId: { type: String, require: true },
    userName: { type: String, require: true },
    avatar: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: Number, require: true },
    address: { type: String, require: true },
    totalQuantity: { type: Number, require: true },
    totalAmount: { type: Number, require: true },
    status: { type: String, default: "Chờ xác nhận" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
