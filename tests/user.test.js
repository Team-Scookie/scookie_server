const request = require("supertest")
const app = require("../app")
const dbManager = require("./dbManager.js")

afterAll(() => dbManager.close())
beforeAll(() => dbManager.connect())
// afterEach(() => dbManager.clear())

describe("POST /users/signup", () => {
  test("success", async () => {
    const body = {
      email: "test@test.com",
      password: "test",
      nickname: "test",
    }
    const response = await request(app).post("/users/signup").send(body).expect(201)
    console.log(response.body)
  })
})

describe("POST /users/login", () => {
  test("success", async () => {
    const body = {
      email: "test@test.com",
      password: "test",
    }
    const response = await request(app).post("/users/login").send(body).expect(200)
    console.log(response.body)
  })
})
