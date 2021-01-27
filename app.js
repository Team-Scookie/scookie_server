const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")

const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const yaml = require("yamljs")
const swaggerUi = require("swagger-ui-express")

const indexRouter = require("./routes/index")

const app = express()

dotenv.config()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

if (process.env.NODE_ENV === "production") {
  app.use(logger("combined"))
} else {
  app.use(logger("dev"))
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

// Body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Node.js의 native Promise 사용
mongoose.Promise = global.Promise
const swaggerSpec = yaml.load(path.join(__dirname, "./swagger/build.yaml"))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use("/", indexRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
// app.use((err, req, res, next) => {
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

mongoose.set("useFindAndModify", false)
mongoose.set("useCreateIndex", true)

// CONNECT TO MONGODB SERVER
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected to mongodb"))
    .catch(e => console.error(e))
}

module.exports = app
