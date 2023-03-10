const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("welcome to chattab");
});

module.exports = router;
