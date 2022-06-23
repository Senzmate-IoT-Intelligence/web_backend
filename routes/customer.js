const express = require("express");
const router = express.Router();
const custCntrl = require("../controllers/customer");

//post events
router.post("/create", custCntrl.createcustomer);
router.get("/getall", custCntrl.allcustomers);

router.post("/update", custCntrl.update);
router.post("/delete", custCntrl.destroy);

module.exports = router;
