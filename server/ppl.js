// ppl obj
module.exports = ppl = function(email) {
  this.email = email;
  this.friends = [];
  this.subscribe = [];
  this.blockList = [];
  // should have added flag to indicate whether the email exists or not. 
  // currently only have add friend, 
  // so if adding a and b as friends, first will create ppl a and b
  // however, should add ppl a and b first, then setup the link. 
  // now we assume all the emails mentioend here will be valid.
}
const $ppl = ppl.prototype;
$ppl.addFriend = function (a) {
  this.friends.push(a);
}
$ppl.addSubscribe = function (a) {
  this.subscribe.push(a);
}
$ppl.addToBlockList = function (a) {
  this.blockList.push(a);
}