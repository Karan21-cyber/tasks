const express = require("express");

const { fetchParking, updateParking, addParking } = require("../Controller/parkingController");

const router = express.Router();

router.get("/", fetchParking);
router.post("/addparking", addParking);
router.put("/update", updateParking);


module.exports = router;
