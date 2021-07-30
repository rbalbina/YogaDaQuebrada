const multer = require('multer')

const upload = multer({
    dest: 'fileStore',
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, callback){
        callback(new Error('File must be a image'))
    }
})



module.exports = upload