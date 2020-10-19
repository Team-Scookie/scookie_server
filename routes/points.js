const express = require("express")
const Point = require("../models/point")
const PointController = require("../controller/pointController")

const router = express.Router()

/* GET home page. */
router.get("/", (req, res) => {
  Point.find()
    .then(points => res.send(points))
    .catch(err => res.status(500).send(err))
})

// Create new point document
router.post("/", (req, res) => {
  Point.create(req.body)
    .then(point => res.send(point))
    .catch(err => res.status(500).send(err))
})

router.put("/", PointController.updatePoint)
router.delete("/", PointController.deletePoint)

module.exports = router
