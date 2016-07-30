var
  request = require('request'),
  config = require('./config/config.js');

var options = {
  url: 'https://openapi.naver.com/v1/voice/tts.bin',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Naver-Client-Id': config.naver.clientID,
    'X-Naver-Client-Secret': config.naver.clientSecret
  },

  speaker: 'mijin',
  text: '아 똥 싸고 싶다!',
  speed: 0
};

console.log('options=');
console.log(options);

request
  .post(options, function (err, res, body) {
    if (err) throw Error(err);
    console.log(body);
  });
