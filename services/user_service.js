const bcrypt = require("bcrypt")
const User = require("../models/user")
const { authUtil, responseMessage, statusCode, jwt } = require("../tools")

const saltRounds = bcrypt.genSaltSync()

// 모든 회원 정보 조회
const findAllUserService = async () => {
  const res = await User.find()

  if (!res) {
    return {
      code: statusCode.INTERNAL_SERVER_ERROR,
      json: authUtil.successFalse(responseMessage.NO_X("회원")),
    }
  }

  return {
    code: statusCode.OK,
    json: authUtil.successTrue(responseMessage.X_READ_SUCCESS("회원"), res),
  }
}

// 회원가입 서비스
const signupService = async ({ nickname, password, email }) => {
  if (!nickname || !password || !email) {
    return {
      code: statusCode.BAD_REQUEST,
      json: authUtil.successFalse(responseMessage.NULL_VALUE),
    }
  }

  const user = await User.findOne({ email })
  if (user) {
    return {
      code: statusCode.BAD_REQUEST,
      json: authUtil.successFalse(responseMessage.DUPLICATE_VALUE_ERROR),
    }
  }

  const hashedPassword = bcrypt.hashSync(password, saltRounds)

  const signinUser = await User.create({
    nickname,
    password: hashedPassword,
    email,
  })

  if (!signinUser) {
    return {
      code: statusCode.INTERNAL_SERVER_ERROR,
      json: authUtil.successFalse(responseMessage.X_CREATE_FAIL("USER")),
    }
  }
  const { token } = jwt.sign(signinUser)
  return {
    code: statusCode.CREATED,
    json: authUtil.successTrue(responseMessage.X_CREATE_SUCCESS("USER"), { signinUser, token }),
  }
}

// 로그인 서비스
const loginService = async ({ email, password }) => {
  if (!email || !password) {
    return {
      code: statusCode.BAD_REQUEST,
      json: authUtil.successFalse(responseMessage.NULL_VALUE),
    }
  }

  const getUserInfoResult = await User.findOne({ email })
  if (!getUserInfoResult) {
    return {
      code: statusCode.BAD_REQUEST,
      json: authUtil.successFalse(responseMessage.NO_X("USER")),
    }
  }

  const isCorrectPassword = getUserInfoResult.password && bcrypt.compareSync(password, getUserInfoResult.password)
  if (!isCorrectPassword) {
    return {
      code: statusCode.BAD_REQUEST,
      json: authUtil.successFalse(responseMessage.MISS_MATCH_USER_INFO),
    }
  }
  const { token } = jwt.sign(getUserInfoResult)
  return {
    code: statusCode.OK,
    json: authUtil.successTrue(responseMessage.SIGN_IN_SUCCESS, { getUserInfoResult, token }),
  }
}

module.exports = { findAllUserService, signupService, loginService }
