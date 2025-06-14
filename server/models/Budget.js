const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: { type: String, required: true },
  amount: { type: Number, required: true }
});

module.exports = mongoose.model("Budget", budgetSchema);
