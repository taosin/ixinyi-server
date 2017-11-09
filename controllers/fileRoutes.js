var fileService = require('../service/fileService')
module.exports = function(app) {
    app.get('/getFiles', function*(req, res) {
        var data = yield* fileService.getFileList(path)
        res.json({
            data: data
        })
    })
}