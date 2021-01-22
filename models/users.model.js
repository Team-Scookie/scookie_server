const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
  cookieCount: { type: Number, required: true, default: 0 },
})

module.exports = mongoose.model("User", userSchema)
