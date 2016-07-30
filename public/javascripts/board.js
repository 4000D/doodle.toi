$('document').ready(function() {
  var locId = location.search.replace('?loc_id=', '');
  var boardItems = [];
  var selectedItemId = null;
  var selectedPosition = null;

  function draw() {
    animateShow();
    HttpUtil.getData('/locations/'+locId+'/comments', {}, function(data) {
      console.log(data);
      if (data && data.length > 0) {
        boardItems = data;
        for (var i = 0; i < boardItems.length; i++) {
          drawBoardItem(boardItems[i]);
        }
      }
      bindClickEvent(boardItems[i]);
    });
  }

  function animateShow() {
    $('#board_page_container').fadeIn(3000);
  }

  function drawBoardItem(boardItem) {
    var targetItem = $('.board-item[data-position=' + boardItem.index_x.toString() + boardItem.index_y.toString() + ']');
    targetItem.attr('data-id', boardItem._id);
    targetItem.children('textarea').text(boardItem.content);
  }

  function bindClickEvent() {
    $('.board-item > textarea').focus(function(){
      this.blur();
      return false;
    });

    $('.board-item > textarea').click(function() {
      var itemText = $(this).val();
      selectedItemId = $(this).parent().data('id');
      selectedPosition = $(this).parent().data('position');

      if (itemText) {
        bindCommentModalEvent();
        $('#comment_modal_container').modal('toggle');
        getComments(selectedItemId);
      } else {
        bindWriteModalEvent();
        $('#write_modal_container').modal('toggle');
      }
      return false;
    });
  }

  function getComments(parentId) {
    HttpUtil.getData('/comments/' + parentId + '/with_children', {}, function(data) {
      if (data && data.children) {
        var html = '';
        for (var i = 0; i < data.children.length; i++) {
          html += '<li>' + data.children[i].content + '</li>';
        }
        $('#comment_list_container').empty();
        $('#comment_list_container').append(html);
      }
    });
  }

  function bindCommentModalEvent() {
    $('#comment_modal_cancel_btn').unbind('click').click(function() {
      $('#comment_modal_container').modal('toggle');
    });

    $('#comment_modal_save_btn').unbind('click').click(function() {
      var data = {
        is_root: false,
        index_x: selectedPosition.toString()[0],
        index_y: selectedPosition.toString()[1],
        content: $('#comment_textarea').val(),
        author_name: 'anonymous'
      };
      HttpUtil.postData('/comments/' + locId + '/' + selectedItemId + '?', data, function(data) {
        if (data) {
          alert("저장되었습니다.");
        }
      });
    });
  }

  function bindWriteModalEvent() {
    $('#write_modal_cancel_btn').unbind('click').click(function() {
      $('#write_modal_container').modal('toggle');
    });

    $('#write_modal_save_btn').unbind('click').click(function() {
      var data = {
        is_root: true,
        index_x: selectedPosition.toString()[0],
        index_y: selectedPosition.toString()[1],
        content: $('#write_textarea').val(),
        author_name: 'anonymous'
      };

      HttpUtil.postData('/comments/'+locId, data, function(data) {
        if (data) {
          alert("저장되었습니다.");
          $('#write_modal_container').modal('toggle');
          location.reload(true);
        }
      });
    });
  }

  draw();

});