const request = require("supertest")
const app = require("../app")
const dbManager = require("./dbManager.js")

afterAll(() => dbManager.close())
beforeAll(() => dbManager.connect())
// afterEach(() => dbManager.clear())

describe("POST /points", () => {
  test("success", async () => {
    const body = {
      userId: "test",
      latitude: "37.586786",
      longitude: "126.974800",
      elapsedTime: 30000,
    }
    const response = await request(app).post("/points").send(body).expect(201)
    console.log(response.body)
  })
})

describe("GET /points", () => {
  test("success", async () => {
    const response = await request(app).get("/points").expect(200)
    console.log(response.body)
  })
})

/**
 * {
      success: true,
      message: 'Point 작성 성공',
      data: {
        _id: '60112e9d3b9ab628f50f6816',
        userId: 'test',
        latitude: '37.5078166',
        longitude: '126.9529052',
        elapsedTime: 30000,
        address: '서울특별시 동작구 매봉로2가길 11',
        createdAt: '2021-01-27T09:13:01.259Z',
        updatedAt: '2021-01-27T09:13:01.259Z',
        __v: 0
      }
    }

 */
