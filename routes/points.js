const express = require("express")
const Point = require("../models/point")
const PointService = require("../services/point_service")

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

router.put("/", PointService.updatePoint)
router.delete("/", PointService.deletePoint)

module.exports = router
