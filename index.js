'use strict';
var AV = require('leanengine');
var express = require('express')
AV.init({
  appId: 'yourAppId',
  appKey: 'yourAppKey',
  masterKey: 'yourMasterKey'
});

// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();

var app = express();
// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000);

app.listen(PORT, function (err) {
  console.log('Node app is running on port:', 'http://localhost:' +PORT);

  // 注册全局未捕获异常处理器
  process.on('uncaughtException', function(err) {
    console.error("Caught exception:", err.stack);
  });
  process.on('unhandledRejection', function(reason, p) {
    console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason.stack);
  });
  app.get('/articles', function(req, res) {
    new AV.Query('Articles').find().then(function(todos) {
      res.json(todos);
    }).catch(function(err) {
      res.status(500).json({
        error: err.message
      });
    });
  });
});
