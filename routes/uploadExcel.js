var allModels = require('../DBConnection/allModels');
var express = require('express');
var router = express.Router();
const multer = require('multer');
const xlsx = require('xlsx')


//Specified destination where the file will be stored and given the original filename.
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '/home/infd004/Documents')
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }

})
//only xlsx files are allowed
const fileFilter = (req, file, callback) => {

    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.mimetype === 'xlsx') {
        callback(null, true)
    }
    else {
        callback(new Error('Only xlsx Excel Files Allowed'), false)
    }

}
//The upload function which uploads the files
const upload = multer({ storage: storage, fileFilter: fileFilter }).single('excelFile');

router.post('/', async function (req, res) {
    upload(req, res, async function (err) {
        
        //Handling the data if excel file found and if not then showing errors in response.
        if (req.file) {
            var workbook = xlsx.readFile(`${req.file.path}`);
            var sheet_name_list = workbook.SheetNames;
            var data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            let excelCollection = allModels.excelCollectionModel;
            let docsArray = [];
            for (let i = 0; i < data.length; i++) {
                let { Name = null, Address = null, Phone = 0, Email = null } = data[i];
                doc = { "Name": Name, "Address": Address, "Phone": Phone, "Email": Email };
                docsArray.push(doc)
            }

            //Saving data in mongob database collection excelCollection
            let getData = await excelCollection.insertMany(docsArray).then(function (data,err) {
                if (err) {
                    res.json({"Status":"Success","Message":"Error while adding excel data in mongodb"})
                }
                else {
                    res.json({"Status":"Success","Message":"Excel uploaded successfully and excel data added into mongodb"})
                }

            });

        }
        else
        {
            res.json({"Status":"Failed","Message":"Only Excel files can be uploaded"})
        }

    })
})


module.exports = router;
