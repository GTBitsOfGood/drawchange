var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/ping", function(req, res, next) {
  res.send("We are live :) ");
  // res.render("index", { title: "Express" });
});

router.get("/test", (req, res) => {
  res.send("testing 123");
});

module.exports = router;
