const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
})
mongoose.set("useCreateIndex", true)
module.exports = mongoose.model("User", userSchema)
