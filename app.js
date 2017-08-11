'use strict'
const express = require('express'),
app = express(),
bodyParser = require('body-parser');
module.exports = function (db) {

  app.db = db;

  app.use(bodyParser.json());

  // middlewares add
  app.use('/auth',require('./middlewares/auth'));

  // app controllers
  app.use('/',require('./routes'));node 

  app.get('/', function (req, res) {
    
    app.db.scan({ TableName: 'MyTable' }, function(err, body) {
      if(err){
        res.send(err);
        return;
      }
      res.send(JSON.stringify(body)); 
    });
  });

  app.get('/auth/:table', function (req, res) {
    app.db.scan({ TableName: 'MyTable' }, function(err, body) {
      if(err){
        res.send(err);
        return;
      }
      res.send(JSON.stringify(body)); 
    });
  });
  
  return app;

}