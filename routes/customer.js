const express = require("express");
const router = express.Router();
const empcntrl = require("../controllers/customer");

//post events
router.post("/create", custcntrl.createcustomer);
router.get("/getall", custcntrl.allcustomers);

router.post("/update", custcntrl.update);
router.post("/delete", custcntrl.destroy);

module.exports = router;
