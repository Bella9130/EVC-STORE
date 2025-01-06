const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');

// Premios iniciales (se cargarán desde localStorage o valor predeterminado)
let prizes = JSON.parse(localStorage.getItem('prizes')) || [
  "Premio 1",
  "Premio 2",
  "Premio 3",
  "Premio 4",
  "Premio 5",
  "Premio 6",
  "Premio 7",
  "Premio 8",
  "Premio 9",
  "Premio 10"
];

const numSlices = prizes.length;
const arc = (2 * Math.PI) / numSlices;

let startAngle = 0;
let spinTimeout = null;

let spinAngleStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;

function drawWheel() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  prizes.forEach((prize, i) => {
    const angle = startAngle + i * arc;

    ctx.fillStyle = i % 2 === 0 ? '#007bff' : '#001f54';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, angle, angle + arc, false);
    ctx.lineTo(centerX, centerY);
    ctx.fill();

    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px Arial';
    ctx.translate(
      centerX + Math.cos(angle + arc / 2) * radius / 2,
      centerY + Math.sin(angle + arc / 2) * radius / 2
    );
    ctx.rotate(angle + arc / 2);
    ctx.fillText(prize, -ctx.measureText(prize).width / 2, 0);
    ctx.restore();
  });
}

function rotateWheel() {
  spinTime += 30;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI) / 180;
  drawWheel();
  spinTimeout = setTimeout(rotateWheel, 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  const degrees = (startAngle * 180) / Math.PI + 90;
  const arcd = (arc * 180) / Math.PI;
  const index = Math.floor((360 - (degrees % 360)) / arcd);
  const winningPrize = prizes[index];

  alert(`¡Has ganado: ${winningPrize}!`);

  // Eliminar el premio ganado
  prizes.splice(index, 1);
  localStorage.setItem('prizes', JSON.stringify(prizes));

  // Redibujar la ruleta con los premios restantes
  drawWheel();
}

function easeOut(t, b, c, d) {
  const ts = (t /= d) * t;
  const tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

document.getElementById('spinButton').addEventListener('click', () => {
  const currentUser = localStorage.getItem('currentUser');
  const hasSpun = localStorage.getItem(`${currentUser}_spun`);

  if (hasSpun) {
    alert('Ya has girado la ruleta.');
    return;
  }

  if (prizes.length === 0) {
    alert('No hay premios disponibles.');
    return;
  }

  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3000 + 2000;
  rotateWheel();

  // Registrar que el usuario giró la ruleta
  localStorage.setItem(`${currentUser}_spun`, true);
});

// Dibujar la ruleta inicialmente
drawWheel();








