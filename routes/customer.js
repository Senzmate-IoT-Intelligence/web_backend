const express = require("express");
const router = express.Router();
const custCntrl = require("../controllers/customer");

//post events
router.post("/create", custCntrl.createcustomer);
router.get("/getall", custCntrl.allcustomers);
router.get("/show/:id", custCntrl.show);

router.put("/update/:id", custCntrl.update);
router.post("/delete/:id", custCntrl.destroy);

module.exports = router;
