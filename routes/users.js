var express = require('express');
var router = express.Router();
const Friend = require('../server/friendLib');

const friend = new Friend();

function getCurrentFriend(req) {
  // for now, we only use one friend setup.
  // in futute can use different data for different req
  return friend;
}
router.post('/addFriend', function (req, res, next) {
  getCurrentFriend(req).add(req.body.friends[0], req.body.friends[1])
    .then(data => {
      res.send(data);
    });
})
router.post('/getFriends', function (req, res, next) {
  getCurrentFriend(req).getFriends(req.body.email)
    .then(data => {
      res.send(data);
    });
})
router.post('/commonFriend', function (req, res, next) {
  getCurrentFriend(req).commonFriend(req.body.friends[0], req.body.friends[1])
    .then(data => {
      res.send(data);
    });
})
router.post('/subscribeUpdate', function (req, res, next) {
  getCurrentFriend(req).subscribe(req.body.requestor, req.body.target)
    .then(data => {
      res.send(data);
    });
})
router.post('/block', function (req, res, next) {
  getCurrentFriend(req).block(req.body.requestor, req.body.target)
    .then(data => {
      res.send(data);
    });
})
router.post('/retrieve', function (req, res, next) {
  getCurrentFriend(req).retrieve(req.body.sender, req.body.text)
    .then(data => {
      res.send(data);
    });
})



module.exports = router;