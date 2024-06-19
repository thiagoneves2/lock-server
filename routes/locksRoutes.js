const express = require('express');
const Tranca = require('../models/Tranca');
const router = express.Router();


router.post('/', async (req, res) => {

  console.log(req.body);
  try {
      const {nome, ownerEmail ,localizacao, isopen, isdooropen ,serial_num, password} = req.body; 
      const newTranca = new Tranca({nome,ownerEmail, localizacao, isopen, isdooropen ,serial_num, password}); 

      await newTranca.save();

      res.status(201).json({ message: 'Tranca cadastrada com sucesso!' });
  } catch (error) {
      console.error('Erro ao cadastrar Tranca:', error);
      res.status(500).json({ error: 'Erro ao cadastrar Tranca' });
  }
});

//Pesquisa por email
router.get("/search/:ownerEmail", async (req, res) => {
  const { ownerEmail } = req.params;
  try {
    const trancas = await Tranca.find({ ownerEmail });
    return res.status(200).json(trancas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar trancas" });
  }
});

router.put('/:serial_num', async (req, res) => {
  try {
      const { serial_num } = req.params; // Obtém o email do parâmetro da rota
      const atualizacao = req.body; // Obtém os dados a serem atualizados do corpo da requisição

      // Atualize o usuário pelo email
      const lock = await Tranca.findOneAndUpdate({ serial_num }, atualizacao, { new: true });

      if (!lock) {
          return res.status(404).json({ error: 'Tranca não encontrada' });
      }

      return res.json({ lock });
  } catch (error) {
      console.error('Erro ao atualizar tranca:', error);
      return res.status(500).json({ error: 'Erro ao atualizar tranca' });
  }
});

module.exports = router;
