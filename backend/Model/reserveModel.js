const mongoose = require("mongoose");

const reserveSchema = mongoose.Schema({
    user:[{type:mongoose.Types.ObjectId, ref:"user"}],
    location:[{type:mongoose.Types.ObjectId, ref:"location"}],
    space:[{type:mongoose.Types.ObjectId, ref:"space"}],
    slotNo:{type:Number},
    status:{type:String},
    time:{type:String},
},
{
    timestamps:true,
}
);

const reserve = mongoose.Model("reserve", reserveSchema);

module.exports = reserve;