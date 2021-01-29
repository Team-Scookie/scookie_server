const request = require("supertest")
const app = require("../app")
const dbManager = require("./dbManager.js")

let data = null

afterAll(() => dbManager.close())
beforeAll(async () => {
  await dbManager.connect()

  const body = {
    email: "test@test.com",
    password: "test",
    nickname: "test",
  }

  const res = await request(app).post("/users/signup").send(body)
  data = { user: res.body.data.signinUser, token: res.body.data.token }
})
// afterEach(() => dbManager.clear())

describe("POST /points", () => {
  test("success", async () => {
    const body = {
      userId: "test",
      latitude: "37.586786",
      longitude: "126.974800",
      elapsedTime: 30000,
    }
    const res = await request(app).post("/points").set("token", data.token).send(body)

    expect(res.status).toBe(201)
    expect(res.body.success).toEqual(true)
  })
})

describe("GET /points", () => {
  test("success", async () => {
    const res = await request(app).get("/points").set("token", data.token)

    expect(res.status).toBe(200)
    expect(res.body.success).toEqual(true)
  })
})
