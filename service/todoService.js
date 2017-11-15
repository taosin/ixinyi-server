'use strict'
var co = require('co')
var leancloudDao = require('../storage/leancloudDao')
var table = 'Todo'

class TodoService {

    // 获取待办事项
    *
    getTodoList(json) {
        var data = yield leancloudDao.getDataFindPage(table, json.page, json.params, json.timeParam, json.startTime, json.endTime, json.sortBy, json.sort)
        return data
    }

    // 创建文章
    *
    saveTodoList(json) {
        var data = yield leancloudDao.createRecord(table, json)
        return data
    }

    // 获取文章
    *
    queryArticles(json) {
        var data = yield leancloudDao.getDataFindPage(table, json.page, json.params, json.timeParam, json.startTime, json.endTime, json.sortBy, json.sort)
        return data
    }

    // 删除文章
    *
    deleteArticles(id) {
        var data = yield leancloudDao.deleteRecord(table, id)
        return data
    }

    // 修改文章
    *
    updateArticles(json) {
        var data = yield leancloudDao.deleteRecord(table, json.id)
        return data
    }

}
module.exports = new TodoService()