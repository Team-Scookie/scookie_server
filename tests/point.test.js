const mongoose = require("mongoose")
const request = require("supertest")
const app = require("../app")

describe("Temp test", () => {
  let connection = null

  beforeAll(async () => {
    connection = await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch(e => console.error(e))
  })

  afterAll(async () => {
    await connection.close()
  })

  it("testing test", async () => {
    const response = await request(app).get("/points")
    console.log(response.status)
    console.log(response.body)

    expect(true).toBe(true)
  })
})
