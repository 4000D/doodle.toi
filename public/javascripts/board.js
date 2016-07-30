$('document').ready(function() {
  var boardItems = [];

  function draw() {
    console.log(HttpUtil);
    //TODO: 서버에서 데이터 가져와야함!
  }

  function bindClickEvent() {
    $('.board-item > textarea').click(function() {
      var itemText = $(this).val();
      var itemPosition = $(this).data('position');

      console.log(itemText);
      if (!itemText) {
        //TODO: 작성하기용 모달 띄우기!
        alert("작성");
      } else {
        //TODO: 댓글 모달 띄우기!
        alert("댓글");
      }
    });
  }

  draw();
  bindClickEvent();

});