'use strict';

var awsServerlessExpress = require('aws-serverless-express');
var app = require('./app');
var server = awsServerlessExpress.createServer(app);
exports.handler = function(event, context) {
  return awsServerlessExpress.proxy(server, event, context);
};
