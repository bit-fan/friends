const assert = require('assert');
const util = require('../server/util');

describe('Testing util functions', function () {
  ['a', 'a@a', 'a.a'].forEach(email => {
    it('validate invalid email ' + email, function () {
      const result = util.isValidEmail(email);
      assert.equal(result, false);
    })
  });
  ['a@a.a'].forEach(email => {
    it('validate valid email ' + email, function () {
      const result = util.isValidEmail(email);
      assert.equal(result, true);
    })
  });

  [{
    str: 'a@a',
    emails: []
  }, {
    str: 'a@a.a',
    emails: ['a@a.a']
  }, {
    str: 'a a@a.a b@b.b',
    emails: ['a@a.a', 'b@b.b']
  }].forEach(obj => {
    it('get emails in string ' + obj.str, function () {
      const result = util.getEmailInStr(obj.str);
      assert.equal(result.toString(), obj.emails.toString());
    })
  });

  [{
    arr: [],
    length: 0
  }, {
    arr: ['a'],
    length: 1
  }, {
    arr: ['a', 'b'],
    length: 2
  }].forEach(obj => {
    it('verify valid array and length ' + obj.arr, function () {
      const result = util.verifyArrAndLength(obj.arr, obj.length);
      assert.equal(result, true);
    })
  });

  [{
    arr: 'a',
    length: 0
  }, {
    arr: {},
    length: 1
  }, {
    arr: 123,
    length: 2
  }].forEach(obj => {
    it('verify invalid array and length ' + obj.arr, function () {
      const result = util.verifyArrAndLength(obj.arr, obj.length);
      assert.equal(result, false);
    })
  });

  [{
    arr: ['a'],
    target: []
  }, {
    arr: ['a', 'b'],
    target: []
  }, {
    arr: ['a', 'a'],
    target: ['a']
  }, {
    arr: ['a', 'a', 'b', 'b', 'b'],
    target: ['a', 'b']
  }, {
    arr: ['a', 'a', 'b', 'c'],
    target: ['a']
  }].forEach(obj => {
    it('verify get duplicates in arr ' + obj.arr, function () {
      const result = util.getDuplicatesInArr(obj.arr);
      assert.equal(result.toString(), obj.target.toString());
    })
  })

})