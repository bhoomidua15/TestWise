const TestResult = require("../models/TestResult")
const mongoose = require("mongoose")

exports.getExamHistory = async (req, res) => {
  try {
    const userId = req.params.id

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" })
    }

    const testResults = await TestResult.find({ user: userId }).populate("test", "title").sort("-completedAt")

    const examHistory = testResults.map((result) => ({
      id: result._id,
      testTitle: result.test?.title || "Untitled Test",
      score: result.score,
      totalQuestions: result.totalQuestions,
      date: result.completedAt,
    }))

    res.json(examHistory)
  } catch (err) {
    console.error("Error in exam-history route:", err)
    res.status(500).json({ message: "Server error" })
  }
}

exports.getUserPerformance = async (req, res) => {
  try {
    const userId = req.params.id

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" })
    }

    const testResults = await TestResult.find({ user: userId }).populate("test", "title").sort("completedAt")

    const performanceData = testResults.map((result) => ({
      testTitle: result.test?.title || "Untitled Test",
      score: result.score,
      date: result.completedAt,
    }))

    res.json(performanceData)
  } catch (err) {
    console.error("Error in performance route:", err)
    res.status(500).json({ message: "Server error" })
  }
}

exports.getUserTestAttempts = async (req, res) => {
  try {
    const userId = req.params.userId

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" })
    }

    const hasAttempts = await TestResult.exists({ user: userId })
    if (!hasAttempts) {
      return res.json([])
    }

    const attempts = await TestResult.find({ user: userId }).distinct("test")

    res.json(attempts)
  } catch (error) {
    console.error("Error in /api/users/:userId/test-attempts:", error)
    res.status(500).json({
      message: "Error fetching user attempts",
      error: error.message,
    })
  }
}

