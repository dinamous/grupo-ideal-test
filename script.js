document.addEventListener("DOMContentLoaded", () => {
  const slider = new Splide("#main-slider", {
    type: "loop",
    autoplay: true,
    interval: 5000,
    pauseOnHover: true,
    arrows: true,
    pagination: true,
  });
  slider.mount();


  // Dropdown mobile
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", e => {
      if (window.innerWidth <= 480) {
        e.preventDefault();
        const menu = toggle.nextElementSibling;
        const isOpen = menu.style.display === "block";
        document.querySelectorAll(".dropdown-menu").forEach(m => m.style.display = "none");
        document.querySelectorAll(".dropdown-toggle").forEach(t => t.setAttribute("aria-expanded", "false"));
        if (!isOpen) {
          menu.style.display = "block";
          toggle.setAttribute("aria-expanded", "true");
        }
      }
    });
  });


  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // Fechar dropdowns com ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = 'none');
      document.querySelectorAll('.dropdown-toggle').forEach(t => t.setAttribute('aria-expanded', 'false'));
    }
  });

});