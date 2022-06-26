const express = require("express");
const router = express.Router();
const empcntrl = require("../Controllers/Employee");

//post events
router.post("/create", empcntrl.createemployee);
router.get("/getall", empcntrl.allemployees);

router.get("/show/:id", empcntrl.show);
// router.post('/store', empcntrl.store)
router.put("/update/:id", empcntrl.update);
router.delete("/delete/:id", empcntrl.destroy);

module.exports = router;
