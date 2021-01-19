const request = require("supertest")
const app = require("../app")

describe("Temp test", () => {
  it("testing test", async () => {
    const response = await request(app).get("/points")
    console.log(response)

    expect(true).toBe(true)
  })
})

jest.useFakeTimers()
