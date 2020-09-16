const mongoose = require("mongoose")

const pinSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        address: { type: String },
        placeName: { type: String },
        arrivedAt: { type: Date, required: true },
        leftAt: { type: Date, required: true },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model("Pin", pinSchema)