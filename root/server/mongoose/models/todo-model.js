const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Todo = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("todos", Todo);
