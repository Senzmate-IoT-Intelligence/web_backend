const express = require("express");
const router = express.Router();
const empcntrl = require("../Controllers/accidents");

//post events
router.post("/create", accidentCntrl.createemployee);
router.get("/getall", accidentCntrl.allemployees);

router.post("/show", accidentCntrl.show);
// router.post('/store', empcntrl.store)
router.post("/update", accidentCntrl.update);
router.post("/delete", accidentCntrl.destroy);

module.exports = router;
