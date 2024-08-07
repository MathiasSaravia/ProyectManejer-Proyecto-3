var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
 res.status(200).json({
  ok : true ,
  msg :"Welcome"
 })
});

module.exports = router;
