const mqtt = require('mqtt');
const express = require('express');
const router = express.Router();
try{
  const client  = mqtt.connect('<Endereço do broker>')
}catch(e)
{
  console.log(e);
}


router.post('/mqtt', (req, res) => {
  client.on('connect', () => {
    
    client.subscribe('Tópico');

  })
  
  client.on('message', function(topic, message){
    console.log(`Msg ${message} on ${topic}`)
  })
});

module.exports = router;
