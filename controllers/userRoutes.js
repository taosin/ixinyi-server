var userService = require('../service/userService')
module.exports = function(app) {

    // 用户注册
    app.post('/user/signUp', function*(req, res) {
        var json = {
            username: 'taoxin',
            password: '123123'
        }
        var data = yield* userService.signUp(json)
        res.json({
            data: data
        })
    })
}