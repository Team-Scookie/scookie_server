const express = require("express")

const router = express.Router()

// Health Check
router.get("/", (req, res) => {
  res.render("index", { title: "Express" })
})

router.use("/users", require("./users"))
router.use("/points", require("./points"))

module.exports = router
