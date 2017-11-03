var userService = require('../service/userService')
module.exports = function(app) {

    // 用户注册
    app.post('/user/signUp', function*(req, res) {
        var json = req.body
        var data = yield* userService.signUp(json)
        res.json({
            data: data
        })
    })

    // 登录
    app.post('/user/logIn', function*(req, res) {
        var json = req.body
        var data = yield* userService.logIn(json)
        res.json({
            data: data
        })
    })

    // 登录
    app.get('/user/getCurrentUser', function*(req, res) {
        var data = yield* userService.getCurrentUser()
        res.json({
            data: data
        })
    })
}