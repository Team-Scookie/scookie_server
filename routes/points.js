const express = require("express")
const PointService = require("../services/point.service")
const { authUtil, responseMessage, statusCode, jwt } = require("../tools")

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const { userId } = req.decoded
    const { code, json } = await PointService.read(userId, req.query)
    return res.status(code).send(json)
  } catch (error) {
    console.error(error)
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
  }
})

// router.get("/:userId", jwt.compareUserIds, async (req, res) => {
//   try {
//     const { code, json } = await PointService.readByUser({ userId: req.params.userId })
//     return res.status(code).send(json)
//   } catch (error) {
//     console.error(error)
//     return res
//       .status(statusCode.INTERNAL_SERVER_ERROR)
//       .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
//   }
// })

router.post("/", async (req, res) => {
  try {
    const { code, json } = await PointService.create(req.body)
    return res.status(code).send(json)
  } catch (error) {
    console.error(error)
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
  }
})

router.put("/:id", async (req, res) => {
  try {
    const { code, json } = await PointService.update(req.params.id, req.body)
    return res.status(code).send(json)
  } catch (error) {
    console.error(error)
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const { code, json } = await PointService.deletePoint(req.params.id)
    return res.status(code).send(json)
  } catch (error) {
    console.error(error)
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
  }
})

module.exports = router
