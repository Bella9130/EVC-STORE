
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const cardCount = carousel.children.length;
const cardWidth = 270; // Card width + gap (250 + 20)
const visibleCards = Math.floor(document.querySelector('.carousel-container').offsetWidth / cardWidth);

let currentIndex = 0;
let autoScroll;

function updateCarousel() {
  const offset = -currentIndex * cardWidth;
  carousel.style.transform = `translateX(${offset}px)`;

  // Disable buttons at edges
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= cardCount - visibleCards;
}

function startAutoScroll() {
  autoScroll = setInterval(() => {
    if (currentIndex < cardCount - visibleCards) {
      currentIndex++;
    } else {
      clearInterval(autoScroll);
    }
    updateCarousel();
  }, 5000);
}

function resetAutoScroll() {
  clearInterval(autoScroll);
  startAutoScroll();
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) currentIndex--;
  updateCarousel();
  resetAutoScroll();
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < cardCount - visibleCards) currentIndex++;
  updateCarousel();
  resetAutoScroll();
});

// Initialize
updateCarousel();
startAutoScroll();

//SECCION DE PREGUNTAS PRECUENTES ---------------

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        question.classList.toggle('active');
        const answer = question.nextElementSibling;
        answer.classList.toggle('show');
    });
});

//SECCION CONTADOR -----------

function startCountdown(eventDate) {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            document.querySelector('.countdown-container h1').innerText = '¡El Evento Comenzó!';
            document.querySelector('.countdown').style.display = 'none';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

const eventDate = new Date('2025-02-13T23:59:59').getTime(); // Cambia la fecha aquí
startCountdown(eventDate);

