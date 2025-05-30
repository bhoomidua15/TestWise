const express = require("express")
const router = express.Router()

const authRoutes = require("./auth")
const testRoutes = require("./tests")
const userRoutes = require("./users")

router.use("/auth", authRoutes)
router.use("/tests", testRoutes)
router.use("/users", userRoutes)

module.exports = router

