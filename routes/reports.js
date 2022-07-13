const express = require("express");
const router = express.Router();
const reportCntrl = require("../Controllers/reports");

router.post("/accident-count", reportCntrl.getAccidentCount);
router.post("/accident-count-weekly", reportCntrl.getAccidentCountweekly);
router.post("/accident-count-monthly", reportCntrl.getAccidentCountmonthly);

router.post("/accident-count-pie", reportCntrl.getAccidentCountpie);

module.exports = router;
