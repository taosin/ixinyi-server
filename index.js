/*
 * @Author: iMocco
 * @Date:   2017-03-16 
 * @Last Modified by:   iMocco
 * @Last Modified time: 2017-10-25 18:20:18
 */
'use strict'
var express = require('express')
var powerexpress = require('power-express')(express)
var authority = require('./filter/authority')
var app = powerexpress()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
var Server = require('./server')
var cookieParser = require('cookie-parser')
app.use(cookieParser())
var codingService = require('./service/codingService')
    // codingService.runAddTweet()
    // codingService.runLikePop()
app.use(express.static(__dirname + '/public/'))
app.use(authority.setCrossDomain)
require('./controllers/routes')(app)
var appServer = new Server(app)
appServer.start()