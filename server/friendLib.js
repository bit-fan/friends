const util = require('./util');
const ppl = require('./ppl');

const errorCodeObj = {
  1: (email) => {
    return "Invalid email(s): <" + email + ">.";
  },
  2: "Invalid parameters.",
  3: (email) => {
    return "Repeated emails: <" + email + ">.";
  }
}

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
$Friend.createResObj = function (ok, obj, paraObj) {
  obj = obj || {};
  let newObj = Object.assign({}, obj);
  newObj.success = ok;
  if (!ok) {
    switch (obj.errorCode) {
      case 1:
      case 3:
        newObj.errorText = errorCodeObj[obj.errorCode](paraObj.email || '');
        break;
      case 2:
        newObj.errorText = errorCodeObj['2'];
        break;
    }
  }
  return Promise.resolve(newObj);
}
$Friend.add = function (email1, email2) {
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
  const mentioendList = util.getEmailInStr(text);
  const friendOrSubscribedList = [];
  Object.keys(this.ppls).forEach(key => {
    const ppl = this.ppls[key];
    if (ppl.blockList.indexOf(sender) !== -1) {
      // been blocked
      return;
    }
    if (mentioendList.indexOf(ppl.email) !== -1) {
      // already in list
      return;
    }
    if (ppl.friends.indexOf(sender) !== -1) {
      // is friend
      friendOrSubscribedList.push(ppl.email);
      return;
    }
    if (ppl.subscribe.indexOf(sender) !== -1) {
      // subscribed
      friendOrSubscribedList.push(ppl.email);
      return;
    }
  })

  return this.createResObj(true, {
    recipients: mentioendList.concat(friendOrSubscribedList)
  });
}

module.exports = Friend;