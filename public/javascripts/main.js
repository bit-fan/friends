$(document).ready(() => {
  function ajax(api, para) {
    return new Promise((res, rej) => {
      $.ajax({
        method: 'post',
        url: '/api/' + api,
        data: para
      }).done(function (data) {
        showRequest(para);
        showResponse(data);
      })
    });
  }

  $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
    showRequest();
    showResponse();
  })

  function showResponse(data) {
    $('.result').val(JSON.stringify(data, null, 2));
  }

  function showRequest(data) {
    $('.request').val(JSON.stringify(data, null, 2));
  }
  $('#clearBtn').on('click', function () {
    ajax('clearAll').then(data => {
      console.log(data);
      showResponse(data);
    })
  })
  $('#addBtn').on('click', function () {
    const para = {
      friends: [$('#addPara1').val(), $('#addPara2').val()]
    };
    ajax('addFriend', para).then(data => {
      console.log(data);
      // showResponse(data)
    })
  })
  $('#getBtn').on('click', function () {
    const para = {
      email: $('#getPara1').val()
    };
    ajax('getFriends', para).then(data => {
      console.log(data);
      // showResponse(data)
    })
  })
  $('#commonBtn').on('click', function () {
    const para = {
      friends: [$('#commonPara1').val(), $('#commonPara2').val()]
    };
    ajax('commonFriend', para).then(data => {
      console.log(data);
      // showResponse(data)
    })
  })
  $('#subBtn').on('click', function () {
    const para = {
      requestor: $('#subPara1').val(),
      target: $('#subPara2').val()
    };
    ajax('subscribeUpdate', para).then(data => {
      console.log(data);
      // showResponse(data)
    })
  })
  $('#blockBtn').on('click', function () {
    const para = {
      requestor: $('#blockPara1').val(),
      target: $('#blockPara2').val()
    };
    ajax('block', para).then(data => {
      console.log(data);
      // showResponse(data)
    })
  })
  $('#retrieveBtn').on('click', function () {
    const para = {
      sender: $('#retrievePara1').val(),
      text: $('#retrievePara2').val()
    };
    ajax('retrieve', para).then(data => {
      console.log(data);
      // showResponse(data)
    })
  })


})