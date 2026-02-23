const carouselUl = document.querySelector('.secao-10 .carrossel-itens ul');
const btnPrev = document.querySelector('.secao-10 .prev');
const btnNext = document.querySelector('.secao-10 .next');

let isMoving = false;
let itemWidth;

// Pega os itens uma única vez
let items = carouselUl.children;

// Calcula largura apenas quando necessário
function updateWidth() {
    if (items.length > 0) {
        itemWidth = items[0].getBoundingClientRect().width + 40;
    }
}

// Calcula no load
updateWidth();

// Recalcula apenas no resize
window.addEventListener('resize', updateWidth);

function moveCarousel(direction) {
    if (isMoving) return;
    isMoving = true;

    if (direction === 'next') {

        carouselUl.style.transform = `translateX(-${itemWidth}px)`;

        carouselUl.addEventListener('transitionend', function handler() {
            carouselUl.removeEventListener('transitionend', handler);

            carouselUl.appendChild(carouselUl.firstElementChild);
            carouselUl.style.transition = 'none';
            carouselUl.style.transform = 'translateX(0)';

            // Força reflow mínimo controlado
            carouselUl.offsetHeight;

            carouselUl.style.transition = 'transform 0.5s ease-in-out';

            isMoving = false;
        });

    } else {

        carouselUl.style.transition = 'none';
        carouselUl.prepend(carouselUl.lastElementChild);
        carouselUl.style.transform = `translateX(-${itemWidth}px)`;

        requestAnimationFrame(() => {
            carouselUl.style.transition = 'transform 0.5s ease-in-out';
            carouselUl.style.transform = 'translateX(0)';
        });

        carouselUl.addEventListener('transitionend', function handler() {
            carouselUl.removeEventListener('transitionend', handler);
            isMoving = false;
        });
    }
}

btnNext.addEventListener('click', () => moveCarousel('next'));
btnPrev.addEventListener('click', () => moveCarousel('prev'));



gsap.registerPlugin(ScrollTrigger)

function animateEntry(selector, initialProps) {
  gsap.utils.toArray(selector).forEach(el => {
    gsap.fromTo(
      el,
      {
        ...initialProps,
        autoAlpha: 0,
        scale: 0.98
      },
      {
        x: 0,
        y: 0,
        autoAlpha: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true
        }
      }
    );
  });
}

animateEntry(".blur-up",   { y: 60 });
animateEntry(".blur-down", { y: -60 });
animateEntry(".blur-left", { x: 60 });
animateEntry(".blur-right",{ x: -60 });





// ==========================================
// ANIMAÇÕES DE TEXTO (SplitType + GSAP)
// ==========================================

// Trava de segurança: Espera as fontes carregarem antes de fatiar o texto
document.fonts.ready.then(() => {

    // 1. Revelação Letra por Letra (.split-chars)
    gsap.utils.toArray('.split-chars').forEach(elemento => {
        gsap.set(elemento, { autoAlpha: 1 });
        const textoFatiado = new SplitType(elemento, { types: 'chars' });

        gsap.from(textoFatiado.chars, {
            opacity: 0,
            y: 30,
            rotateX: -90,
            duration: 0.8,
            stagger: 0.03,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: elemento,
                start: "top 85%",
                once: true
            }
        });
    });

    // 2. Revelação Palavra por Palavra (.split-words)
    gsap.utils.toArray('.split-words').forEach(elemento => {
        gsap.set(elemento, { autoAlpha: 1 });
        const textoFatiado = new SplitType(elemento, { types: 'words' });

        gsap.from(textoFatiado.words, {
            opacity: 0,
            y: 20,
            filter: "blur(8px)",
            duration: 1,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
                trigger: elemento,
                start: "top 85%",
                once: true
            }
        });
    });

}); // <-- Fim da trava de segurança das fontes


document.querySelectorAll(".link").forEach(btn => {
    btn.addEventListener("click", function(e) {
        e.preventDefault();

        smoother.scrollTo("#valor", {
            duration: 1.2,
            ease: "power3.out"
        });
    });
});