const util = {
  isValidEmail: function (text) {
    //simple email validator, can enhance in future
    var reg = /\S+@\S+\.\S+/;
    return reg.test(text);
  },
  getEmailInStr: function (src) {
    src = src || '';
    return src.split(' ').filter(word => {
      return this.isValidEmail(word);
    })
  }
}
module.exports = util;