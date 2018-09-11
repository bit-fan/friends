var express = require('express');
var router = express.Router();
const Friend = require('../server/friendLib');

const friend = new Friend();
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/addFriend', function (req, res, next) {
  friend.add(req.body["friends[]"][0], req.body["friends[]"][1])
    .then(data => {
      res.send(data);
    });
})
router.post('/getFriends', function (req, res, next) {
  friend.getFriends(req.body.email)
    .then(data => {
      res.send(data);
    });
})
module.exports = router;