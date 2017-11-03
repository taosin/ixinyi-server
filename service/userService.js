'use strict'

var co = require('co')
var leancloudDao = require('../storage/leancloudDao')
var table = '_User'

class UserService { *
    signUp(json) {
        console.log(json)
        var data = yield leancloudDao.signUpWithUsernameAndPassword(json.username, json.password)
        return data
    }
}
module.exports = new UserService()