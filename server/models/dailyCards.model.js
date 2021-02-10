const mongoose = require("mongoose")

const dailyCardsSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  title: { type: String },
  subTitle: { type: String },
  cookieCount: { type: Number, required: true, default: 0 },
})

module.exports = mongoose.model("dailyCards", dailyCardsSchema)
