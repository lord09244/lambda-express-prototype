'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();
const jwt = require('jsonwebtoken');

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
    let token = jwt.sign(body, 'q7w8e9r7', {
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
