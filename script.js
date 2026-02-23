const carouselUl = document.querySelector('.secao-10 .carrossel-itens ul');

const btnPrev = document.querySelector('.secao-10 .prev');

const btnNext = document.querySelector('.secao-10 .next');



let isMoving = false;



function moveCarousel(direction) {

    if (isMoving) return; // Evita bugs de cliques múltiplos rápidos

    isMoving = true;



    const items = document.querySelectorAll('.secao-10 .carrossel-itens ul li');

    const itemWidth = items[0].offsetWidth + 40; // Largura do li + gap (40px)



    if (direction === 'next') {

        // 1. Move a lista para a esquerda

        carouselUl.style.transition = 'transform 0.5s ease-in-out';

        carouselUl.style.transform = `translateX(-${itemWidth}px)`;



        // 2. Espera a animação acabar, move o primeiro item pro final e reseta posição

        setTimeout(() => {

            carouselUl.style.transition = 'none';

            carouselUl.appendChild(items[0]); // Move o primeiro elemento para o fim

            carouselUl.style.transform = `translateX(0)`;

            isMoving = false;

        }, 500);



    } else {

        // 1. Move o último item para o início instantaneamente

        carouselUl.style.transition = 'none';

        carouselUl.prepend(items[items.length - 1]);



        // 2. Desloca a lista negativamente para manter a visão visual parada

        carouselUl.style.transform = `translateX(-${itemWidth}px)`;



        // 3. Força um reflow e anima de volta para o zero

        setTimeout(() => {

            carouselUl.style.transition = 'transform 0.5s ease-in-out';

            carouselUl.style.transform = `translateX(0)`;
        }, 10);
        setTimeout(() => {
            isMoving = false;
        }, 510);
    }
}

btnNext.addEventListener('click', () => moveCarousel('next'));

btnPrev.addEventListener('click', () => moveCarousel('prev'));



gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
const smoother = ScrollSmoother.create({
    smooth: 1,
    effects: true,
    smoothTouch: 0.1
});

// ==========================================
// ANIMAÇÕES DE ENTRADA COM BLUR
// ==========================================

// 1. De baixo para cima
gsap.utils.toArray('.blur-up').forEach(elemento => {
    gsap.fromTo(elemento,
        { y: 60, autoAlpha: 0, filter: "blur(12px)" }, // Estado Inicial
        {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)", // Estado Final
            duration: 1.2,
            ease: "power3.out", // Suavidade no final do movimento
            scrollTrigger: {
                trigger: elemento,
                start: "top 85%", // Dispara quando o topo do elemento atinge 85% da altura da tela
                once: true // Anima apenas na entrada
            }
        }
    );
});

// 2. De cima para baixo
gsap.utils.toArray('.blur-down').forEach(elemento => {
    gsap.fromTo(elemento,
        { y: -60, autoAlpha: 0, filter: "blur(12px)" },
        {
            y: 0, autoAlpha: 1, filter: "blur(0px)",
            duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: elemento, start: "top 85%", once: true }
        }
    );
});

// 3. Da direita para a esquerda (blur-left)
gsap.utils.toArray('.blur-left').forEach(elemento => {
    gsap.fromTo(elemento,
        { x: 60, autoAlpha: 0, filter: "blur(12px)" }, // Começa 60px à direita
        {
            x: 0, autoAlpha: 1, filter: "blur(0px)", // Termina na posição original (0)
            duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: elemento, start: "top 85%", once: true }
        }
    );
});

// 4. Da esquerda para a direita (blur-right)
gsap.utils.toArray('.blur-right').forEach(elemento => {
    gsap.fromTo(elemento,
        { x: -60, autoAlpha: 0, filter: "blur(12px)" }, // Começa -60px à esquerda
        {
            x: 0, autoAlpha: 1, filter: "blur(0px)",
            duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: elemento, start: "top 85%", once: true }
        }
    );
});





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