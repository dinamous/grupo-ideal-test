document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.getElementById('main-nav');

    // ==================================
    // BOTÃO HAMBÚRGUER
    // ==================================
    function toggleMainNav() {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', String(!expanded));
        hamburger.classList.toggle('is-active');
        mainNav.classList.toggle('is-active');
        closeAllDropdowns();
    }

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', toggleMainNav);
    }

    // ==================================
    // FUNÇÕES UTILITÁRIAS
    // ==================================
    // Fecha todos os dropdowns abertos
    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown.is-open, .has-submenu.is-open').forEach(li => {
            li.classList.remove('is-open');
            const toggle = li.querySelector('> a');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
    }

    // Fecha dropdowns irmãos de um <li>
    function closeSiblingDropdowns(li) {
        Array.from(li.parentElement.children)
            .filter(sib => sib !== li)
            .forEach(sib => {
                if (sib.classList.contains('is-open')) {
                    sib.classList.remove('is-open');
                    const t = sib.querySelector('> a');
                    if (t) t.setAttribute('aria-expanded', 'false');
                }
            });
    }

    // ==================================
    // DROPDOWNS DE 1º E 2º NÍVEL
    // ==================================
    const dropdownToggles = mainNav.querySelectorAll(
        'li.dropdown > .dropdown-toggle, li.has-submenu > a'
    );

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', event => {
            if (window.innerWidth <= 768) {
                event.preventDefault();
                const li = toggle.closest('li');
                const nowOpen = li.classList.toggle('is-open');
                toggle.setAttribute('aria-expanded', String(nowOpen));
                closeSiblingDropdowns(li);
            }
        });

        toggle.addEventListener('keydown', event => {
            if (event.key === 'Enter' && window.innerWidth <= 768) {
                event.preventDefault();
                toggle.click();
            }
        });
    });

    // ==================================
    // FECHAR MENU EM LINKS FINAIS
    // ==================================
    mainNav.querySelectorAll('li:not(.dropdown):not(.has-submenu) > a')
        .forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768 && hamburger.getAttribute('aria-expanded') === 'true') {
                    toggleMainNav();
                }
            });
        });

    // ==================================
    // REDIMENSIONAMENTO PARA DESKTOP
    // ==================================
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && hamburger.getAttribute('aria-expanded') === 'true') {
                toggleMainNav();
            }
        }, 250);
    });
});
  