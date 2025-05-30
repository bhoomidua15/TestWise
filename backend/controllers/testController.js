const Test = require("../models/Test")
const Question = require("../models/Question")
const TestResult = require("../models/TestResult")
const User = require("../models/User")
const { sendCertificationEmail } = require("../email")
const _ = require("lodash")

exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.find()
    res.json(tests)
  } catch (err) {
    console.error("Error fetching tests:", err)
    res.status(500).json({ message: "Server error" })
  }
}

exports.createTest = async (req, res) => {
  try {
    const test = new Test({
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      questions: req.body.questions,
    })
    await test.save()
    res.status(201).json(test)
  } catch (err) {
    console.error("Error creating test:", err)
    res.status(500).json({ message: "Server error" })
  }
}

exports.getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate("questions", "text options correctAnswer")

    if (!test) {
      return res.status(404).json({ message: "Test not found" })
    }

    res.json(test)
  } catch (err) {
    console.error("Error fetching test:", err)
    res.status(500).json({ message: "Server error" })
  }
}

exports.updateTest = async (req, res) => {
  const { title, description, duration } = req.body
  const test = await Test.findByIdAndUpdate(req.params.id, { title, description, duration }, { new: true })
  res.json(test)
}

exports.deleteTest = async (req, res) => {
  await Test.findByIdAndDelete(req.params.id)
  res.sendStatus(204)
}

exports.getTestQuestions = async (req, res) => {
  const test = await Test.findById(req.params.id).populate("questions")
  const shuffledQuestions = _.shuffle(test.questions)
  res.json(shuffledQuestions)
}

exports.addQuestionToTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id)
    if (!test) {
      return res.status(404).json({ message: "Test not found" })
    }

    const question = new Question({
      text: req.body.text,
      options: req.body.options,
      correctAnswer: req.body.correctAnswer,
      type: req.body.type || "mcq",
    })

    await question.save()
    test.questions.push(question._id)
    await test.save()

    res.status(201).json(question)
  } catch (err) {
    console.error("Error creating question:", err)
    res.status(500).json({ message: "Server error" })
  }
}

exports.updateQuestion = async (req, res) => {
  try {
    const { text, options, correctAnswer, type } = req.body
    const question = await Question.findByIdAndUpdate(
      req.params.questionId,
      { text, options, correctAnswer, type },
      { new: true },
    )
    res.json(question)
  } catch (err) {
    console.error("Error updating question:", err)
    res.status(500).json({ error: err.message })
  }
}

exports.deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.questionId)
    const test = await Test.findById(req.params.id)
    test.questions = test.questions.filter((q) => q.toString() !== req.params.questionId)
    await test.save()
    res.sendStatus(204)
  } catch (err) {
    console.error("Error deleting question:", err)
    res.status(500).json({ error: err.message })
  }
}

exports.submitTest = async (req, res) => {
  try {
    const { id } = req.params
    const { answers, userId } = req.body

    const test = await Test.findById(id).populate("questions")
    if (!test) {
      return res.status(404).json({ message: "Test not found" })
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    let correctAnswers = 0
    const totalQuestions = test.questions.length

    answers.forEach((answer) => {
      const question = test.questions.find((q) => q._id.toString() === answer.questionId)
      if (question && question.correctAnswer === answer.answer) {
        correctAnswers++
      }
    })

    const score = (correctAnswers / totalQuestions) * 100

    const testResult = new TestResult({
      user: userId,
      test: test._id,
      answers: answers.map(({ questionId, answer }) => ({
        questionId,
        selectedAnswer: answer,
      })),
      score,
      totalQuestions,
      completedAt: new Date(),
    })

    await testResult.save();

    if(score === 100){
      try{
        await sendCertificationEmail(user.email, user.name, test.title)
        console.log("Certification email sent successfully")
      }catch(error){
        console.error("Error sending certification email:", error)
      }
    }

    res.json({
      score,
      totalQuestions,
      correctAnswers,
      message: "Test submitted successfully",
    })
  } catch (error) {
    console.error("Error submitting test:", error)
    res.status(500).json({ message: "Error submitting test" })
  }
}

exports.getTestStats = async (req, res) => {
  try {
    const hasResults = await TestResult.exists()
    if (!hasResults) {
      return res.json({})
    }

    const stats = await TestResult.aggregate([
      {
        $group: {
          _id: "$test",
          attempts: { $sum: 1 },
          avgScore: { $avg: { $multiply: ["$score", 100] } },
        },
      },
    ])

    const statsMap = {}
    stats.forEach((stat) => {
      if (stat._id) {
        statsMap[stat._id.toString()] = {
          attempts: stat.attempts,
          avgScore: Math.round(stat.avgScore || 0),
        }
      }
    })

    res.json(statsMap)
  } catch (error) {
    console.error("Error in /api/tests/stats:", error)
    res.status(500).json({
      message: "Error fetching test statistics",
      error: error.message,
    })
  }
}

