const express = require("express")
const fetch =  require("node-fetch")
const PointService = require("../services/point-service")
const { authUtil, responseMessage, statusCode } = require("../tools")

const baseUrl = `https://dapi.kakao.com/v2/local/`

const router = express.Router()

router.get("/", async (req, res) => {
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

router.post("/", async (req, res) => {
  try {
    var address = await fetch(baseUrl+`geo/coord2address.json?input_coord=WGS84&x=126.9529052&y=37.5078166`, { method: 'GET', headers: {'Authorization': `KakaoAK ${process.env.KAKAO_KEY}`}})
    const addressResult = await address.json()
    console.log(JSON.stringify(addressResult, null, 2))

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
