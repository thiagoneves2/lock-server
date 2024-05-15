const express = require('express');
const Tranca = require('../models/Tranca');
const router = express.Router();

router.post('/trancas', async (req, res) => {
  const tranca = await Tranca.create(req.body);
  return res.send({ tranca });
});

router.get('/trancas', async (req, res) => {
  const trancas = await Tranca.find();
  return res.send({ trancas });
});

module.exports = router;
