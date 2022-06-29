const express = require("express");
const router = express.Router();
const TripDetailsCntrl = require("../controllers/TripDetails");
const {} = require("../middleware/auth");

//post events
// router.post("/create", TripDetailsCntrl.createaccident);
// router.get("/getall", TripDetailsCntrl.allaccident);

router.post("/show", TripDetailsCntrl.show);
router.post("/create", TripDetailsCntrl.createTripDetail);
// router.post('/store', empcntrl.store)

module.exports = router;