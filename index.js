// Importa e declara o objeto do express
const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const mqtt = require('mqtt');

// Arquivos das Rotas
const userRoutes = require('./routes/userRoutes');
const trancaRoutes = require('./routes/locksRoutes'); 

// Porta de operação 
const PORT = 3000;

//Passwords 
const passwd = process.env.password;
const mqttUser = process.env.mqttUser;
const mqttPasswd = process.env.mqttPasswd;


app.use(express.json()); // Para analisar o corpo da requisição como JSON
app.use(express.urlencoded({ extended: true })); // Para dados 

// Conectar ao MongoDB
mongoose.connect(`mongodb+srv://admin:${passwd}@lockdb.ib4sr5m.mongodb.net/?retryWrites=true&w=majority&appName=lockdb`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado ao MongoDB')).catch(err => console.error('Erro ao conectar ao MongoDB', err));

//Configuração das rotas
app.use('/users', userRoutes);
app.use('/locks', trancaRoutes); // Adicione esta linha



// Configurações do broker MQTT
const mqttBrokerUrl = 'mqtt://igbt.eesc.usp.br:1883'; // Substitua pelo URL do seu broker
const mqttClient = mqtt.connect(mqttBrokerUrl, {
  username: mqttUser, // Substitua pelo nome de usuário
  password: mqttPasswd // Substitua pela senha
});

// Evento quando o cliente MQTT se conecta
mqttClient.on('connect', () => {
    console.log('Conectado ao broker MQTT');
    // Inscreva-se em um tópico (opcional)
    mqttClient.subscribe('/smartlock/sensor_porta');
    mqttClient.subscribe('/smartlock/desbloqueio_porta');

    mqttClient.on('message', (topic, message) => {
        console.log(`Mensagem recebida no tópico ${topic}: ${message.toString()}`);
    });


    app.post('/publicar', (req, res) => {
        const mensagem = 'Porta desbloqueado'; // Mensagem a ser publicada
        mqttClient.publish('/smartlock/desbloqueio_porta', mensagem);
        res.send('Mensagem publicada no tópico.');
    })
});



// Inicia o servidor
app.listen(PORT,()=> {
    console.log(`Server started at port ${PORT}`)
});
