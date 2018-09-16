const assert = require('assert');
const Friend = require('../server/friendLib');

const friend = new Friend();
describe('Test Friend functions', function () {
  it('add friend a & b', function () {
    friend.add('a@a.a', 'b@b.b').then(result => {
      assert.equal(result.success, true);
    });
  })
  it('add friend a & c', function () {
    friend.add('a@a.a', 'c@c.c').then(result => {
      assert.equal(result.success, true);
    });
  })
  it('get friend of a', function () {
    friend.getFriends('a@a.a').then(result => {
      assert.equal(result.success, true);
      assert.equal(result.friends.toString(), ['b@b.b', 'c@c.c'].toString());
      assert.equal(result.count, 2);
    });
  })
  it('get common friend of b && c', function () {
    friend.commonFriend('b@b.b', 'c@c.c').then(result => {
      assert.equal(result.success, true);
      assert.equal(result.friends.toString(), ['a@a.a'].toString());
      assert.equal(result.count, 1);
    });
  })
  it('subscribe a to d', function () {
    friend.subscribe('a@a.a', 'd@d.d').then(result => {
      assert.equal(result.success, true);
    });
  })
  it('a blocks b', function () {
    friend.block('a@a.a', 'b@b.b').then(result => {
      assert.equal(result.success, true);
    });
  })
  it('a blocks d', function () {
    friend.block('a@a.a', 'd@d.d').then(result => {
      assert.equal(result.success, true);
    });
  })
  it('get friend of a. now b should not be involved.', function () {
    friend.getFriends('a@a.a').then(result => {
      assert.equal(result.success, true);
      assert.equal(result.friends.toString(), ['c@c.c'].toString());
      assert.equal(result.count, 1);
    });
  })
  it('a cannot make friend with d now', function () {
    friend.add('a@a.a', 'd@d.d').then(result => {
      assert.equal(result.success, false);
    });
  });

  [{
    from: 'd@d.d',
    text: 'a',
    expect: []
  }, {
    from: 'd@d.d',
    text: 'a',
    expect: []
  }, {
    from: 'd@d.d',
    text: 'a@a.a',
    expect: []
  }, {
    from: 'd@d.d',
    text: 'b@b.b d@d.d',
    expect: ['b@b.b']
  }, {
    from: 'd@d.d',
    text: 'a c@c.c d@d.d',
    expect: ['c@c.c']
  }].forEach(item => {
    it('retrieve update from: ' + item.from + ', text: ' + item.text + '. Receipients: ' + item.expect.toString(), function () {
      friend.retrieve(item.from, item.text).then(result => {
        // console.log(result);
        assert.equal(result.recipients.toString(), item.expect.toString());
      });
    })
  });

  // it('retrieve update from d, text "a"', function () {
  //   friend.retrieve('d@d.d', 'a').then(result => {
  //     console.log(result);
  //     assert.equal(result.recipients.toString(), [].toString());
  //   });
  // })
  // it('retrieve update from d, text a@a.a', function () {
  //   friend.retrieve('d@d.d', 'a@a.a').then(result => {
  //     console.log(result);
  //     assert.equal(result.recipients.toString(), [].toString());
  //   });
  // })
  // it('retrieve update from d', function () {
  //   friend.retrieve('d@d.d', 'a@a.a b@b.b').then(result => {
  //     console.log(result);
  //     assert.equal(result.recipients.toString(), [].toString());
  //   });
  // })
})