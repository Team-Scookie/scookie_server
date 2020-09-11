const mongoose = require("mongoose")

const pointSchema = new mongoose.Schema(
  {
    point_id: { type: Number, required: true, unique: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Point", pointSchema)
