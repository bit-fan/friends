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
})