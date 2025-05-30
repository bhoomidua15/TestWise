const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.get("/:id/exam-history", userController.getExamHistory)
router.get("/:id/performance", userController.getUserPerformance)
router.get("/:userId/test-attempts", userController.getUserTestAttempts)

module.exports = router

