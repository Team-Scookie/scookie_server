const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const { authUtil, responseMessage, statusCode, jwt } = require("../tools")

const saltRounds = bcrypt.genSaltSync()

const router = express.Router()

// Find All
router.get("/", (req, res) => {
  User.findAll()
    .then(users => {
      if (!users.length) return res.status(404).send({ err: "users not found" })
      return res.send(`find successfully: ${users}`)
    })
    .catch(err => res.status(500).send(err))
})

// 회원가입
router.post("/signup", async (req, res) => {
  const { nickname, password, email } = req.body

  if (!nickname || !password || !email) {
    return res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE))
  }

  const user = await User.findOne({ email })
  if (user) {
    return res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.DUPLICATE_VALUE_ERROR))
  }

  const hashedPassword = bcrypt.hashSync(password, saltRounds, err => {
    if (err) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
    }
  })

  const signinUser = await User.create({
    nickname,
    password: hashedPassword,
    email,
  })

  if (!signinUser) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(authUtil.successFalse(responseMessage.X_CREATE_FAIL("USER")))
  }
  const { token } = jwt.sign(signinUser)

  return res
    .status(statusCode.CREATED)
    .send(authUtil.successTrue(responseMessage.X_CREATE_SUCCESS("USER"), { signinUser, token }))
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE))
  }

  const getUserInfoResult = await User.findOne({ email })
  if (!getUserInfoResult) {
    return res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NO_X("USER")))
  }

  const isCorrectPassword =
    getUserInfoResult.password &&
    bcrypt.compareSync(password, getUserInfoResult.password, (err, response) => {
      console.log(err, response)
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
    })

  if (!isCorrectPassword) {
    return res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.MISS_MATCH_USER_INFO))
  }
  const { token } = jwt.sign(getUserInfoResult)
  return res
    .status(statusCode.OK)
    .send(authUtil.successTrue(responseMessage.SIGN_IN_SUCCESS, { getUserInfoResult, token }))
})

module.exports = router
