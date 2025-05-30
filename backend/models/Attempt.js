const mongoose = require("mongoose")

const attemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  test: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
  answers: [{ question: mongoose.Schema.Types.ObjectId, answer: String }],
  score: Number,
  startTime: Date,
  endTime: Date,
})

module.exports = mongoose.model("Attempt", attemptSchema)

