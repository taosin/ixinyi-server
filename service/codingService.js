/*
 * @Author: iMocco
 * @Date:   2017-06-23 13:50:34
 * @Last Modified by:   iMocco
 * @Last Modified time: 2017-07-03 12:43:24
 */

'use strict';
var http = require('http');
var AV = require('leanengine')
var url = require('url')
var https = require('https');
var querystring = require('querystring');
var cookie = require('cookie-parser');
var sid = 'fb54a6bf-2af9-4ab7-9ccd-68ea3b1f919r';
var request = require('request');
var cheerio = require('cheerio');
var CronJob = require('cron').CronJob
class CodingService {

    // 定时登录发布冒泡
    runAddTweet() {
            // let self = this
            // 每天早上9:00更新一次
            // var job = new CronJob('0 9 * * *', function () {
            // self.loginCoding()
            // }, null, true, 'Asia/Chongqing')
        }
        // 定时点赞
    runLikePop() {
        let self = this
            // 每天早上9:00更新一次
            // var job = new CronJob('56 23 * * *', function () {
        self.likePop()
            // }, null, true, 'Asia/Chongqing')
    }

    // 登录
    loginCoding() {
        var self = this
        var data = querystring.stringify({
            account: "18512115504",
            password: "2fd0da67cf3343c3f360c280be1d0a241d7c072e"
        });
        var options = {
            host: 'coding.net',
            path: '/api/v2/account/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'sid=' + sid
            }
        };
        var reqq = https.request(options, function(ress) {
            ress.setEncoding('utf8');
            ress.on('data', function(chunk) {
                var result = JSON.parse(chunk)
                if (result.code === 0) {
                    self.addTweet()
                }
            });
            ress.on('end', function(chunk) {
                console.log("body: " + chunk);
            })
        });
        reqq.write(data);
        reqq.end();
    }

    // 发表冒泡
    addTweet() {
        request('http://wufazhuce.com', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(body);
                var img = $('img.fp-one-imagen')['0'].attribs.src
                var text = $('.fp-one-cita a')[0].children[0].data

                var data = querystring.stringify({
                    content: '#早安# ' + text,
                    location: 'Shang Hai',
                    device: "iPhone 6S Plus"
                });
                var options = {
                    host: 'coding.net',
                    path: '/api/social/tweet',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Cookie': 'sid=' + sid
                    }
                };
                var reqq = https.request(options, function(ress) {
                    ress.setEncoding('utf8');
                    ress.on('data', function(chunk) {
                        console.log(JSON.parse(chunk));
                    });
                    ress.on('end', function(chunk) {
                        console.log("body: " + chunk);
                    })
                });
                reqq.write(data);
                reqq.end();
            }
        })
    }

    // 点赞
    likePop() {
        var time = new Date().getTime()
        https.get('https://coding.net/api/social/tweet/public_tweets?sort=time&last_time=' + time + '&default_like_count=10&size=100&filter=true', function(ress) {
            var str = '';
            ress.on('data', function(chunks) {
                str += chunks;
            });
            ress.on('end', function() {
                var result = JSON.parse(str)
                if (result.code === 0) {
                    for (var i = 0; i < result.data.length; i++) {
                        let id = result.data[i].id
                        var data = querystring.stringify({});
                        // 循环点赞
                        var options = {
                            host: 'coding.net',
                            path: '/api/social/tweet/' + id + '/like',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Cookie': 'sid=' + sid
                            }
                        };
                        var req = https.request(options, function(resss) {
                            resss.setEncoding('utf8');
                            console.log(i + '----- ' + resss.statusCode);
                            resss.on('data', function(chunk) {
                                console.log(i + ": " + chunk);
                            });
                            resss.on('end', function(chunk) {
                                console.log(i + ": " + chunk);
                            })
                        });
                        req.write(data);
                        req.end();
                    }
                }
            });
        });
    }
}
module.exports = new CodingService()