// Importa e declara o objeto do express
const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');

// Arquivos das Rotas
const userRoutes = require('./routes/userRoutes');
const trancaRoutes = require('./routes/locksRoutes'); 
const mqttRoutes = require('./routes/mqttRoutes'); 

// Porta de operação 
const PORT = 3000;

const passwd = process.env.password;

app.use(express.json()); // Para analisar o corpo da requisição como JSON
app.use(express.urlencoded({ extended: true })); // Para dados 

// Conectar ao MongoDB
mongoose.connect(`mongodb+srv://admin:${passwd}@lockdb.ib4sr5m.mongodb.net/?retryWrites=true&w=majority&appName=lockdb`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado ao MongoDB')).catch(err => console.error('Erro ao conectar ao MongoDB', err));


app.use('/users', userRoutes);
app.use('/locks', trancaRoutes); // Adicione esta linha
app.use('/mqtt', mqttRoutes); // Adicione esta linha

// Inicia o servidor
app.listen(PORT,()=> {
    console.log(`Server started at port ${PORT}`)
});
