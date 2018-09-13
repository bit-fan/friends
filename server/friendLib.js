// ppl obj
function ppl(email) {
  this.email = email;
  this.friends = [];
  this.subscribe = [];
  this.blockList = [];
}
const $ppl = ppl.prototype;
$ppl.addFriend = function (a) {
  this.friends.push(a);
}

// Friend obj
const Friend = function () {
  this.ppls = {};
}
const $Friend = Friend.prototype;

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
    friends: this.ppls[email].friends,
    count: this.ppls[email].friends.length
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
  ppl.subscribe.push(tar);
  return this.createResObj(true);
}
$Friend.block = function (req, tar) {
  const ppl = this.getPpl(req);
  ppl.blockList.push(tar);
  const idx = ppl.friends.indexOf(tar);
  if (idx !== -1) {
    ppl.friends.splice(idx, 1);
  }
  return this.createResObj(true);
}
module.exports = Friend;