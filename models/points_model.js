const mongoose = require("mongoose")

const pointSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    marker: {
      address: { type: String },
      placeName: { type: String },
      elapsedTime: { type: Number }, // seconds
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Point", pointSchema)
