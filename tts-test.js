var
  request = require('request'),
  config = require('./config/config.js'),
  fs = require('fs'),
  util = require('util'),
  Stream = require('stream'),
  JSONStream = require('JSONStream');

var options_naver = {
  method: 'POST',
  uri: 'https://openapi.naver.com/v1/voice/tts.bin',
  headers: {
    'Accept': '*/*',
    'User-Agent': 'curl/7.43.0',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'X-Naver-Client-Id': config.naver.clientID,
    'X-Naver-Client-Secret': config.naver.clientSecret,
  },
  form: { // application/x-www-form-urlencoded ---> form field
    speaker: 'clara', // 음성 합성할 목소리 설정: ( mijin:미진(한국어, 여성), jinho:진호(한국어, 남성), clara:클라라(영어, 여성), matt:매튜(영어, 남성), yuri:유리(일본어, 여성), shinji:신지(일본어, 남성), meimei:메이메이(중국어, 여성))
    speed: 2,
    text: 'Hello. This is Competition!, Input and output are asynchronous operations in Node.js so what if we want to know when a file has been fully written? The answer is to setup listeners to events that the stream emits.'
  }
};

var options = {
  method: 'GET',
  uri: 'https://cf-media.sndcdn.com/MealYlkmBD2I.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vTWVhbFlsa21CRDJJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0Njk4OTA2MjV9fX1dfQ__&Signature=uadCX6mza2QmF5V6Yber397wnVyzwVwquQY3yWKLyItzclj4RlOc~37QKRey0Lp7FaPPNq7uZhtNOipoeq-B76Vr6XLbe8a-V2AnTd1J5aWzlgN30xU~C1~E19yTZnefmio1MRAV2lmGb0AVFmQmI-I0lT4W9mxQnOEj2cM4DXHoMCaHjP3AsD5HQ6GmYU8CS1iBAQyjz9COk-ZfjHXEdiwm3hPDFHwBwWDFiWdHoQ3M-9gEUR8cRBd5Dy7wsRSTISeRv1GbfGhYvEU5cvVHjHMF3dtRUFnM1Egtwg69kb~20dJfDRPNl1QI5Ww7TSY8uUmEBcb4T29eMOfg6YQOgA__&Key-Pair-Id=APKAJAGZ7VMH2PFPW6UQ'
}

var outStream = fs.createWriteStream('./tts.mp3');

request(options_naver, function (err, res, body) {
  if(err) console.error(err);
})
  .pipe(outStream);
