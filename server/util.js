const util = {
  isValidEmail: function (text) {
    //simple email validator, can enhance in future
    var reg = /\S+@\S+\.\S+/;
    return text && reg.test(text);
  },
  getEmailInStr: function (src) {
    src = src || '';
    return src.split(' ').filter(word => {
      return this.isValidEmail(word);
    })
  },
  verifyArrAndLength: function (arr, targetL) {
    if (!Array.isArray(arr)) {
      return false;
    }
    if (arr.length !== targetL) {
      return false;
    };
    return true;
  },
  getDuplicatesInArr: function (arr) {
    var seen = {};
    const duplicatedItems = new Set();
    arr = arr || [];
    arr.forEach(item => {
      if (item && seen[item]) {
        duplicatedItems.add(item);
      } else {
        seen[item] = true;
      }
    });
    return Array.from(duplicatedItems);
  }
}
module.exports = util;