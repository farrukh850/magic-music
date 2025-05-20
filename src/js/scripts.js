
// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');
if (localStorage.getItem('theme') === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    moonIcon.classList.add('hidden');
    sunIcon.classList.remove('hidden');
} else {
    document.documentElement.classList.remove('dark');
    moonIcon.classList.remove('hidden');
    sunIcon.classList.add('hidden');
}
themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    moonIcon.classList.toggle('hidden');
    sunIcon.classList.toggle('hidden');
    
    localStorage.setItem('theme', 
        document.documentElement.classList.contains('dark') ? 'dark' : 'light');
});

// Carousel
  $(document).ready(function () {
    var $owl = $(".owl-carousel");
    var $prevBtn = $("#prevBtn");
    var $nextBtn = $("#nextBtn");

    $owl.owlCarousel({
      items: 6.5,
      loop: true, 
      nav: false,  
      margin: 10,
      dots: false,
      onChanged: updateNavButtons,
      responsive: {
        0: { 
          items: 2.2,
          center: true,
        },
        576: { 
            items: 3.2,
        },
        768: { 
            items: 4,
        },
        992: { 
            items: 5.3,
        },
        1200: { 
            items: 6.5,
        }
      }
    });

    $prevBtn.click(function () {
      $owl.trigger("prev.owl.carousel");
    });

    $nextBtn.click(function () {
      $owl.trigger("next.owl.carousel");
    });

function updateNavButtons(event) {
  const index = event.item.index;
  const total = event.item.count;
  const isMobile = window.innerWidth < 768; 

  if(isMobile) {
    $prevBtn.show();
    $nextBtn.show();
    return;
  }
  if (index === 0) {
    $prevBtn.hide();
  } else {
    $prevBtn.show();
  }
  
  if (index === total - 1) {
    $nextBtn.hide();
  } else {
    $nextBtn.show();
  }
}
function initNavButtons() {
  const totalItems = $owl.find(".owl-item:not(.cloned)").length;
  const initialIndex = 0;
  
  if(window.innerWidth < 768) {
    $prevBtn.show();
    $nextBtn.show();
  } else {
    updateNavButtons({ item: { index: initialIndex, count: totalItems }});
  }
}
initNavButtons();
$(window).on('resize', function() {
  initNavButtons();
});
  });


  // Song seek bar
    const TOTAL_DURATION = 146000; 
  let animationFrame;
  let startTime;

  function updateAnimation() {
    const now = Date.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / TOTAL_DURATION, 1);
    const remainingTime = TOTAL_DURATION - elapsed;
    document.getElementById('progressBar').style.width = `${progress * 100}%`;
    const totalSeconds = Math.ceil(remainingTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    document.getElementById('timeCounter').textContent = 
      `${minutes}:${seconds.toString().padStart(2, '0')}`;

    if (remainingTime > 0) {
      animationFrame = requestAnimationFrame(updateAnimation);
    } else {
      document.getElementById('timeCounter').textContent = '0:00';
      document.getElementById('progressBar').style.width = '100%';
    }
  }

  window.addEventListener('load', () => {
    startTime = Date.now();
    animationFrame = requestAnimationFrame(updateAnimation);
  });

  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationFrame);
  });

  // Sticky bottom song controls
   let lastScroll = 0;
  const footer = document.getElementById('scrollFooter');
  const scrollThreshold = 50; 

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
      footer.classList.add('visible');
    } else if (currentScroll < (scrollThreshold / 2)) {
      footer.classList.remove('visible');
    }
    
    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  });

  if (window.scrollY > scrollThreshold) {
    footer.classList.add('visible');
  }