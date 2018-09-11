var express = require('express');
var router = express.Router();
const friend = require('../server/friendLib')();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/addFriend', function (req, res, next) {
  res.send({
    a: 12
  });
})
module.exports = router;