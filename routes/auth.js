var express = require('express');
var router = express.Router();

var passport = require('passport');

// naver login page
router.get('/naver', 
  passport.authenticate('naver', {
    successRedirect: '/login_success.html'
  }),
  function (req, res) {
    console.log('/auth/naver failed, stopped');
});

router.get('/naver/callback', 
    function(req, res) {
  console.log(`req.params.code: ${req.params.code}`);
  console.log(`req.user: ${req.user}`);
  res.redirect('/login_success.html')
});

// kakao login page
router.get('/kakao',
  passport.authenticate('kakao', {
    successRedirect: '/login_success.html'
  }), 
  function (req, res) {
    console.log('/auth/kakao fails, stopped');
});

router.get('/kakao/callback', function (req, res) {
  console.log(`req.params.code: ${req.params.code}`);
  console.log(`req.user: ${req.user}`);
  res.redirect('/login_success.html')
});
module.exports = router;

