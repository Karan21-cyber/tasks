const ParkingSpot = require("../Model/parkingModel");

const addParking = (async(req,res) => {
    const { locationName, spot, latitude, lognitude, address } = req.body;

    if(!locationName || !spot || !latitude || !lognitude || !address ){
        return res.sendstatus(400);
    }

    const parkingExist = await ParkingSpot.findOne({locationName});

    if(parkingExist){
        res.status(400);
        throw new Error("Location Already Exists");
    }

    const parking = await ParkingSpot.create({
      locationName,
      spot,
      latitude,
      lognitude,
      address,
    });

    if(parking){
        res.status(200).json({
          _id: parking._id,
          locationName:parking.locationName,
          spot:parking.spot,
          latitude:parking.latitude,
          lognitude:parking.lognitude,
          address:parking.address,
        });
    }
    else{
        res.status(400);
        throw new Error("failed to create parking location");
    }
})

const fetchParking = (async(req,res) => {
    try{
        ParkingSpot.findall().then(async(result) => {return result;});
        res.status(200).send(result);
    }
    catch(error){
        res.status(400);
        throw new Error(error);
    }
});

const updateParking = (async(req,res) => {
    const { parkingId, locationName, spot, latitude, lognitude, address } =
      req.body;

    const change = await ParkingSpot.findByIdAndUpdate(
      parkingId,
      {
        locationName,
        spot,
        latitude,
        lognitude,
        address,
      },
      {
        new : true,
      }
    );

    if(!change){
        res.status(400);
        throw new Error("Parking not Found");
    }
    else{
        res.json(change);
    }
})


module.exports = {addParking,fetchParking,updateParking};