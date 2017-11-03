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
}