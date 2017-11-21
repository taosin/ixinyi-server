var fileService = require('../service/fileService')
module.exports = function(app) {
    app.get('/getFiles', function*(req, res) {
        var data = yield* fileService.downloadFile()
        res.json({
            data: data
        })
    })
}