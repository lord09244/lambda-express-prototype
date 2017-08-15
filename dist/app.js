'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();
var jwt = require('jsonwebtoken');

app.db = dynamo;
app.use(bodyParser.json());

// middlewares add
app.use('/api', require('./middlewares/auth'));

// app controllers
app.use('/', require('./routes'));

app.get('/s', function(req, res) {
  app.db.scan({TableName: 'users'}, function(err, body) {
    if (err) {
      res.send(err);
      return;
    }
    res.send(JSON.stringify(body));
  });
});

app.get('/api/:table', function(req, res) {
  app.db.scan({TableName: 'users'}, function(err, body) {
    if (err) {
      res.send(err);
      return;
    }
    res.send(JSON.stringify(body));
  });
});

app.get('/', function(req, res) {
  app.db.scan({TableName: 'users'}, function(err, body) {
    if (err) {
      res.send(err);
      return;
    }
    var token = jwt.sign(body, 'q7w8e9r7', {
      expiresIn: 24 * 60 * 60, // expires in 24 hours
    });
    // return the information including token as JSON
    console.log(body);
    res.json({
      code: 0,
      status: 'Enjoy your token!',
      token: token,
    });
  });
});

module.exports = app;
