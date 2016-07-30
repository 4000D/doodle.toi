$('document').ready(function() {
  var locId = location.search.replace('?loc_id=', '');
  var boardItems = [];

  function draw() {
    HttpUtil.getData('locations/'+locId+'/comments', {}, function(data) {
      if (data && data.length > 0) {
        boardItems = data;
        for (var i = 0; i < boardItems.length; i++) {
          drawBoardItem(boardItems[i]);
        }
        bindClickEvent(boardItems[i]);
      }
    });
  }

  function drawBoardItem(boardItem) {
    var targetItem = $('.board-item[data-position=' + boardItem.index_x.toString() + boardItem.index_y.toString() + ']')
    targetItem.children('textarea').text(boardItem.content);
  }

  function bindClickEvent() {
    $('.board-item > textarea').click(function() {
      var itemText = $(this).val();
      var itemPosition = $(this).data('position');

      console.log(itemText);
      if (itemText) {
        //TODO: 댓글 모달 띄우기!
        alert("댓글");
      } else {
        //TODO: 작성하기용 모달 띄우기!
        alert("작성");
      }
    });
  }

  draw();
});