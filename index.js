//importa e declara o objeto do express
const express = require('express');
const app = express();
//importa mongoose
const mongoose = require('mongoose');

//Arquivos das Rotas
const userRoutes = require('./routes/appRoutes');

//Middleware para acesso dos dados da requisição
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//porta de operação 
const PORT = 3000;


//conectar ao MongoDB
mongoose.connect('connection-string',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado ao MongoDB')).catch(err => console.error('Erro ao conectar ao MongoDB', err));

app.use('/users', userRoutes)

//incia o servidor
app.listen(PORT,()=> {
    console.log(`Server started at port ${PORT}`)
});
