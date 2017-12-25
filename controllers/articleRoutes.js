/*
 * @Author: iMocco
 * @Date:   2017-03-16 15:50:43
 * @Last Modified by:   iMocco
 * @Last Modified time: 2017-12-25 17:52:41
 */

var articleService = require('../service/articleService')
var fs = require('fs')
module.exports = function(app) {

    // 获取阅读轨迹
    app.get('/readInfos', function*(req, res) {
        var data = yield* articleService.getReadInfos(req.query)
        res.json({
            data: data
        })
    })

    // 创建新文章
    app.post('/article', function*(req, res) {
        var json = req.body
        var data = yield* articleService.saveArticle(json)
        res.json({
            data: data
        })
    })

    // 获取文章
    app.get('/articles', function*(req, res) {
        var data = yield* articleService.queryArticles(req.query)
        res.json({
            data: data
        })
    })
    // 获取文章详情
    app.get('/article/:id', function*(req, res) {
        var id = req.params.id
        var data = yield* articleService.queryArticleById(id)
        res.json({
            data: data
        })
    })

    // 删除文章
    app.delete('/article/:id', function*(req, res) {
        var id = req.params.id
        var data = yield* articleService.deleteArticles(id)
        res.json({
            data: data
        })
    })

    // 更改文章
    app.put('/article/:id', function*(req, res) {
        var id = req.params.id
        var data = yield* articleService.deleteArticles(id)
    })
}