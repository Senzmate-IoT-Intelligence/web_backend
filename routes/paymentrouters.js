const express = require("express");
const router = express.Router();
const paymentCtrl = require("../controllers/paymentController");

//post events
router.post("/create", paymentCtrl.createPayment);
router.get("/getall", paymentCtrl.allPayment);


// router.post('/show', empcntrl.show) 
// router.post('/store', empcntrl.store)
router.post('/update', paymentCtrl.updatePayment) 
router.delete('/delete/:id', paymentCtrl.deletePayment)

module.exports = router;