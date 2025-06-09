// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
  // ================================
  // Inicialização do Splide.js
  // ================================
  const slider = new Splide("#main-slider", {
    type: "loop",
    autoplay: true,
    interval: 5000,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: true,
    pagination: true,
    keyboard: true,
    accessibility: {
      slideRole: "group",
      slideLabel: "Slide {{index}} de {{length}}",
    },
    breakpoints: {
      768: {
        arrows: false,
      },
    },
  });
  slider.mount();

  // ==================================
  // SCROLL SUAVE PARA LINKS INTERNOS
  // ==================================
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});



