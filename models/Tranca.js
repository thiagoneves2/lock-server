const mongoose = require('mongoose');

const TrancaSchema = new mongoose.Schema({
  nome: String,
  localizacao: String,
  status: Boolean
});

module.exports = mongoose.model('Tranca', TrancaSchema);
