const express = require("express");
const { allPayments, addPayment, singlePayment } = require("../Controller/paymentController");
const router = express.Router();

router.route("/").get(allPayments);
router.route("/addpayment").post(addPayment);
router.route("/single/:id").get(singlePayment);

module.exports = router;