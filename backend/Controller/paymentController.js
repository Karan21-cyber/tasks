const Payment = require("../Model/paymentModel");

// create payment details
const addPayment = async (req, res) => {
  const { user, location,reserve, space, slotNo, vehicalNo, entryDate, totalHrs, amount } =req.body;

  if (
    !user ||
    !location ||
    !space ||
    !slotNo ||
    !vehicalNo ||
    !entryDate ||
    !totalHrs ||
    !amount ||
    !reserve
  ) {
    res.status(400).json({ error: "All fields are required" });
  }

    const payment = await Payment.create({
      user,
      location,
      space,
      reserve,
      slotNo,
      vehicalNo,
      entryDate,
      totalHrs,
      amount
    });

    if (payment) {
      res.status(201).json(payment);
    } else {
      res.status(400).json({ error: "Unable to  insert in payment" });
    }
 
};


// fetch all the payments

const allPayments = async (req,res) => {
    const payments = await Payment.find({}).populate("user","-password").populate("location").populate("space");
    if(payments){
        res.status(200).json(payments);
    }
    else{
        res.status(400).json({"error":"Unable to fetch data"});
    }
}

const singlePayment = async (req , res) => {
    const paymentId = req.params.id;

    // res.send(paymentId);
    const payment = await Payment.findOne({_id:paymentId});
    
    if(payment){
        res.status(201).json(payment);
    }
    else{
        res.status(400).json({"error":"unable to fetch single data"});
    }
    
    // const payments = await Payment.findOne({_id:paymentId});

    // if (payments) {
    //   res.status(200).json(payments);
    // } else {
    //   res.status(400).json({ error: "Unable to fetch single data" });
    // }
}


module.exports = {singlePayment,allPayments,addPayment};