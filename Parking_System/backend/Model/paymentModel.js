const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  reservespot: [{ type: mongoose.Schema.Types.ObjectId, ref: "reservespot" }],
  totalamount:{type:String},
});