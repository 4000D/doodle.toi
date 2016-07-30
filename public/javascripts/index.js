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

  animateLoading();

  var
    result
  , cur_latitude
  , cur_longitude
  , loc_id;   

  function successCallback(position) {
    cur_latitude = position.coords.latitude;
    cur_longitude = position.coords.longitude;

    // TODO: 그나마 좀 가까운 Location만 가져오기
    $.ajax('/locations', {
      type: 'GET',
      async: true
    }).then( result => {
      var min_dist = 20000000;

      result.forEach( (loc) => {
        var dist = distance(cur_latitude, cur_longitude, loc.latitude, loc.longitude);
        console.log(`distance(${cur_latitude}, ${cur_longitude}, ${loc.latitude}, ${loc.longitude}) : ${dist}, ${loc._id}`);
        if (dist < min_dist) {
          min_dist = dist;
          loc_id = loc._id;
        }
      });

      console.log(`closest: ${cur_latitude}, ${cur_longitude} ~ ${loc_id}`);
    });
  }


  function errorCallback(error) {
    alert(error.message);
  }

  // need authrization
  function load(){ 
    if ( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      alert("geolocation not supported");
    }
  }

  function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  load();
});

