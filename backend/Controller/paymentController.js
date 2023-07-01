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
    return;
  }

  const paymentExist = await Payment.find({
    user,
    location,
    space,
    reserve,
    slotNo,
    vehicalNo,
    entryDate,
    totalHrs,
    amount,
  });

  // if(paymentExist){
    
  // }

   const payment = await Payment.create({
     user,
     location,
     space,
     reserve,
     slotNo,
     vehicalNo,
     entryDate,
     totalHrs,
     amount,
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

}


const userReport = async(req, res) => {
  const userId  = req.params.uid;

  const payments = await Payment.find({user:userId}).populate("user","-password").populate("location").populate("space");

  if(payments) {
    res.status(200).json(payments);
  }
  else{
    res.status(400).json({"Error":"Unable to fetch data"});
  }
}

module.exports = {singlePayment,allPayments,addPayment,userReport};