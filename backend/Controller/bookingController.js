const Booking = require("../Model/bookingModel");

// addbooking

const addbooking = async (req, res) => {
  const { user, location, space, slotNo } = req.body;

  if(!user || !location || !space || !slotNo){
    res.status(400).json({"error":"All Fields are required"});
    return;
  }
  const booking = await Booking.create({
    user,
    location,
    space,
    slotNo,
  });

  if (booking) {
    res
      .status(201)
      .json({
        _id: booking._id,
        user:booking._id,
        location: booking.location,
        space: booking.space,
        slotNo: booking.slotNo,
      });
  } else {
    res.status(400).json({ error: "unable to store data" });
  }
};

const singlebooking = async (req, res) => {

  const { user, location, space, slotNo } = req.query;

  const data = await Booking.findOne({ user, location, space, slotNo });

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(400).json({ error: "unable to fetch single data" });
  }
};


const fetchBooking = async(req, res) => {
   const data = await Booking.find({});

   if (data) {
     res.status(201).json(data);
   } else {
     res.status(400).json({ error: "unable to fetch all data" });
   }
}

const removeBooking = async(req,res) => {
    const  bookingId = req.params.id;

    const remove = await Booking.deleteOne({ _id: bookingId });

    if (remove) {
      res.status(201).json(remove);
    } else {
      res.status(400).json({ Error: "Unable to remove booking" });
    }
}

module.exports = { addbooking, singlebooking,fetchBooking ,removeBooking};
