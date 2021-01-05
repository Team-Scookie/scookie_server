const express = require("express")
const { authUtil, responseMessage, statusCode, jwt } = require("../tools")
const userService = require("../services/user_service")

const router = express.Router()

// Find All
router.get("/", jwt.checkLogin, async (req, res) => {
  try {
    const { code, json } = await userService.findAllUser()
    return res.status(code).send(json)
  } catch (error) {
    console.error(error)
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
  }
})

// 회원가입
router.post("/signup", async (req, res) => {
  try {
    const { nickname, password, email } = req.body

    const { code, json } = await userService.signup({ nickname, password, email })
    return res.status(code).send(json)
  } catch (error) {
    console.error(error)
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
  }
})

// 로그인
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const { code, json } = await userService.login({ email, password })
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
    const { id } = req.params
    const { userId } = req.decoded
    const userInfo = req.body

    const { code, json } = await userService.updateUserInfo({ id, userId, ...userInfo })
    return res.status(code).send(json)
  } catch (error) {
    console.error(error)
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
  }
})

module.exports = router
