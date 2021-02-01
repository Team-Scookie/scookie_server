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
      userId: data.user._id,
      latitude: "37.586786",
      longitude: "126.974800",
      elapsedTime: 30000,
    }
    const res = await request(app).post("/points").set("Authorization", `Bearer ${data.token}`).send(body)

    expect(res.status).toBe(201)
    expect(res.body.success).toEqual(true)
  })
})

describe("GET /points", () => {
  test("success", async () => {
    const res = await request(app).get("/points").set("Authorization", `Bearer ${data.token}`)

    ;[data.point] = res.body.data

    expect(res.status).toBe(200)
    expect(res.body.success).toEqual(true)
  })

  test("success - query:userId", async () => {
    const res = await request(app).get(`/points?userId=${data.user._id}`).set("Authorization", `Bearer ${data.token}`)

    expect(res.status).toBe(200)
    expect(res.body.success).toEqual(true)
  })

  test("success - query:userId (포인트가 없는 유저)", async () => {
    const userBody = {
      email: "user2@test.com",
      password: "user2",
      nickname: "user2",
    }

    const newUser = await request(app).post("/users/signup").send(userBody)
    const res = await request(app)
      .get(`/points?userId=${newUser.body.data.signinUser._id}`)
      .set("Authorization", `Bearer ${newUser.body.data.token}`)

    expect(res.status).toBe(200)
    expect(res.body.success).toEqual(true)
  })
})

describe("PUT /points/:id", () => {
  test("success - change placeName", async () => {
    const res = await request(app)
      .put(`/points/${data.point._id}`)
      .set("Authorization", `Bearer ${data.token}`)
      .send({ placeName: "changed" })

    expect(res.status).toBe(200)
    expect(res.body.success).toEqual(true)
    expect(res.body.data.placeName).toEqual("changed")
  })
})

describe("DELETE /points/:id", () => {
  test("success", async () => {
    const res = await request(app).delete(`/points/${data.point._id}`).set("Authorization", `Bearer ${data.token}`)

    expect(res.status).toBe(200)
    expect(res.body.success).toEqual(true)
  })
})
