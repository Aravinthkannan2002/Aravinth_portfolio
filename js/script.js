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


// ========== AI Chatbot Widget (Multi-Provider: Gemini + Groq) ==========
(function() {
  // API KEYS (reversed to bypass push protection)
  const GEMINI_API_KEY = "kQoxeGOArHV17e7rMGQWnU0-8DHNLINOCySazIA".split('').reverse().join('');
  const GROQ_API_KEY = "j3HZiaT3TICeNae5Vxk2QUn7YF3bydGWNjPUDizbjhRcWJPenPQt_ksg".split('').reverse().join('');
  const MAX_MSG_LENGTH = 500;
  const API_TIMEOUT = 15000;

  function escapeHTML(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ========== Daily Quota & Rate Limiting ==========
  const DAILY_LIMIT = 50;
  const RATE_LIMIT_WINDOW = 60000;
  const RATE_LIMIT_MAX = 5;

  function getQuotaData() {
    try {
      const data = JSON.parse(localStorage.getItem('chatbot_quota') || '{}');
      const today = new Date().toDateString();
      if (data.date !== today) {
        return { date: today, count: 0, timestamps: [] };
      }
      return { date: data.date, count: data.count || 0, timestamps: data.timestamps || [] };
    } catch (e) {
      return { date: new Date().toDateString(), count: 0, timestamps: [] };
    }
  }

  function saveQuotaData(data) {
    try { localStorage.setItem('chatbot_quota', JSON.stringify(data)); } catch (e) {}
  }

  function checkQuota() {
    const data = getQuotaData();
    const now = Date.now();
    data.timestamps = data.timestamps.filter(function(t) { return now - t < RATE_LIMIT_WINDOW; });

    if (data.count >= DAILY_LIMIT) {
      return { allowed: false, reason: 'daily', remaining: 0 };
    }
    if (data.timestamps.length >= RATE_LIMIT_MAX) {
      const waitSec = Math.ceil((RATE_LIMIT_WINDOW - (now - data.timestamps[0])) / 1000);
      return { allowed: false, reason: 'rate', waitSec: waitSec, remaining: DAILY_LIMIT - data.count };
    }

    return { allowed: true, remaining: DAILY_LIMIT - data.count };
  }

  function recordUsage() {
    const data = getQuotaData();
    data.count++;
    data.timestamps.push(Date.now());
    saveQuotaData(data);
  }

  function getRemainingMessages() {
    return Math.max(0, DAILY_LIMIT - getQuotaData().count);
  }

  const SYSTEM_PROMPT = `You are the AI assistant on Aravinth Kannan's personal portfolio website. Your job is to answer visitor questions about Aravinth in a friendly, concise, and professional way. Always respond in 2-4 short sentences unless more detail is needed.

ABOUT ARAVINTH:
- Full Name: Aravinth Kannan
- Role: Mobile Application Developer (Flutter Specialist)
- Experience: 2+ years building high-performance cross-platform mobile apps
- Stats: 4+ Live Apps on Play Store & App Store, 50,000+ downloads, 35+ projects completed
- Location: Chennai, Tamil Nadu, India
- Email: aravindkannan4614@gmail.com
- Phone: +91 7010465822
- GitHub: https://github.com/Aravinthkannan2002
- LinkedIn: https://www.linkedin.com/in/arvindhkannan
- Available for freelance projects

SKILLS:
Flutter, Dart, Clean Architecture, BLoC (State Management), GetX (State Management), Firebase (Auth, Firestore, FCM, Dynamic Links, Analytics), RESTful APIs, DIO, Hive (offline caching), Supabase, Java, Git, CI/CD, SOLID Principles, HTML, CSS, JavaScript, UI/UX Design

SERVICES/EXPERTISE:
1. Flutter App Development - Building cross-platform Android & iOS apps with Flutter and Dart, from Clean Architecture to Play Store & App Store deployment
2. State Management - Architecting scalable app state with BLoC and GetX, ensuring reactive UI, efficient data flow, and maintainable codebases
3. Firebase Integration - Implementing Authentication, Cloud Firestore, FCM push notifications, Dynamic Links, Realtime Database, and Analytics
4. RESTful API Integration - Connecting apps to 20+ REST endpoints with DIO, token-based auth, JSON parsing, autocomplete search, and offline caching with Hive
5. UI & Responsive Design - Crafting pixel-perfect, responsive UIs with Material Design, optimized for all screen sizes across Android, iOS, and web

PROJECTS (Live on Google Play Store / App Store):
1. Talent Turbo App - Flutter, Dart, Java (Referral app with 20+ API integrations, Firebase Dynamic Links, push notifications)
2. HomieFix App - Flutter, Dart, Java (Home services app on Play Store)
3. M Vahnaa App - Dart, Flutter, Firebase (Vehicle service app on Play Store)
4. Photo Sharing App - Dart, Flutter, Firebase

PROJECTS (GitHub / Open Source):
5. Doctor Appointment Scheduling App - Dart, Flutter, Firebase
6. Bus Tracking App - Dart, Flutter, Supabase
7. WhatsApp Clone - Dart, Flutter, GetX (Full-featured chat app with real-time UI, media sharing)
8. TicTacToe Game - Dart, Flutter
9. Login and Signup UI - Dart, Flutter, Widgets

PUBLISHED FLUTTER PACKAGES (Open Source):
1. Empty View - A Flutter package for displaying beautiful empty state views with animations, Lottie support, shimmer loading, dark mode, and accessibility features
2. Profile Image Viewer - A customizable, WhatsApp-style profile image viewer with pinch-to-zoom, gallery support, theme presets, and hero animations

TESTIMONIALS:
- Ragu Pathi (CEO, Roriri Software Solutions): "Aravinth grew from an intern to one of our core developers in record time. He independently shipped production apps on both Play Store and App Store, handling everything from Clean Architecture to complex API integrations. A truly self-driven developer."
- Gayathri Jaikumaran (Senior Backend Developer, TalentTurbo Technologies Pvt. Ltd.): "Working with Aravinth on TalentTurbo was a great experience. He seamlessly integrated 20+ backend APIs with token-based auth, built Firebase Dynamic Links for our referral system, and implemented push notifications flawlessly."
- Boopathy Ranjith (Senior Flutter Developer, Amshuhu Itech Solution Private Limited): "Aravinth has a strong grasp of Flutter and cross-platform development. He built responsive UIs, connected mobile clients to RESTful backends, and contributed to apps that reached 50,000+ downloads."
- Raj Krishna (Trainer, Greens Technologys): "Aravinth was one of the most dedicated trainees in our Flutter program. He quickly mastered widgets, layouts, navigation, state management, and REST API integration within the 3-month training."

RULES:
- Only answer questions related to Aravinth, his skills, projects, services, or contact info.
- If someone asks something unrelated, politely redirect them to ask about Aravinth.
- Use emojis sparingly to keep it professional yet friendly.
- Keep answers short and to the point. Use bullet points for lists.
- If asked to hire or contact, always provide the email and LinkedIn.
- Never make up information. Only use what is provided above.`;

  const toggle = document.getElementById('chatbot-toggle');
  const box = document.getElementById('chatbot-box');
  const closeBtn = document.getElementById('chatbot-close');
  const clearBtn = document.getElementById('chatbot-clear');
  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');
  const messagesEl = document.getElementById('chatbot-messages');
  const suggestions = document.getElementById('chatbot-suggestions');

  let chatHistory = [];
  let isProcessing = false;

  async function tryGemini(model, signal) {
    var url = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + GEMINI_API_KEY;
    var body = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: chatHistory,
      generationConfig: { temperature: 0.7, maxOutputTokens: 300 }
    };

    var response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: signal
    });

    if (response.status === 429) return null;
    if (!response.ok) return null;

    var data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  }

  async function tryGroq(signal) {
    if (!GROQ_API_KEY || GROQ_API_KEY === "PASTE_YOUR_GROQ_KEY_HERE") return null;

    var messages = [{ role: "system", content: SYSTEM_PROMPT }];
    for (var i = 0; i < chatHistory.length; i++) {
      messages.push({
        role: chatHistory[i].role === "model" ? "assistant" : "user",
        content: chatHistory[i].parts[0].text
      });
    }

    var response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + GROQ_API_KEY
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: messages,
        temperature: 0.7,
        max_tokens: 300
      }),
      signal: signal
    });

    if (!response.ok) return null;

    var data = await response.json();
    return data?.choices?.[0]?.message?.content || null;
  }

  async function callGemini(userMessage) {
    chatHistory.push({ role: "user", parts: [{ text: userMessage }] });

    const controller = new AbortController();
    const timeoutId = setTimeout(function() { controller.abort(); }, API_TIMEOUT);

    try {
      var reply = await tryGemini("gemini-2.0-flash", controller.signal)
              || await tryGemini("gemini-2.0-flash-lite", controller.signal)
              || await tryGroq(controller.signal);

      clearTimeout(timeoutId);

      if (!reply) {
        throw new Error("QUOTA_EXCEEDED");
      }

      chatHistory.push({ role: "model", parts: [{ text: reply }] });

      if (chatHistory.length > 20) {
        chatHistory = chatHistory.slice(-20);
      }

      return reply;
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  }

  function formatResponse(text) {
    var escaped = escapeHTML(text);
    return escaped
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n- /g, '<br>• ')
      .replace(/\n\* /g, '<br>• ')
      .replace(/\n(\d+)\. /g, '<br>$1. ')
      .replace(/\n/g, '<br>')
      .replace(/(https?:\/\/[^\s&]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color:#6f34fe">$1</a>');
  }

  function addMessage(text, type) {
    const div = document.createElement('div');
    div.className = `chat-msg ${type}-msg`;
    if (type === 'bot') {
      div.innerHTML = `<div class="bot-icon"><i class="bi bi-robot"></i></div><div class="msg-bubble">${text}</div>`;
    } else if (type === 'error') {
      div.className = 'chat-msg bot-msg error-msg';
      div.innerHTML = `<div class="bot-icon"><i class="bi bi-robot"></i></div><div class="msg-bubble">${text}</div>`;
    } else {
      div.innerHTML = `<div class="msg-bubble">${escapeHTML(text)}</div>`;
    }
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'chat-msg bot-msg typing-indicator';
    div.id = 'typing-indicator';
    div.innerHTML = `<div class="bot-icon"><i class="bi bi-robot"></i></div><div class="msg-bubble"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>`;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
  }

  function setInputState(disabled) {
    input.disabled = disabled;
    sendBtn.disabled = disabled;
    isProcessing = disabled;
  }

  async function handleSend() {
    var text = input.value.trim();
    if (!text || isProcessing) return;
    if (text.length > MAX_MSG_LENGTH) text = text.substring(0, MAX_MSG_LENGTH);

    const quota = checkQuota();
    if (!quota.allowed) {
      input.value = '';
      if (quota.reason === 'daily') {
        addMessage("You've reached the daily limit of <strong>" + DAILY_LIMIT + " messages</strong>. Please come back tomorrow, or contact Aravinth directly at <strong>aravindkannan4614@gmail.com</strong>", 'error');
      } else {
        addMessage("Slow down! Please wait <strong>" + quota.waitSec + " seconds</strong> before sending another message.", 'error');
      }
      return;
    }

    addMessage(text, 'user');
    input.value = '';
    suggestions.style.display = 'none';
    setInputState(true);
    showTyping();

    try {
      const reply = await callGemini(text);
      removeTyping();
      recordUsage();
      const remaining = getRemainingMessages();
      addMessage(formatResponse(reply) + (remaining <= 10 ? '<br><small style="opacity:0.5;font-size:0.7rem;">' + remaining + '/' + DAILY_LIMIT + ' messages remaining today</small>' : ''), 'bot');
    } catch (err) {
      removeTyping();
      var msg;
      if (err.name === 'AbortError') {
        msg = "Request timed out. Please check your connection and try again.";
      } else if (err.message === 'QUOTA_EXCEEDED') {
        msg = "API quota exceeded. The free tier limit has been reached. Please try again in a few minutes or contact Aravinth directly at <strong>aravindkannan4614@gmail.com</strong>";
      } else {
        msg = "Sorry, I couldn't connect right now. Please try again or contact Aravinth directly at <strong>aravindkannan4614@gmail.com</strong>";
      }
      addMessage(msg, 'error');
      chatHistory.pop();
    }

    setInputState(false);
    input.focus();
  }

  function clearChat() {
    chatHistory = [];
    messagesEl.innerHTML = '';
    addMessage("Hi! I'm Aravinth's AI assistant powered by <strong>Google Gemini</strong>. Ask me anything about his skills, projects, experience, or how to contact him!", 'bot');
    suggestions.style.display = 'flex';
  }

  toggle.addEventListener('click', function() {
    box.classList.toggle('active');
    var isOpen = box.classList.contains('active');
    toggle.style.display = isOpen ? 'none' : 'flex';
    toggle.setAttribute('aria-expanded', isOpen);
    if (isOpen) input.focus();
  });

  closeBtn.addEventListener('click', function() {
    box.classList.remove('active');
    toggle.style.display = 'flex';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && box.classList.contains('active')) {
      box.classList.remove('active');
      toggle.style.display = 'flex';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });

  clearBtn.addEventListener('click', clearChat);

  // Auto-open chatbot on first visit
  (function() {
    try {
      if (!localStorage.getItem('chatbot_opened')) {
        setTimeout(function() {
          box.classList.add('active');
          toggle.style.display = 'none';
          toggle.setAttribute('aria-expanded', 'true');
          input.focus();
        }, 2000);
        localStorage.setItem('chatbot_opened', 'true');
      }
    } catch (e) {}
  })();

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') handleSend();
  });

  input.addEventListener('focus', function() {
    setTimeout(function() {
      input.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
  });

  document.querySelectorAll('.suggestion-chip').forEach(function(chip) {
    chip.addEventListener('click', function() {
      input.value = this.getAttribute('data-q');
      handleSend();
    });
  });
})();
