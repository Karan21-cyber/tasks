const Reserve = require("../Model/reserveModel");

// create reserve slot

const addReserve = async (req, res) => {
  const { user, location, space, slotNo,  vehicalNo, date, time, hours } =
    req.body;

  if (!user || !location || !space || !slotNo || !vehicalNo || !date || !time || !hours) {
    res.status(400).json({"error":"All fields are required"});
}

  const slotreserve = await Reserve.findOne({ location, space, slotNo });

  if(!slotreserve){
    const reserve = await Reserve.create({
      user,
      location,
      space,
      slotNo,
      vehicalNo,
      date,
      time,
      hours,
    });

    if(reserve){
        res.status(201).json(reserve);
    }
    else{
        res.status(400).json({"error":"Unable to reserve slots"});
    }
  }
  else{
    res.status(400).json({"error":"Slot is already reserved"});
  }
};

// fetch all reserves 
const allReserves = async (req, res) => {
    const reserves = await Reserve.find({}).populate("location").populate("space");

    if(reserves){
        res.status(201).json(reserves);
    }
    else{
        res.status(400).json({error:"Unable to fetch data"});
    }
}

// update Reservers 

// const updateReserves = async(req, res) => {
//     try{
//     const {location,space,slotNo,status} = req.body;

//     const reservation = await Reserve.findOne({location,space,slotNo});
    
//     if(!reservation){
//        return res.status(400).json({error:"Reservation not found"});
//     }

//     // update status
//     reservation.status = status;
//     await reservation.save().populate("location").populate("space");

//     return res.status(201).json(reservation);

// }
// catch(error){
//      return res.status(500).json({ error: "Internal server error" });
// }
    
// }


const removeReserve = async(req,res) => {
    const slotId = req.params.id;

    const remove = await Reserve.deleteOne({_id:slotId});
    
    if(remove){
        res.status(201).json(remove);
    }
    else{
        res.status(400).json({"Error":"Unable to remove slots"});
    }
}



module.exports = {addReserve,allReserves,removeReserve};