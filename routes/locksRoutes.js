const express = require('express');
const Tranca = require('../models/Tranca');
const router = express.Router();


router.post('/trancas', async (req, res) => {

  console.log(req.body);
  try {
      const {nome, ownerEmail ,localizacao, status,serial_num, password} = req.body; 
      const newTranca = new Tranca({nome,ownerEmail, localizacao, status,serial_num, password}); 

      await newTranca.save();

      res.status(201).json({ message: 'Tranca cadastrada com sucesso!' });
  } catch (error) {
      console.error('Erro ao cadastrar Tranca:', error);
      res.status(500).json({ error: 'Erro ao cadastrar Tranca' });
  }
});


router.get('/trancas', async (req, res) => {
  const trancas = await Tranca.find();
  return res.send({ trancas });
});

module.exports = router;
