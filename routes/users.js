var express = require('express');
var router = express.Router();
const Friend = require('../server/friendLib');
const util = require('../server/util');


let friend = new Friend();


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
  if (!validateArrAndLength(res, req.body.friends, 2)) {
    return;
  }
  const email1 = req.body.friends[0];
  const email2 = req.body.friends[1];
  if (!validateEmails(res, [email1, email2])) {
    return;
  }

  getCurrentFriend(req).add(email1, email2)
    .then(data => {
      return commonRes(res, data);
    });
})
router.post('/getFriends', function (req, res, next) {
  if (!validateEmails(res, [req.body.email])) {
    return;
  }
  getCurrentFriend(req).getFriends(req.body.email)
    .then(data => {
      return commonRes(res, data);
    });
})
router.post('/commonFriend', function (req, res, next) {
  if (!validateArrAndLength(res, req.body.friends, 2)) {
    return;
  }
  const email1 = req.body.friends[0];
  const email2 = req.body.friends[1];
  if (!validateEmails(res, [email1, email2])) {
    return;
  }
  getCurrentFriend(req).commonFriend(email1, email2)
    .then(data => {
      return commonRes(res, data);
    });
})
router.post('/subscribeUpdate', function (req, res, next) {
  if (!validateEmails(res, [req.body.requestor, req.body.target])) {
    return;
  }
  getCurrentFriend(req).subscribe(req.body.requestor, req.body.target)
    .then(data => {
      return commonRes(res, data);
    });
})
router.post('/block', function (req, res, next) {
  if (!validateEmails(res, [req.body.requestor, req.body.target])) {
    return;
  }
  getCurrentFriend(req).block(req.body.requestor, req.body.target)
    .then(data => {
      return commonRes(res, data);
    });
})
router.post('/retrieve', function (req, res, next) {
  if (!validateEmails(res, [req.body.sender])) {
    return;
  }
  getCurrentFriend(req).retrieve(req.body.sender, req.body.text)
    .then(data => {
      return commonRes(res, data);
    });
})

function commonRes(res, data) {
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
}

function validateArrAndLength(res, arr, length) {
  if (!util.verifyArrAndLength(arr, length)) {
    getCurrentFriend().createResObj(false, {
      errorCode: 2
    }).then(data => {
      commonRes(res, data);
    });
    return false;
  }
  return true;

}

function validateEmails(res, arr) {
  const invalidEmail = [];
  arr = arr || [];

  const dups = util.getDuplicatesInArr(arr);
  if (dups.length > 0) {
    getCurrentFriend().createResObj(false, {
      errorCode: 3
    }, {
      email: dups.join(', ')
    }).then(data => {
      commonRes(res, data);
    });
    return false;
  }
  arr.forEach(email => {
    if (!util.isValidEmail(email)) {
      invalidEmail.push(email || 'null');
    }
  })

  if (invalidEmail.length > 0) {
    getCurrentFriend().createResObj(false, {
      errorCode: 1
    }, {
      email: invalidEmail.join(', ')
    }).then(data => {
      commonRes(res, data);
    });
    return false;
  } else {
    return true;
  }
}

module.exports = router;