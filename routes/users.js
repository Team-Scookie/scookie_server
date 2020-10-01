const express = require("express")
const bcrypt = require("bcrypt")
const Todo = require("../models/todo")
const User = require("../models/user")
const { authUtil, responseMessage, statusCode, jwt } = require("../tools")

const saltRounds = bcrypt.genSaltSync()

const router = express.Router()

// Find All
router.get("/", (req, res) => {
  Todo.findAll()
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
// Find One by todoid
router.get("/todoid/:todoid", (req, res) => {
  Todo.findOneByTodoid(req.params.todoid)
    .then(todo => {
      if (!todo) return res.status(404).send({ err: "Todo not found" })
      return res.send(`findOne successfully: ${todo}`)
    })
    .catch(err => res.status(500).send(err))
})

// Create new todo document
router.post("/", (req, res) => {
  Todo.create(req.body)
    .then(todo => res.send(todo))
    .catch(err => res.status(500).send(err))
})

// Update by todoid
router.put("/todoid/:todoid", (req, res) => {
  Todo.updateByTodoid(req.params.todoid, req.body)
    .then(todo => res.send(todo))
    .catch(err => res.status(500).send(err))
})

// Delete by todoid
router.delete("/todoid/:todoid", (req, res) => {
  Todo.deleteByTodoid(req.params.todoid)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err))
})

module.exports = router
