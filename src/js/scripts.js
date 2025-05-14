
// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');

// Load saved theme
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

// Toggle theme
themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    moonIcon.classList.toggle('hidden');
    sunIcon.classList.toggle('hidden');
    
    localStorage.setItem('theme', 
        document.documentElement.classList.contains('dark') ? 'dark' : 'light');
});

  $(document).ready(function () {
    var $owl = $(".owl-carousel");
    var $prevBtn = $("#prevBtn");
    var $nextBtn = $("#nextBtn");

    $owl.owlCarousel({
      items: 6.5,
      loop: false, // Important: disables infinite loop so we can detect start/end
      nav: false,  // We'll use custom nav
      dots: false,
      margin: 10,
      onChanged: updateNavButtons,
      responsive: {
        0: { // Mobile first approach
            items: 1.8,
        },
        576: { // sm
            items: 3.2,
        },
        768: { // md
            items: 4,
        },
        992: { // lg
            items: 5.3,
        },
        1200: { // xl
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

      // Hide prev button if at start
      if (index === 0) {
        $prevBtn.hide();
      } else {
        $prevBtn.show();
      }

      // Hide next button if at end
      if (index === total - 1) {
        $nextBtn.hide();
      } else {
        $nextBtn.show();
      }
    }

    // Initial check
    updateNavButtons({ item: { index: 0, count: $owl.find(".owl-item:not(.cloned)").length } });
  });


  // Song seek bar
    const TOTAL_DURATION = 146000; // 2 minutes 26 seconds in ms
  let animationFrame;
  let startTime;

  function updateAnimation() {
    const now = Date.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / TOTAL_DURATION, 1);
    const remainingTime = TOTAL_DURATION - elapsed;

    // Update progress bar (fill up)
    document.getElementById('progressBar').style.width = `${progress * 100}%`;

    // Update timer (count down)
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