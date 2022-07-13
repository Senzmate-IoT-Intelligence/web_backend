const express = require("express");
const router = express.Router();
const insuranceCntrl = require("../Controllers/insurancedetail");

//post events
router.post("/create", insuranceCntrl.createinsurancedetail);
router.get("/getall", insuranceCntrl.allinsurancedetail);

router.get("/show/:id", insuranceCntrl.show);
// router.post('/store', empcntrl.store)
router.put("/update/:id", insuranceCntrl.update);
//router.delete("/delete/:id", empcntrl.destroy);

module.exports = router;
