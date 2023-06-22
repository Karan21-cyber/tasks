const express = require("express");

const {addLocaiton,fetchLoaction} = require("../Controller/locationController");

const router = express.Router();

router.route("/").get(fetchLoaction);
router.route("/addlocation").post(addLocaiton);

module.exports = router;