/*
 * @Author: iMocco
 * @Date:   2017-03-16 17:46:23
 * @Last Modified by:   iMocco
 * @Last Modified time: 2017-10-27 00:52:27
 */
'use strict'
var co = require('co')
var leancloudDao = require('../storage/leancloudDao')
var table = 'ReadInfo';

class ArticleService { *
    getReadInfos(json) {
        var data = yield leancloudDao.getDataFindPage(table, json.page, json.params, json.timeParam, json.startTime, json.endTime, json.sortBy, json.sort);
        return data;
    }
}
module.exports = new ArticleService()