$('document').ready(function() {

  function bindClickEvent() {
    $('.board-item').click(function() {
      alert("CLICK");
    });
  }

  bindClickEvent();

});