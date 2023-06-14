const mongoose = require("mongoose");

const parkingSchema = mongoose.Schema(
  {
    locationName: { type: String },
    spots : {type:Number},
    latitude: { type: String },
    lognitude: { type: String },
    address: { type: String },
  },
  {
    timestamps: true,
  }
);

const parkingModle = mongoose.model('ParkingSpot',parkingSchema);

module.exports= parkingModle;

