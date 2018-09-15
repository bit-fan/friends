var express = require('express');
var router = express.Router();
const Friend = require('../server/friendLib');

const friend = new Friend();

function getCurrentFriend(req) {
  // for now, we only use one friend dataset.
  // in futute can use different dataset for different req
  return friend;
}
router.post('/clearAll', function (req, res, next) {
  getCurrentFriend(req).init();
  return commonRes(res, {
    success: true
  });
})
router.post('/addFriend', function (req, res, next) {
  getCurrentFriend(req).add(req.body.friends[0], req.body.friends[1])
    .then(data => {
      return commonRes(res, data);
    });
})
router.post('/getFriends', function (req, res, next) {
  getCurrentFriend(req).getFriends(req.body.email)
    .then(data => {
      return commonRes(res, data);
    });
})
router.post('/commonFriend', function (req, res, next) {
  getCurrentFriend(req).commonFriend(req.body.friends[0], req.body.friends[1])
    .then(data => {
      return commonRes(res, data);
    });
})
router.post('/subscribeUpdate', function (req, res, next) {
  getCurrentFriend(req).subscribe(req.body.requestor, req.body.target)
    .then(data => {
      return commonRes(res, data);
    });
})
router.post('/block', function (req, res, next) {
  getCurrentFriend(req).block(req.body.requestor, req.body.target)
    .then(data => {
      return commonRes(res, data);
    });
})
router.post('/retrieve', function (req, res, next) {
  getCurrentFriend(req).retrieve(req.body.sender, req.body.text)
    .then(data => {
      return commonRes(res, data);
    });
})

function commonRes(res, data) {
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
}

module.exports = router;