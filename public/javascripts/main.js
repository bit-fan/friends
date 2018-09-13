$(document).ready(() => {
  function ajax(api, para) {
    return new Promise((res, rej) => {
      $.ajax({
        method: 'post',
        url: '/api/' + api,
        data: para,
        // contentType:'application/json',
        // content: 'json',
        // dataType: 'json'
      }).done(function (data) {
        res(data);
      })
    });
  }
  $('#addBtn').on('click', function () {
    const para = {
      friends: [$('#addPara1').val(), $('#addPara2').val()]
    };
    ajax('addFriend', para).then(data => {
      console.log(data);
      $('.result').val(JSON.stringify(data));
    })
  })
  $('#getBtn').on('click', function () {
    const para = {
      email: $('#getPara1').val()
    };
    ajax('getFriends', para).then(data => {
      console.log(data);
      $('.result').val(JSON.stringify(data));
    })
  })
  $('#commonBtn').on('click', function () {
    const para = {
      friends: [$('#commonPara1').val(), $('#commonPara2').val()]
    };
    ajax('commonFriend', para).then(data => {
      console.log(data);
      $('.result').val(JSON.stringify(data));
    })
  })
  $('#subBtn').on('click', function () {
    const para = {
      requestor: $('#subPara1').val(),
      target: $('#subPara2').val()
    };
    ajax('subscribeUpdate', para).then(data => {
      console.log(data);
      $('.result').val(JSON.stringify(data));
    })
  })
  $('#blockBtn').on('click', function () {
    const para = {
      requestor: $('#subPara1').val(),
      target: $('#subPara2').val()
    };
    ajax('block', para).then(data => {
      console.log(data);
      $('.result').val(JSON.stringify(data));
    })
  })

})