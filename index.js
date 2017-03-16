/*
* @Author: iMocco
* @Date:   2017-03-16 
* @Last Modified by:   iMocco
* @Last Modified time: 2017-03-16 15:59:10
*/
'use strict';
var express = require('express')
var app = express();
var Server = require('./server');
require('./controllers/routes')(app);
var appServer = new Server(app);
appServer.start();