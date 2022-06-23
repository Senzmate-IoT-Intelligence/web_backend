const express = require("express");
const router = express.Router();
const accidentCntrl = require("../Controllers/accidents");

//post events
router.post("/create", accidentCntrl.createaccident);
router.get("/getall", accidentCntrl.allaccident);

router.post("/show", accidentCntrl.show);
// router.post('/store', empcntrl.store)
router.patch("/patch", accidentCntrl.update);
router.post("/delete", accidentCntrl.destroy);

module.exports = router;
