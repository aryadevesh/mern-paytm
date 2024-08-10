const express = require("express");
const userRouter = require("./userRouter")
const accountHolder = require("./account")
const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountHolder);

module.exports = router;