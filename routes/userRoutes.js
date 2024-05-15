const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Cadastrar usuário
router.post('/usuarios', async (req, res) => {
  const user = await User.create(req.body);
  return res.send({ user });
});

// Procurar todos os usuários
router.get('/usuarios', async (req, res) => {
  const users = await User.find();
  return res.send({ users });
});

// Procurar usuário por ID
router.get('/usuarios/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  return res.send({ user });
});

// Alterar usuário
router.put('/usuarios/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
  return res.send({ user });
});

// Excluir usuário
router.delete('/usuarios/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  return res.send({ user });
});

module.exports = router;
