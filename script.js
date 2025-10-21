// Gallery logic
let currentPage = 0;

// Aguarda o DOM estar carregado para inicializar
function initializeGallery() {
  const pages = document.querySelectorAll('.gallery-page');
  const prevBtn = document.querySelector('.gallery-prev');
  const nextBtn = document.querySelector('.gallery-next');
  const indicators = document.querySelectorAll('.indicator');

  if (!pages.length || !prevBtn || !nextBtn) {
    console.log('Elementos da galeria não encontrados, tentando novamente...');
    setTimeout(initializeGallery, 800);
    return;
  }

  function showPage(index) {
    pages.forEach((page, i) => {
      page.classList.remove('active');
      if (i === index) {
        page.classList.add('active');
      }
    });
    
    indicators.forEach((indicator, i) => {
      indicator.classList.remove('active');
      if (i === index) {
        indicator.classList.add('active');
      }
    });
  }

  function nextPage() {
    currentPage = (currentPage + 1) % pages.length;
    showPage(currentPage);
  }

  function prevPage() {
    currentPage = (currentPage - 1 + pages.length) % pages.length;
    showPage(currentPage);
  }

  // Auto-play functionality
  let autoplayInterval;
  const galleryCarousel = document.querySelector('.gallery-carousel');
  
  function startAutoplay() {
    autoplayInterval = setInterval(nextPage, 4000); // Troca a cada 4 segundos
  }
  
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }
  
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Event listeners
  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    prevPage();
    resetAutoplay(); // Reinicia o autoplay após interação manual
  });
  
  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    nextPage();
    resetAutoplay(); // Reinicia o autoplay após interação manual
  });

  // Indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      currentPage = index;
      showPage(currentPage);
      resetAutoplay(); // Reinicia o autoplay após interação manual
    });
  });

  // Pausar autoplay no hover e retomar quando sair
  if (galleryCarousel) {
    galleryCarousel.addEventListener('mouseenter', stopAutoplay);
    galleryCarousel.addEventListener('mouseleave', startAutoplay);
  }

  // Inicializar autoplay e primeira página
  startAutoplay();
  showPage(0);
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeGallery);
} else {
  initializeGallery();
}

// Lightbox logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

// Capturar clique nas imagens da galeria usando event delegation
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('gallery-img')) {
    e.preventDefault();
    e.stopPropagation();
    lightbox.style.display = 'flex';
    lightboxImg.src = e.target.src;
    lightboxImg.alt = e.target.alt;
  }
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

// Fechar lightbox com a tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.style.display === 'flex') {
    lightbox.style.display = 'none';
  }
});

// Inicializar AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });
});
