var querystring = require('querystring');
var fs = require('fs'),
  request = require('request'),
  config = require('./config/config.js');

var options = {
  url: 'https://openapi.naver.com/v1/voice/tts.bin',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Cache-Control': 'no-cache',
    'User-Agent': 'curl/7.43.0',
    'Accept': '*/*',
    'X-Naver-Client-Id': config.naver.clientID,
    'X-Naver-Client-Secret': config.naver.clientSecret
  },
  body: querystring.stringify({
    speaker: 'mijin',
    text: '아 똥 싸고 싶다',
    speed: 0
  })
};

console.log('options=');
console.log(options);

var destination = fs.createWriteStream('./test5.mp3');

request
  .post(options, function (err, res, body) {
    if (err) throw Error(err);
    console.log(res);
  }).pipe(destination);
