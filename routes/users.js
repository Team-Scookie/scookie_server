const express = require("express")
const { authUtil, responseMessage, statusCode } = require("../tools")
const { findAllUserService, signupService, loginService } = require("../services/user_service")

const router = express.Router()

// Find All
router.get("/", async (req, res) => {
  try {
    const { code, json } = await findAllUserService()
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

    const { code, json } = await signupService({ nickname, password, email })
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

    const { code, json } = await loginService({ email, password })
    return res.status(code).send(json)
  } catch (error) {
    console.error(error)
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
  }
})

module.exports = router
