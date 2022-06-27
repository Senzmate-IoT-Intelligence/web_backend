const express = require("express");
const router = express.Router();
const tripCntrl = require("../Controllers/trips");

//post events
router.post("/create", tripCntrl.creattrip);
router.get("/getall", tripCntrl.alltrip);

//router.post("/show", accidentCntrl.show);
// router.post('/store', empcntrl.store)
//router.patch("/patch", tripCntrl.update);
//router.post("/delete", tripCntrl.destroy);

module.exports = router;
