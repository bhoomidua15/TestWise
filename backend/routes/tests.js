const express = require("express")
const router = express.Router()
const testController = require("../controllers/testController")

router.get("/", testController.getAllTests)
router.post("/", testController.createTest)
router.get("/:id", testController.getTestById)
router.put("/:id", testController.updateTest)
router.delete("/:id", testController.deleteTest)
router.get("/:id/questions", testController.getTestQuestions)
router.post("/:id/questions", testController.addQuestionToTest)
router.put("/:id/questions/:questionId", testController.updateQuestion)
router.delete("/:id/questions/:questionId", testController.deleteQuestion)
router.post("/:id/submit", testController.submitTest)
router.get("/stats", testController.getTestStats)

module.exports = router

