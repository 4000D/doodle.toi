/**
 * 1. load() : 처음 사용자의 현재 위치를 받아온다.
 * 2. successCallback() : load()가 성공하면 실행됨. 
 *  - 현재 위도, 경도와 DB에 저장된 위도, 경도를 비교하여 가장 가까운 거리의 Location을 찾는다.
 *  - loc_id에 Location._id 를 저장.
 * 3. 
 *
 *
 */
$( document ).ready(function() {

  function animateLoading() {
    $('.loading-image > img').animate({'margin-left' : '-50px'}, 'slow', null, animateLoading);
    $('.loading-image > img').animate({'margin-left' : '50px'}, 'slow', null, animateLoading);
  }

  function changeToLoginPage() {
    $('.loading-icon').hide('slow');
    $('.login-box').show('slow');
  }

  function bindClickEvent() {
    $('#naver_login_btn').click(function() {
      location.href = "/auth/naver";
    });

    $('#kakao_login_btn').click(function() {
      location.href = "/auth/kakao";
    });
  }

  animateLoading();
  bindClickEvent();
  // 2초 뒤 로그인 페이지로 변경
  setTimeout(function() {
    changeToLoginPage();
  }, 2000);

});

