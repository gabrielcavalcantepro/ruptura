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



gsap.registerPlugin(ScrollTrigger);

// ==============================
// ANIMAÇÕES DE ENTRADA
// ==============================

function animateEntry(selector, initialProps) {
  document.querySelectorAll(selector).forEach(el => {

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
          once: true,
          invalidateOnRefresh: true
        }
      }
    );

  });
}

animateEntry(".blur-up",   { y: 60 });
animateEntry(".blur-down", { y: -60 });
animateEntry(".blur-left", { x: 60 });
animateEntry(".blur-right",{ x: -60 });


// ==============================
// SPLIT TYPE
// ==============================

document.fonts.ready.then(() => {

  // ===== CHARS =====
  document.querySelectorAll('.split-chars').forEach(el => {

    const split = new SplitType(el, { types: 'chars' });

    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",   // dispara assim que entra
      once: true,
      onEnter: () => {

        gsap.to(el, { opacity: 1, duration: 0 }); // revela container

        gsap.from(split.chars, {
          opacity: 0,
          y: 30,
          rotateX: -90,
          duration: 0.8,
          stagger: 0.03,
          ease: "back.out(1.7)"
        });

      }
    });

  });


  // ===== WORDS =====
  document.querySelectorAll('.split-words').forEach(el => {

    const split = new SplitType(el, { types: 'words' });

    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {

        gsap.to(el, { opacity: 1, duration: 0 });

        gsap.from(split.words, {
          opacity: 0,
          y: 20,
          duration: 1,
          stagger: 0.06,
          ease: "power3.out"
        });

      }
    });

  });

  ScrollTrigger.refresh();
});


// ==============================
// SCROLL SUAVE
// ==============================

document.querySelectorAll(".link").forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();

    document.querySelector("#valor").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});


document.querySelectorAll(".link").forEach(btn => {
    btn.addEventListener("click", function(e) {
        e.preventDefault();

        document.querySelector("#valor").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});