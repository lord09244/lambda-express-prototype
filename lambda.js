'use strict'
const awsServerlessExpress = require('aws-serverless-express')
const doc = require('dynamodb-doc')
const dynamo = new doc.DynamoDB();
const app = require('./app')(dynamo)
const server = awsServerlessExpress.createServer(app)
exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context)
   
