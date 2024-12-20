const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Premios iniciales de la ruleta
let premios = ["Premio 1", "Premio 2", "Premio 3", "Premio 4", "Premio 5", "Premio 6", "Premio 7", "Premio 8"];

app.use(express.static('public')); // Sirve archivos del directorio 'public'

// Cuando un cliente se conecta
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  
  // Envía los premios actuales al nuevo cliente
  socket.emit('updatePremios', premios);

  // Maneja el evento de girar la ruleta
  socket.on('girar', () => {
    const indexGanador = Math.floor(Math.random() * premios.length);
    const premioGanador = premios[indexGanador];

    // Elimina el premio ganador
    premios.splice(indexGanador, 1);

    // Notifica a todos los clientes el premio ganador y actualiza la lista
    io.emit('resultado', { premioGanador, premios });
  });

  // Restablece la ruleta
  socket.on('reset', () => {
    premios = ["Premio 1", "Premio 2", "Premio 3", "Premio 4", "Premio 5", "Premio 6", "Premio 7", "Premio 8"];
    io.emit('updatePremios', premios);
  });
});

// Inicia el servidor
server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
