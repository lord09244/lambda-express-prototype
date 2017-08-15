'use strict';

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, process.env.jwtsecret, function(err, decoded) {
      if (err) {
        return res.json({'code': 95, 'status': 'Failed to authenticate token.'});
      } else {
        // if everything is good, save to request for use in other routes
        req.userdata = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({'code': 94, 'status': 'No token provided.'});
  }
});

module.exports = router;
