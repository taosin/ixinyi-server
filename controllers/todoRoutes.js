/**
 * todoList
 */

var todoService = require('../service/todoService')
var fs = require('fs')
module.exports = function(app) {

    // 获取阅读轨迹
    app.get('/todoLists', function*(req, res) {
        var data = yield* todoService.getTodoList(req.query)
        res.json({
            data: data
        })
    })

    // 创建新文章
    app.post('/todoList', function*(req, res) {
        var json = req.body
        var data = yield* todoService.saveArticle(json)
        res.json({
            data: data
        })
    })
}