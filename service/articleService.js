/*
 * @Author: iMocco
 * @Date:   2017-03-16 17:46:23
 * @Last Modified by:   iMocco
 * @Last Modified time: 2017-10-27 00:52:27
 */
'use strict'
var co = require('co')
var leancloudDao = require('../storage/leancloudDao')
var table = 'Articles'

class ArticleService {

    // 获取阅读轨迹
    *
    getReadInfos(json) {
        var data = yield leancloudDao.getDataFindPage('ReadInfo', json.page, json.params, json.timeParam, json.startTime, json.endTime, json.sortBy, json.sort)
        return data
    }

    // 创建文章
    *
    saveArticle(json) {
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
    deleteArticles(json) {
        var data = yield leancloudDao.deleteRecord(table, json.id)
        return data
    }

    // 修改文章
    *
    updateArticles(json) {
        var data = yield leancloudDao.deleteRecord(table, json.id)
        return data
    }

}
module.exports = new ArticleService()