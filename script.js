// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
  // ================================
  // 1) Inicialização do Splide.js
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

  // =============================
  // 2) MENU MOBILE (Clique em Dropdown)
  // =============================
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      // Só previne o comportamento padrão em telas mobile (<= 480px)
      if (window.innerWidth <= 480) {
        e.preventDefault();
        const parentLi = this.parentElement; // <li class="dropdown">
        const menu = parentLi.querySelector(".dropdown-menu");

        // Se já aberto, fecha
        if (menu.style.display === "block") {
          menu.style.display = "none";
          this.setAttribute("aria-expanded", "false");
        } else {
          // Fecha todos os outros dropdowns abertos
          document.querySelectorAll(".dropdown-menu").forEach((m) => {
            m.style.display = "none";
          });
          document.querySelectorAll(".dropdown-toggle").forEach((t) => {
            t.setAttribute("aria-expanded", "false");
          });

          // Abre o dropdown clicado
          menu.style.display = "block";
          this.setAttribute("aria-expanded", "true");
        }
      }
    });
  });

  // ==================================
  // 3) SCROLL SUAVE PARA LINKS INTERNOS
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

  // ==================================
  // 4) FECHAR DROPDOWNS COM A TECLA ESC
  // ==================================
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        menu.style.display = "none";
      });
      document.querySelectorAll(".dropdown-toggle").forEach((link) => {
        link.setAttribute("aria-expanded", "false");
      });
    }
  });

  // ======================================
  // 5) LAZY LOADING PARA IMAGENS (EXEMPLO)
  // ======================================
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            observer.unobserve(img);
          }
        }
      });
    });
    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // =====================================
  // 6) TRACKING DE EVENTOS (PLACEHOLDER)
  // =====================================
  function trackEvent(category, action, label) {
    // Exemplo: console.log ou integração real de analytics
    // console.log(Event tracked: ${ category } – ${ action } – ${ label });
  }

  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", function () {
      trackEvent("Navigation", "Click", this.textContent.trim());
    });
  });

  slider.on("moved", () => {
    trackEvent("Slider", "Slide Change", "Auto ou Manual");
  });
});

// =======================================
// 7) FUNÇÃO DE DEBOUNCE (Resize Handler)
// =======================================
const Utils = {
  debounce: (func, wait, immediate) => {
    let timeout;
    return function executedFunction() {
      const context = this;
      const args = arguments;
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },
};

// Resetar estado dos dropdowns ao redimensionar (quando não for mobile)
window.addEventListener(
  "resize",
  Utils.debounce(() => {
    const isMobile = window.innerWidth <= 480;
    if (!isMobile) {
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        menu.style.display = "";
      });
      document.querySelectorAll(".dropdown-toggle").forEach((link) => {
        link.setAttribute("aria-expanded", "false");
      });
    }
  }, 250)
);

// =======================================
// 8) SERVICE WORKER (Opcional para PWA)
// =======================================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful");
      })
      .catch((err) => {
        console.log("ServiceWorker registration failed", err);
      });
  });
}