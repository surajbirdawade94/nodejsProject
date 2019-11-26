var express = require('express');
var router = express.Router();
const multer = require('multer');
//multer is used to upload files on the server which acts as middleware.
//Only jpeg/png files can be uploaded
const fileFilter = (req, file, callback) => {

    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        callback(null, true)
    }
    else {
        callback(new Error('Only JPEG/PNG Files Allowed'), false)
    }

}

//Below code represents image destination and its name
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '/home/infd004/Documents')
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }

})
const upload = multer({ storage: storage, fileFilter: fileFilter }).single('image');



router.post('/', function (req, res) {
    upload(req, res, function (err) {
        if (req.file) {
            res.json({ "Status": "Success", "Message": "JPEG/PNG file uploaded successfully" })
        }
        else {
            res.json({ "Status": "Failed", "Message": "Only JPEG/PNG files can be uploaded" })
        }

    })
})

module.exports = router;