// Importa e declara o objeto do express
const express = require('express');
const app = express();
// Importa mongoose
const mongoose = require('mongoose');

// Arquivos das Rotas
const userRoutes = require('./routes/userRoutes');
const trancaRoutes = require('./routes/locksRoutes'); 
const mqttRoutes = require('./routes/mqttRoutes'); 

// Middleware para acesso dos dados da requisição
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Porta de operação 
const PORT = 3000;

// Conectar ao MongoDB
mongoose.connect('connection-string',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado ao MongoDB')).catch(err => console.error('Erro ao conectar ao MongoDB', err));

app.use('/users', userRoutes);
app.use('/trancas', trancaRoutes); // Adicione esta linha
app.use('/mqtt', mqttRoutes); // Adicione esta linha

// Inicia o servidor
app.listen(PORT,()=> {
    console.log(`Server started at port ${PORT}`)
});
