/*
 * @Author: iMocco
 * @Date:   2017-03-16 
 * @Last Modified by:   iMocco
 * @Last Modified time: 2017-10-25 18:19:42
 */

var config = require('./config')
var AV = require('leanengine')

function Server(rootApp) {
    this.rootApp = rootApp
    this.httpServer = null
    this.config = config
}
AV.init({
    appId: config.appId,
    appKey: config.appKey,
    masterKey: config.masterKey
})

// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey()

Server.prototype.start = function(externalApp) {
    var self = this
    var rootApp = null
    if (externalApp) {
        rootApp = externalApp
    } else {
        rootApp = self.rootApp
    }
    self.httpServer = rootApp.listen(config.port)
    console.log('app server start,plz visite http://localhost:' + config.port)
    self.httpServer.on('error', function(error) {
        if (error.errno === 'EADDRINUSE') {
            console.error(
                '(EADDRINUSE) Cannot start inxiyi Server',
                'Port ' + config.port + ' is already in use by another program.',
                'Is another node instance already running?'
            )
        } else {
            console.error(
                '(Code: ' + error.errno + ')',
                'There was an error starting your server.'
            )
        }
        process.exit(-1)
    })
    self.httpServer.on('connection', function() {
        //        todo
    })
    self.httpServer.on('listening', function() {
        //       todo
    })
}

Server.prototype.stop = function(externalApp) {
    //    todo
}

module.exports = Server