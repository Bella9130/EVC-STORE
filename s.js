const socket = io();
const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spinButton');
const resetButton = document.getElementById('resetButton');
const result = document.getElementById('result');

let premios = [];

// Escucha los premios actuales desde el servidor
socket.on('updatePremios', (nuevosPremios) => {
  premios = nuevosPremios;
  actualizarRuleta();
});

// Escucha el resultado del giro
socket.on('resultado', ({ premioGanador, premios: nuevosPremios }) => {
  result.textContent = `¡Ganaste: ${premioGanador}!`;
  premios = nuevosPremios;
  actualizarRuleta();
});

// Actualiza la ruleta en pantalla
function actualizarRuleta() {
  wheel.innerHTML = '';
  const angle = 360 / premios.length;

  premios.forEach((premio, index) => {
    const segment = document.createElement('div');
    segment.classList.add('segment');
    segment.style.transform = `rotate(${index * angle}deg) skewY(-30deg)`;
    segment.textContent = premio;
    wheel.appendChild(segment);
  });
}

// Evento para girar la ruleta
spinButton.addEventListener('click', () => {
  if (premios.length === 0) {
    result.textContent = 'No quedan premios';
    return;
  }
  socket.emit('girar');
});

// Evento para restablecer la ruleta
resetButton.addEventListener('click', () => {
  socket.emit('reset');
});
