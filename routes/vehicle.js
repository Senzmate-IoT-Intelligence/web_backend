const express = require("express");
const router = express.Router();
const vehicleCntrl = require("../Controllers/vehicle");

//post events
router.post("/create", vehicleCntrl.createvehicle);
router.get("/getall", vehicleCntrl.allvehicle);

router.get("/show/:id", vehicleCntrl.show);
// router.post('/store', empcntrl.store)
router.put("/update/:id", vehicleCntrl.update);
router.delete("/delete/:id", vehicleCntrl.destroy);

module.exports = router;
