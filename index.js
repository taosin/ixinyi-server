/*
* @Author: iMocco
* @Date:   2017-03-16 
* @Last Modified by:   iMocco
* @Last Modified time: 2017-03-21 13:47:30
*/
'use strict';
var express = require('express')
var powerexpress = require('power-express')(express)
var authority = require('./filter/authority')
var app = powerexpress()
var Server = require('./server');
app.use(express.static(__dirname + '/public/'))
app.use(authority.setCrossDomain)
require('./controllers/routes')(app);
var appServer = new Server(app);
appServer.start();