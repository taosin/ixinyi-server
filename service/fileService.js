/**
 * taoxin
 * 2017-11-09
 */
var fs = require('fs')
var co = require('co')
class FileService {

    *
    getFileList(path) {
        var filesList = []
        this.readFileList(path, filesList)
            // var data = fs.readFileSync('./controllers/userRoutes.js', 'utf-8')
            // console.log(data)
        return filesList
    }

    readFileList(path, filesList) {
        var files = fs.readdirSync(path)
        files.forEach(function(itm, index) {
            var stat = fs.statSync(path + itm)
            if (stat.isDirectory()) {
                // 递归读取文件
                readFileList(path + itm + '/', filesList)
            } else {
                var obj = {}
                obj.path = path
                obj.filename = itm
                filesList.push(obj)
            }
        })
    }
}
module.exports = new FileService()