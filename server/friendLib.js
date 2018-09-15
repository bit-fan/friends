const util = require('./util');
const ppl = require('./ppl');

// Friend obj
const Friend = function () {
  this.ppls = {};
}
const $Friend = Friend.prototype;
$Friend.init = function () {
  this.ppls = {};
}
$Friend.getPpl = function (email) {
  this.ppls[email] = this.ppls[email] || new ppl(email);
  return this.ppls[email];
}
$Friend.hasBlock = function (host, checkEmail) {
  return this.getPpl(host).blockList.indexOf(checkEmail) !== -1;
}
$Friend.createResObj = function (ok, obj) {
  obj = obj || {};
  let newObj = Object.assign({}, obj);
  newObj.success = ok;
  return Promise.resolve(newObj);
}
$Friend.add = function (email1, email2) {
  if (!util.isValidEmail(email1)) {
    return this.createResObj(false, {
      error: email1 + ' is invalid.'
    });
  }
  if (!util.isValidEmail(email2)) {
    return this.createResObj(false, {
      error: email2 + ' is invalid.'
    });
  }
  if (this.hasBlock(email1, email2)) {
    return this.createResObj(false, {
      error: email1 + ' blocks ' + email2 + '.'
    });
  }
  if (this.hasBlock(email2, email1)) {
    return this.createResObj(false, {
      error: email2 + ' blocks ' + email1 + '.'
    });
  }

  this.getPpl(email1).addFriend(email2);
  this.getPpl(email2).addFriend(email1);
  return this.createResObj(true);
}
$Friend.getFriends = function (email) {
  return this.createResObj(true, {
    friends: this.getPpl(email).friends,
    count: this.getPpl(email).friends.length
  });
}
$Friend.commonFriend = function (email1, email2) {
  const ppl1 = this.getPpl(email1);
  const ppl2 = this.getPpl(email2);

  const friendList1 = ppl1.friends;
  const friendList2 = ppl2.friends;
  const finalList = friendList1.filter(item => {
    return friendList2.indexOf(item) !== -1;
  })
  return this.createResObj(true, {
    friends: finalList,
    count: finalList.length
  });
}
$Friend.subscribe = function (req, tar) {
  const ppl = this.getPpl(req);
  ppl.addSubscribe(tar);
  return this.createResObj(true);
}
$Friend.block = function (req, tar) {
  const ppl = this.getPpl(req);
  ppl.addToBlockList(tar);
  const idx = ppl.friends.indexOf(tar);
  if (idx !== -1) {
    ppl.friends.splice(idx, 1);
  }
  return this.createResObj(true);
}
$Friend.retrieve = function (sender, text) {
  // starts with all
  const finalEmails = util.getEmailInStr(text);
  Object.keys(this.ppls).forEach(key => {
    const ppl = this.ppls[key];
    if (ppl.blockList.indexOf(sender) !== -1) {
      // been blocked
      return;
    }
    if (ppl.friends.indexOf(sender) !== -1) {
      // is friend
      finalEmails.push(ppl.email);
      return;
    }
    if (ppl.subscribe.indexOf(sender) !== -1) {
      // subscribed
      finalEmails.push(ppl.email);
      return;
    }
  })

  return this.createResObj(true, {
    recipients: finalEmails
  });
}

module.exports = Friend;