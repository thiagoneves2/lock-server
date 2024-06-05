const mongoose = require('mongoose');

const TrancaSchema = new mongoose.Schema({
  nome: String,
  ownerEmail: String,
  localizacao: String,
  isOpen: Boolean,
  serial_num: String,
  password: String
});

module.exports = mongoose.model('Tranca', TrancaSchema);
