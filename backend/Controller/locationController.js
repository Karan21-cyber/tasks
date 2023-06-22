const Location = require("../Model/locationModel");

// add locations
const addLocaiton = async(req, res) => {
    const {locationName, address, phone} = req.body;

    if(!locationName || !address || !phone){
        res.status(400).json({error:"Fields should not be empty"});
        throw new Error("Fields should not be empty");
    }

    const locationExist = await Location.findOne({locationName});

    if(locationExist){
        res.status(400).json({error:"Location Name is already exists"});
        throw new Error("Location name is already exists");
    }

    const location = await Location.create({
        locationName,
        address,
        phone
    });

    if(location){
        res.status(201).json({
            id:location._id,
            locationName:location.locationName,
            address:location.address,
            phone:location.phone,
        })
    }
    else{
        res.status(400).json({
            error:"Unable to add new location"
        })
    }
}

// fetch all locations
const fetchLoaction = async( req, res) => {
    try{
        const locations = await Location.find();
        res.json(locations);
    }
    catch(error){
        res.status(400).json({"error":"unable to fetch locations"})
        throw new Error("Unable to fetch locations")
    }
}

module.exports = {addLocaiton,fetchLoaction};
