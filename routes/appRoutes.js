//arquivo para as requisições do aplicativo
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Defina o esquema do usuário
const User = mongoose.model('User', new mongoose.Schema({
  
    //Modelo em JSON do banco de usuários

}));

// Cadastrar usuário
router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

// Procurar todos os usuários
router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// Procurar usuário por ID
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

// Alterar usuário
router.put('/email', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.send(user);
});

// Excluir usuário
router.delete('/email', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.send(user);
});

module.exports = router;