document.addEventListener('DOMContentLoaded', () => {
  // Inicializa o Splide Slider (mantido, pois é uma funcionalidade separada)
  if (document.getElementById('main-slider')) {
      new Splide('#main-slider', {
          type: 'loop',
          perPage: 1,
          autoplay: true,
          interval: 5000,
          arrows: true,
          pagination: true,
      }).mount();
  }

  // Seletores dos elementos
  const hamburgerButton = document.querySelector('.hamburger');
  const mainNav = document.getElementById('main-nav');

  // Funcionalidade do Botão Hambúrguer
  if (hamburgerButton && mainNav) {
      hamburgerButton.addEventListener('click', () => {
          const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';
          hamburgerButton.setAttribute('aria-expanded', !isExpanded);
          mainNav.classList.toggle('is-active');
          hamburgerButton.classList.toggle('is-active');

          // Ao abrir o menu, fecha todos os dropdowns (para evitar estado inconsistente)
          if (!isExpanded) {
              document.querySelectorAll('.dropdown.is-open, .has-submenu.is-open').forEach(item => {
                  item.classList.remove('is-open');
              });
          }
      });
  }

  // Funcionalidade para Dropdowns e Submenus (Nível 1 e 2) em Mobile
  // Seleciona todos os links que podem ter um dropdown (seja de 1º ou 2º nível)
  const allDropdownToggles = document.querySelectorAll('.nav-item.dropdown > .dropdown-toggle, .has-submenu > a');

  allDropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (event) => {
          if (window.innerWidth <= 768) { // Aplica apenas em telas menores
              event.preventDefault(); // Previne a navegação imediata

              // Encontra o item pai (<li>) que contém o submenu
              const parentItem = event.target.closest('.dropdown') || event.target.closest('.has-submenu');

              if (parentItem) {
                  // Fecha qualquer outro dropdown aberto no mesmo nível
                  parentItem.parentElement.querySelectorAll('.dropdown.is-open, .has-submenu.is-open').forEach(item => {
                      if (item !== parentItem) {
                          item.classList.remove('is-open');
                      }
                  });
                  // Alterna a classe 'is-open' no item clicado
                  parentItem.classList.toggle('is-open');
              }
          }
      });

      // Adiciona funcionalidade para tecla Enter (acessibilidade)
      toggle.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' && window.innerWidth <= 768) {
              event.preventDefault();
              event.target.click(); // Simula o clique para acionar o toggle
          }
      });
  });

  // Fechar o menu hambúrguer quando um link 'final' (sem submenu) for clicado em mobile
  if (mainNav && hamburgerButton) {
      mainNav.querySelectorAll('.nav-link:not(.dropdown-toggle):not(.has-submenu > a)').forEach(link => {
          link.addEventListener('click', () => {
              if (window.innerWidth <= 768) {
                  hamburgerButton.setAttribute('aria-expanded', 'false');
                  mainNav.classList.remove('is-active');
                  hamburgerButton.classList.remove('is-active');
                  // Garante que todos os dropdowns abertos sejam fechados
                  document.querySelectorAll('.dropdown.is-open, .has-submenu.is-open').forEach(item => {
                      item.classList.remove('is-open');
                  });
              }
          });
      });
  }


  // Fechar dropdowns e o menu principal ao redimensionar para desktop
  let resizeTimer;
  window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
          if (window.innerWidth > 768) {
              mainNav.classList.remove('is-active');
              hamburgerButton.classList.remove('is-active');
              hamburgerButton.setAttribute('aria-expanded', 'false');
              document.querySelectorAll('.dropdown.is-open, .has-submenu.is-open').forEach(item => {
                  item.classList.remove('is-open');
              });
          }
      }, 250);
  });
});