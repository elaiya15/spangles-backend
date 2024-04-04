const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pdf: { data: Buffer, contentType: String }
});

const FileModel = mongoose.model('File', fileSchema);

module.exports = FileModel;
