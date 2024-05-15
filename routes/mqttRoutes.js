const mqtt = require('mqtt');
const client  = mqtt.connect('<Endereço do broker>')

router.post('/mqtt', (req, res) => {
  client.on('connect', () => {
    client.publish('<tópico a publicar>', 'Hello mqtt')
    console.log('mensagem enviada')
  })
  
  res.send('Mensagem enviada para o broker MQTT.');
});

module.exports = router;
