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
  servers: [
    {
      description: "dev server",
      url: "http://localhost:3000/",
    },
  ],
}

// Options for the swagger docs
const options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  apis: ["./routes/*.js"],
}

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec

// https://app.swaggerhub.com/apis/Scookie/ScookieAPI/1.0.0#trial
