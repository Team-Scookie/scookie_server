const request = require("supertest")
const app = require("../app")
const dbManager = require("./dbManager.js")

afterAll(() => dbManager.close())
beforeAll(() => dbManager.connect())

describe("POST /users/signup", () => {
  test("success", async () => {
    const body = {
      email: "test@test.com",
      password: "test",
      nickname: "test",
    }
    const res = await request(app).post("/users/signup").send(body)

    expect(res.status).toBe(201)
    expect(res.body.success).toEqual(true)
  })
})

let data = null

describe("POST /users/login", () => {
  test("success", async () => {
    const body = {
      email: "test@test.com",
      password: "test",
    }
    const res = await request(app).post("/users/login").send(body)

    data = { user: res.body.data.getUserInfoResult, token: res.body.data.token }

    expect(res.status).toBe(200)
    expect(res.body.success).toEqual(true)
  })
})

describe("PUT /users/:id", () => {
  test("success - change nickname", async () => {
    const res = await request(app).put(`/users/${data.user._id}`).set("token", data.token).send({ nickname: "changed" })

    expect(res.status).toBe(200)
    expect(res.body.success).toEqual(true)
    expect(res.body.data.nickname).toEqual("changed")
  })
})

describe("GET /users/", () => {
  test("success", async () => {
    const res = await request(app).get("/users/").set("token", data.token)

    expect(res.status).toBe(200)
    expect(res.body.success).toEqual(true)
  })
})
