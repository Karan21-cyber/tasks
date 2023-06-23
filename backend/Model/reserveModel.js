const mongoose = require("mongoose");

const reserveSchema = mongoose.Schema(
  {
    user: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    location: [{ type: mongoose.Types.ObjectId, ref: "location" }],
    space: [{ type: mongoose.Types.ObjectId, ref: "space" }],
    slotNo: { type: Number },
    vehicalNo: { type: String },
    date: { type: String },
    time: { type: String },
    hours: { type: String },
  },
  {
    timestamps: true,
  }
);

const reserve = mongoose.model("reserve", reserveSchema);

module.exports = reserve;