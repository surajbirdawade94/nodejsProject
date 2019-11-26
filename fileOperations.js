var connection = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var dbData = require('./DBConnection/DBpaths');
const multer = require('multer');
var uploadExcel = require('./routes/uploadExcel')
var uploadImage = require('./routes/uploadImage')


mongoose.connect(dbData.dbPth, { useNewUrlParser: true });
var db = mongoose.connection;

var port = process.env.PORT || dbData.port;
var router = express.Router();

var fileOperations = express();
fileOperations.use(cors());

fileOperations.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000000 }));
fileOperations.use(bodyParser.json({ limit: '50mb', extended: true }));

fileOperations.use('/fileOperations/uploadImage', uploadImage);

fileOperations.use('/fileOperations/uploadExcel', uploadExcel);
fileOperations.use('/', router);
fileOperations.listen(port);
console.log('Server running on port ' + port);
