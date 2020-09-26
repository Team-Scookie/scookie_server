const mongoose = require("mongoose")

const pointSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  timestamp: { type: Date, required: true },
})

module.exports = mongoose.model("Point", pointSchema)
