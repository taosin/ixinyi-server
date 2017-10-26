/*
* @Author: iMocco
* @Date:   2017-03-16 16:59:33
* @Last Modified by:   iMocco
* @Last Modified time: 2017-10-27 04:13:39
*/
'use strict'

var AV = require('leanengine')

class leancloudDao {

	// 获取总数
	getCount(table){
		return new Promise(function (resolve, reject) {
			const query = new AV.Query(table)
			query.count().then(function (count) {
				resolve(count)
			}, function (error) {
				reject(err)
			})
		}.bind(this))
	}

	// 获取分页数据
	getDataFindPage(table, page, params, timeParam, startTime, endTime, sortBy, sort){
		return new Promise(function (resolve, reject) {
			const query = new AV.Query(table)
			
			// 返回条数
			query.limit(JSON.parse(page).limit || 20);
			// 查询起始位置
			query.skip(JSON.parse(page).start || 0);
			// // 开始时间
			query.greaterThanOrEqualTo(timeParam || 'createdAt', new Date(startTime || '1900-01-01'));
			// // 结束时间
			query.lessThanOrEqualTo(timeParam || 'createdAt', new Date(endTime || '2300-01-01'));
			if(params){
				var newParams = JSON.parse(params)
				for(var key in newParams){
					query.equalTo(key, newParams[key]);
				}
			}
			if(sort){
				switch(sort) {
					case 1:
					query.descending( timeParam || 'createdAt');
					break;
					case -1:
					query.ascending( timeParam || 'createdAt');
					break;
				}
			}else{
				query.descending( timeParam || 'createdAt');
			}
			query.find().then(function (result) {
				if(result){
					query.count().then(function (count) {
						resolve({
							total:count,
							records: result
						})
					}, function (error) {
						reject(err)
					})
				}

			}, function (error) {
				reject(err)
			})
		}.bind(this))
	}

	// 删除数据
	deleteRecord(table, objectId){
		return new Promise(function (resolve, reject) {
			var  deleteData= AV.Object.createWithoutData(table, objectId);
			deleteData.destroy().then(function (success) {
				resolve(success);
			}, function (error) {
			});
		}.bind(this))
	}
}
module.exports = new leancloudDao()