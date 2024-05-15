const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  // Adicione aqui outros campos conforme necessário
});

module.exports = mongoose.model('User', UserSchema);
