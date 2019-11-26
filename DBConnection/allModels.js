const mongoose = require("mongoose");

let excelCollectionSchema = mongoose.Schema({
  "Name":String,
  "Address":String,
  "Phone":String,
  "Email":String,
})

const excelCollectionModel = mongoose.model(
  "excelCollectionModel",
  excelCollectionSchema,
  "excelCollection"
);


module.exports = {
  excelCollectionModel
};
