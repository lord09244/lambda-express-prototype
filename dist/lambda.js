'use strict';

var awsServerlessExpress = require('aws-serverless-express');
var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();
var app = require('./app')(dynamo);
var server = awsServerlessExpress.createServer(app);
exports.handler = function (event, context) {
   return awsServerlessExpress.proxy(server, event, context);
};