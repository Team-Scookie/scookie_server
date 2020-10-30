const swaggerJSDoc = require("swagger-jsdoc")

// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Scookie API docs",
    version: "1.0.0",
    description: "Scookie 프로젝트의 API 문서입니다",
  },
  host: "localhost:3000",
  basePath: "/",
}

// Options for the swagger docs
const options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  apis: ["./config.js", "./routes/points.js"],
}

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options)
console.log(swaggerSpec)

module.exports = swaggerSpec

// https://app.swaggerhub.com/apis/Scookie/ScookieAPI/1.0.0#trial

/**
 * 1. 파일 어떻게 정리할건지 찾아보기
 * 2. Point 기준으로 API 만들기
 * 3. 내일 짜잔하기
 */