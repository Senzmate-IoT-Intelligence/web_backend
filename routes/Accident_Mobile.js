const express = require("express");
const router = express.Router();
const AccidentDetailsCntrl = require("../controllers/Accident_Mobile");
const {} = require("../middleware/auth");

//post events
// router.post("/create", TripDetailsCntrl.createaccident);
// router.get("/getall", TripDetailsCntrl.allaccident);

router.get("/show", AccidentDetailsCntrl.show);
router.post("/create", AccidentDetailsCntrl.createAccidentDetail);


module.exports = router;