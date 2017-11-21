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
    getCount(table) {
        return new Promise(function(resolve, reject) {
            const query = new AV.Query(table)
            query.count().then(function(count) {
                resolve(count)
            }, function(error) {
                reject(err)
            })
        }.bind(this))
    }

    // 获取分页数据
    getDataFindPage(table, page, params, timeParam, startTime, endTime, sortBy, sort) {
        return new Promise(function(resolve, reject) {
            const query = new AV.Query(table)
            page = page ? JSON.parse(page) : {}
                // 返回条数
            query.limit(page.limit || 20)
                // 查询起始位置
            query.skip(page.start || 0)
                // // 开始时间
            query.greaterThanOrEqualTo(timeParam || 'createdAt', new Date(startTime || '1900-01-01'))
                // // 结束时间
            query.lessThanOrEqualTo(timeParam || 'createdAt', new Date(endTime || '2300-01-01'))
            if (params) {
                var newParams = JSON.parse(params)
                for (var key in newParams) {
                    query.equalTo(key, newParams[key])
                }
            }
            // query.equalTo('isDeleted', false)
            if (sort) {
                switch (sort) {
                    case 1:
                        query.descending(timeParam || 'createdAt')
                        break
                    case -1:
                        query.ascending(timeParam || 'createdAt')
                        break
                }
            } else {
                query.descending(timeParam || 'createdAt')
            }
            query.find().then(function(result) {
                if (result) {

                    // 获取总数
                    query.count().then(function(count) {
                        resolve({
                            total: count,
                            records: result
                        })
                    }, function(error) {
                        reject(err)
                    })
                }
            }, function(error) {
                reject(err)
            })
        }.bind(this))
    }

    // 删除数据
    removeRecord(table, objectId) {
        return new Promise(function(resolve, reject) {
            var removeData = AV.Object.createWithoutData(table, objectId)
            removeData.destroy().then(function(success) {
                resolve(success)
            }, function(error) {})
        }.bind(this))
    }

    // 物理删除数据
    deleteRecord(table, objectId) {
        return new Promise(function(resolve, reject) {
            var deleteData = AV.Object.createWithoutData(table, objectId)
            deleteData.set('isDeleted', true)
            deleteData.save()
            resolve(true)
        }.bind(this))
    }

    // 更新数据
    updateRecord(table, objectId, params) {
        return new Promise(function(resolve, reject) {
            var updateData = AV.Object.createWithoutData(table, objectId)
            if (params) {
                var newParams = JSON.parse(params)
                for (var key in newParams) {
                    updateData.set(key, newParams[key])
                }
            }
            updateData.save().then(function(result) {
                resolve(result)
            })
        }.bind(this))
    }

    // 添加数据
    createRecord(table, data) {
        return new Promise(function(resolve, reject) {
            var CreateTable = AV.Object.extend(table)
            var createTable = new CreateTable()
            if (data) {
                var newParams = data
                for (var key in newParams) {
                    createTable.set(key, newParams[key])
                }
            }
            createTable.set('isDeleted', false)
            createTable.save().then(function(result) {
                if (result.id) {
                    resolve(result)
                }
            }, function(error) {
                resolve(error)
            })
        }.bind(this))
    }

    // 手机号码获取验证码注册
    requestSmsCode(phone) {
        return new Promise(function(resolve, reject) {
            AV.Cloud.requestSmsCode(phone).then(function(success) {
                console.info('success')
            }, function(error) {
                console.info('error')
            })
        })
    }

    // 根据手机号码和验证注册
    signUpOrlogInWithMobilePhone(phone, smsCode) {
        return new Promise(function(resolve, reject) {
            AV.User.signUpOrlogInWithMobilePhone(phone, smsCode).then(function(success) {
                console.info('success')
            }, function(error) {
                console.info('error')
            })
        })
    }

    // 用户名和密码注册
    signUpWithUsernameAndPassword(username, password) {
        return new Promise(function(resolve, reject) {
            var user = new AV.User()
            user.setUsername(username)
            user.setPassword(password)
            user.signUp().then(function(loginedUser) {
                resolve({
                    code: 100,
                    result: loginedUser
                })
            }, function(error) {
                resolve(error)
            })
        }.bind(this))
    }

    // 用户名和密码登录
    logIn(username, password) {
        return new Promise(function(resolve, reject) {
            AV.User.logIn(username, password).then(function(success) {
                resolve(success)
                console.log('start', success, 'end')
            }, function(error) {
                resolve(error)
            })
        })
    }

    // 手机和密码登录
    logInWithMobilePhone(phone, password) {
        return new Promise(function(resolve, reject) {
            AV.User.logInWithMobilePhone(phone, password).then(function(success) {
                console.info('success')
            }, function(error) {
                console.info('error')
            })
        })
    }

    // 手机号码获取验证码登录
    requestLoginSmsCode(phone) {
        return new Promise(function(resolve, reject) {
            AV.Cloud.requestLoginSmsCode(phone).then(function(success) {
                console.info('success')
            }, function(error) {
                console.info('error')
            })
        })
    }

    // 根据手机号码和验证登录
    logInWithMobilePhoneSmsCode(phone, smsCode) {
        return new Promise(function(resolve, reject) {
            AV.User.logInWithMobilePhoneSmsCode(phone, smsCode).then(function(success) {
                console.info('success')
            }, function(error) {
                console.info('error')
            })
        })
    }

    // 获取当前用户的信息
    getCurrentUser() {
        return new Promise(function(resolve, reject) {
            var currentUser = AV.User.current()
            if (currentUser) {
                // 获取当前用户的sessionToken
                var sessionToken = currentUser.getSessionToken()
                resolve({
                    sessionToken: sessionToken,
                    user: currentUser
                })
            } else {
                resolve('当前没有用户登录！')
            }
        })
    }

    // 字段完全匹配查询数据
    findDataByEqualToField(table, fields) {
        return new Promise(function(resolve, reject) {
            var query = new AV.Query(table)
            var newParams = fields
            for (var key in newParams) {
                query.equalTo(key, newParams[key])
            }
            query.find().then(function(results) {
                resolve(results)
            }, function(err) {
                resolve(err)
            })
        })
    }

    // 包含查询
    findDataByContainsField(table, fields) {
        return new Promise(function(resolve, reject) {
            var query = new AV.Query(table)
            var newParams = fields
            for (var key in newParams) {
                query.contains(key, newParams[key])
            }
            query.find().then(function(results) {
                resolve(results)
            }, function(err) {
                resolve(err)
            })
        })
    }

    // 前缀查询
    findDataByStartsWithField(table, fields) {
        return new Promise(function(resolve, reject) {
            var query = new AV.Query(table)
            var newParams = fields
            for (var key in newParams) {
                query.startsWith(key, newParams[key])
            }
            query.find().then(function(results) {
                resolve(results)
            }, function(err) {
                resolve(err)
            })
        })
    }

    // 数组查询
    findDataByStartsWithArray(table, field, array) {
        return new Promise(function(resolve, reject) {
            var query = new AV.Query(table)
            var arr = array
            query.containsAll(field, arr)
            query.find().then(function(results) {
                resolve(results)
            }, function(err) {
                resolve(err)
            })
        })
    }

    // 不包含查询
    findDataByNotContainedIn(table, field, array) {
        return new Promise(function(resolve, reject) {
            var query = new AV.Query(table)
            var arr = array
            query.notContainedIn(field, arr)
            query.find().then(function(results) {
                resolve(results)
            }, function(err) {
                resolve(err)
            })
        })
    }

    // 获取第一条数据
    getFirstData(table, fileds) {
        var query = new AV.Query('Comment')
        var newParams = fields
        for (var key in newParams) {
            query.equalTo(key, newParams[key])
        }
        query.first().then(function(data) {
            return data
        }, function(error) {
            return error
        })
    }
}
module.exports = new leancloudDao()