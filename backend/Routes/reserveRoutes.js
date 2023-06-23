const express = require("express");
const { allReserves, addReserve, removeReserve } = require("../Controller/reserveController");
const router = express.Router();


router.route("/").get(allReserves);
router.route("/addreserve").post(addReserve);
router.route("/remove/:id").delete(removeReserve);

module.exports = router;