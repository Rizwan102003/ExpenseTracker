const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: String,
  amount: Number,
  date: { type: Date, default: Date.now },
  isRecurring: { type: Boolean, default: false }
});

module.exports = mongoose.model("Transaction", transactionSchema);
