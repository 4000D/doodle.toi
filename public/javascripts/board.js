$('document').ready(function() {
  var locId = location.search.replace('?loc_id=', '');
  var boardItems = [];

  console.log(locId);
  function draw() {
    HttpUtil.getData('locations/'+locId+'/comments', {}, function(err, data) {
      console.log(data);
    });
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