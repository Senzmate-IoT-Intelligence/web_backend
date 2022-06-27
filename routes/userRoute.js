const express = require("express");
const router = express.Router();
const userCntrl = require("../controllers/userController");
const { auth } = require("../middleware/auth");

router.post("/userregister", userCntrl.userregister);
router.post("/userlogin", userCntrl.userlogin);
router.post("/profile", auth, userCntrl.updateUserProfile);

module.exports = router;
