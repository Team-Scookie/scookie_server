const express = require("express")
const PointService = require("../services/point-service")
const { authUtil, responseMessage, statusCode } = require("../tools")

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Points
 *   description: Point API
 * components:
 *   schemas:
 *     Points:
 *       type: object
 *       required:
 *         - _id
 *         - userId
 *         - latitude
 *         - longitude
 *         - createdAt
 *       properties:
 *         _id:
 *           type: string
 *           description: ObjectID
 *         userId:
 *           type: string
 *           description: 유저 아이디
 *         latitude:
 *           type: string
 *           description: 위도
 *         longitude:
 *           type: string
 *           description: 경도
 *         createdAt:
 *           type: string
 *           description: 생성 시간
 *         updatedAt:
 *           type: string
 *           description: 수정 시간
 *         marker:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *               description: 주소
 *             placeName:
 *               type: string
 *               description: 장소 이름
 *             elapsedTime:
 *               type: number
 *               description: 경과 시간
 * definitions:
 *   responses:
 *     BadRequest:
 *       description: 잘못된 요청
 *       schema:
 *         type: object
 *         properties:
 *           errorMessage:
 *             type: string
 *     InternalServerError:
 *       description: 서버 에러
 *       schema:
 *         type: object
 *         properties:
 *           errorMessage:
 *             type: string
 */

/**
 * @swagger
 * /points:
 *   get:
 *     summary: Returns Point list
 *     tags: [Points]
 *     responses:
 *       200:
 *         description: point list
 *         schema:
 *           type: array
 *           properties:
 *             points:
 *               type: object
 *               items:
 *                 $ref: '#/definitions/Points'
 */
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
