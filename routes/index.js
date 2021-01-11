const express = require("express")
const usersRoute = require("./users")
const pointRoute = require("./points")
const { jwt } = require("../tools")

const router = express.Router()

// Health Check
router.get("/", (req, res) => {
  res.render("index", { title: "Express" })
})

router.use("/users", usersRoute)
router.use(jwt.checkLogin)
router.use("/points", pointRoute)

module.exports = router
