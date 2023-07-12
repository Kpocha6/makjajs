const express = require('express');
const Twit = require('twit');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

// Configuración de autenticación de Twitter
const T = new Twit({
    consumer_key: 'ROoBcJMR37DPXivQIZYX8kwOw',
    consumer_secret: '8YS8DqiYPrpN6cLW5OR5n4plD6tnz4XDn9qIGv7kdMBiYHm2bu',
    access_token: '1678888146069512193-aCK25KDO8n3PoOanptMjVSJxKu94tb',
    access_token_secret: 'tX9CMYYLF9PaXnQTfgNxYwSUOxkXvFF6LOQ3zbva35JZk',
});

// Ruta principal que muestra el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Endpoint para recibir una confesión
app.post('/confesion', (req, res) => {
  // Aquí puedes procesar la confesión recibida y realizar las acciones necesarias, como publicar en Twitter.
  // Puedes acceder a los datos de la confesión a través del objeto req.body.
  // Realiza las acciones adecuadas para procesar la confesión, como publicar un tweet con el contenido recibido.
  const confesion = req.body.confesion;
  // Ejemplo de publicación en Twitter
  T.post('statuses/update', { status: confesion }, (err, data, response) => {
    if (err) {
      console.error('Error al publicar en Twitter:', err);
      res.sendStatus(500);
    } else {
      console.log('Confesión publicada en Twitter:', data.text);
      res.sendStatus(200);
    }
  });
});

// Iniciar el servidor en un puerto específico
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor web iniciado en el puerto ${port}`);
});

// Iniciar el bot para escuchar menciones o mensajes directos
// Aquí puedes agregar la lógica del bot para recibir menciones, mensajes directos, etc.
// Puedes utilizar los métodos proporcionados por Twit para interactuar con la API de Twitter.
// Por ejemplo, puedes usar T.post() para publicar un tweet en respuesta a una mención.
// Recuerda configurar los listeners y realizar las acciones adecuadas según tus necesidades.

// Ejemplo básico de configuración del bot para escuchar menciones
const stream = T.stream('statuses/filter', { track: '@TuUsuarioDeTwitter' });
stream.on('tweet', (tweet) => {
  // Aquí puedes procesar el tweet recibido y realizar las acciones correspondientes
  // por ejemplo, puedes responder al tweet con un mensaje o realizar cualquier otra lógica deseada
  console.log('Mención recibida:', tweet.text);
});

