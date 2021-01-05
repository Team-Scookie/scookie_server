const express = require("express")
const PointService = require("../services/point_service")
const { authUtil, responseMessage, statusCode, jwt } = require("../tools")

const router = express.Router()

router.get("/", jwt.checkLogin, async (req, res) => {
  try {
    const { code, json } = await PointService.read()
    return res.status(code).send(json)
  } catch (error) {
    console.error(error)
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
  }
})

router.post("/", jwt.checkLogin, async (req, res) => {
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

router.put("/:id", jwt.checkLogin, async (req, res) => {
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

router.delete("/:id", jwt.checkLogin, async (req, res) => {
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
