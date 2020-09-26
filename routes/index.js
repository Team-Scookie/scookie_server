const express = require("express")
const Point = require("../models/point")

const router = express.Router()

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "Express" })
})

// Create new point document
router.post("/point/", (req, res) => {
  Point.create(req.body)
    .then((todo) => res.send(todo))
    .catch((err) => res.status(500).send(err))
})

module.exports = router
