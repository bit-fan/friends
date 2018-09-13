function ppl(email) {
  this.email = email;
  this.friends = [];
  this.subscribe = [];
  this.unfriend = [];
}
const $ppl = ppl.prototype;
$ppl.addFriend = function (a) {
  this.friends.push(a);
}

const Friend = function () {
  this.ppls = {};
}

const $Friend = Friend.prototype;
$Friend.add = function (email1, email2) {
  // console.log(obj);
  // const email1 = obj.friends[0];
  // const email2 = obj.friends[1];
  this.ppls[email1] = this.ppls[email1] || new ppl(email1);
  this.ppls[email2] = this.ppls[email2] || new ppl(email2);
  this.ppls[email1].addFriend(email2);
  this.ppls[email2].addFriend(email1);
  return Promise.resolve({
    success: true
  });
}
$Friend.getFriends = function (email) {
  return Promise.resolve({
    success: true,
    friends: this.ppls[email].friends,
    count: this.ppls[email].friends.length
  });
}
$Friend.commonFriend = function (email1, email2) {
  const ppl1 = this.ppls[email1];
  const ppl2 = this.ppls[email2];

  const friendList1 = ppl1.friends;
  const friendList2 = ppl2.friends;
  const finalList = friendList1.filter(item => {
    return friendList2.indexOf(item) !== -1;
  })
  return Promise.resolve({
    success: true,
    friends: finalList,
    count: finalList.length
  });
}
$Friend.subscribe = function (req, tar) {
  const ppl = this.ppls[req];
  ppl.subscribe.push(tar);
  return Promise.resolve({
    success: true
  });
}
$Friend.block = function (req, tar) {
  const ppl = this.ppls[req];
  ppl.subscribe.push(tar);
  return Promise.resolve({
    success: true
  });
}
module.exports = Friend;