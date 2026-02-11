// ========== Custom Cursor Animation ==========
(function() {
  var dot = document.querySelector('.cursor-dot');
  var outline = document.querySelector('.cursor-outline');
  if (!dot || !outline) return;

  // Hide on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    dot.style.display = 'none';
    outline.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  var mouseX = -100, mouseY = -100;
  var outlineX = -100, outlineY = -100;

  // Instant dot position
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Smooth trailing outline
  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    outline.style.left = outlineX + 'px';
    outline.style.top = outlineY + 'px';
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // Hover effect on interactive elements
  var hoverTargets = document.querySelectorAll('a, button, .filter-item, .suggestion-chip, .service-card, .card, .social-links button, input, textarea');
  hoverTargets.forEach(function(el) {
    el.addEventListener('mouseenter', function() {
      dot.classList.add('cursor-hover');
      outline.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', function() {
      dot.classList.remove('cursor-hover');
      outline.classList.remove('cursor-hover');
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', function() {
    dot.classList.add('cursor-hidden');
    outline.classList.add('cursor-hidden');
  });
  document.addEventListener('mouseenter', function() {
    dot.classList.remove('cursor-hidden');
    outline.classList.remove('cursor-hidden');
  });
})();


// ========== Typing Animation ==========
(function() {
  const texts = [
    "Flutter Developer",
    "Mobile App Developer",
    "UI/UX Enthusiast",
    "Firebase Expert",
    "Open Source Contributor"
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedEl = document.getElementById('typed-text');

  function type() {
    const current = texts[textIndex];
    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
      speed = 2000; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  if (typedEl) type();
})();


// ========== Stats Counter Animation (Intersection Observer) ==========
(function() {
  const counters = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach(function(counter) {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const step = Math.ceil(duration / target);
      let current = 0;

      const timer = setInterval(function() {
        current++;
        counter.textContent = current;
        if (current >= target) {
          clearInterval(timer);
          counter.textContent = target;
        }
      }, step);
    });
  }

  if (counters.length > 0) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounters();
        }
      });
    }, { threshold: 0.3 });

    var statsSection = document.querySelector('.stats-section');
    if (statsSection) observer.observe(statsSection);
  }
})();


// ========== Skill Progress Circles (Intersection Observer) ==========
(function() {
  var skillsAnimated = false;

  var skills = [
    { progress: '.html-css', value: '.html-progress', end: 95, color: '#fca61f', speed: 30 },
    { progress: '.javascript', value: '.javascript-progress', end: 90, color: '#7d2ae8', speed: 30 },
    { progress: '.php', value: '.php-progress', end: 85, color: '#20c997', speed: 30 },
    { progress: '.reactjs', value: '.reactjs-progress', end: 85, color: '#3f396d', speed: 30 }
  ];

  function animateSkills() {
    if (skillsAnimated) return;
    skillsAnimated = true;

    skills.forEach(function(s) {
      var progressEl = document.querySelector(s.progress);
      var valueEl = document.querySelector(s.value);
      if (!progressEl || !valueEl) return;

      var start = 0;
      var interval = setInterval(function() {
        start++;
        valueEl.textContent = start + '%';
        progressEl.style.background = 'conic-gradient(' + s.color + ' ' + (start * 3.6) + 'deg, #ededed 0deg)';
        if (start >= s.end) clearInterval(interval);
      }, s.speed);
    });
  }

  var skillSection = document.querySelector('.skill');
  if (skillSection) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateSkills();
        }
      });
    }, { threshold: 0.2 });
    observer.observe(skillSection);
  }
})();


// ========== Portfolio Filter with Active State ==========
$(document).ready(function () {
  $(".filter-item").first().addClass('active-filter');

  $(".filter-item").click(function () {
    $(".filter-item").removeClass('active-filter');
    $(this).addClass('active-filter');

    const value = $(this).attr("data-filter");
    if (value == "all") {
      $(".post").show("1000");
    } else {
      $(".post")
        .not("." + value)
        .hide("1000");
      $(".post")
        .filter("." + value)
        .show("1000");
    }
  });
});


// ========== Sticky Navbar with Scroll Effect ==========
document.addEventListener("DOMContentLoaded", function () {
  var navbar = document.getElementById('navbar-top');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('fixed-top', 'scrolled');
      var navbar_height = document.querySelector('.navbar').offsetHeight;
      document.body.style.paddingTop = navbar_height + 'px';
    } else {
      navbar.classList.remove('fixed-top', 'scrolled');
      document.body.style.paddingTop = '0';
    }
  });

  // Auto-close mobile navbar on link click
  var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  var navbarCollapse = document.getElementById('navbarNav');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (navbarCollapse.classList.contains('show')) {
        var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
});


// ========== Active Nav Link Highlighting on Scroll ==========
(function() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  function highlightNav() {
    var scrollPos = window.scrollY + 100;

    sections.forEach(function(section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav();
})();


// ========== Back to Top Button ==========
(function() {
  var mybutton = document.getElementById("btn-back-to-top");

  window.addEventListener('scroll', function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      mybutton.style.display = "flex";
      mybutton.style.alignItems = "center";
      mybutton.style.justifyContent = "center";
    } else {
      mybutton.style.display = "none";
    }
  });

  mybutton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


// ========== Email Sending (EmailJS) ==========
emailjs.init("ZyBdq3JrAeYe_-chO");

(function() {
  var form = document.getElementById("contact-form");
  var statusDiv = document.getElementById('status');
  var submitBtn = document.getElementById('form-submit');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    emailjs.sendForm('service_5zdqw9o', 'template_dkztyoy', form)
      .then(function(response) {
        statusDiv.textContent = "Message sent successfully!";
        statusDiv.style.color = "#22c55e";
        statusDiv.style.fontWeight = "600";
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
        setTimeout(function() { statusDiv.textContent = ''; }, 5000);
      }, function(error) {
        statusDiv.textContent = "Failed to send message. Please try again.";
        statusDiv.style.color = "#dc2626";
        statusDiv.style.fontWeight = "600";
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
      });
  });
})();
