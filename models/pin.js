const mongoose = require("mongoose")

const pointSchema = new mongoose.Schema(
    {
        pin_id: { type: Number, required: true, unique: true },
        point_id: { type: Number, required: true },
        address: { type: String },
        place_name: { type: String },
        arrived_at: { type: String, required: true },
        left_at: { type: String, required: true },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model("Point", pointSchema)