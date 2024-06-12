const express = require('express');
const User = require('../models/User');
const router = express.Router();

// CADASTRO
router.post('/usuarios', async (req, res) => {

  console.log(req.body);
  try {
      const { nome, email, senha } = req.body; // Dados do corpo da requisição
      const newUser = new User({ nome, email, senha }); // Crie um novo usuário
      // Salve o usuário no banco de dados
      await newUser.save();

      res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
});

router.get('/', async (req, res) => {
  console.log("Rota em funcionamento ");
  return res.send({msg:"Rota Funcionando"});
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
router.put('/usuarios/:email', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.email, req.body, {new: true});
  return res.send({ user });
});

// Excluir usuário
router.delete('/usuarios/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  return res.send({ user });
});

module.exports = router;
