const mongoose = require("mongoose");

const reserveSchema = mongoose.Schema({
  parking: [{ type: mongoose.Schema.Types.ObjectId, ref: "ParkingSpot" }],
  user:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
  spot :{type:Number},
  date:{type:String},
  from:{type:String},
  hours:{type:Number},
  status:{type:String},
});

const reserveModel = mongoose.model("reservespot",reserveSchema);

module.exports = reserveModel;