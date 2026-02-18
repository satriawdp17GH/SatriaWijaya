// ============================================
// LOADING SCREEN — NEW CYBER MATRIX
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");
  const counter = document.getElementById("counter");
  const progressBar = document.getElementById("progressBar");
  const statusEl = document.getElementById("loader-status");

  // Status messages sesuai progress
  const statusMessages = [
    { pct: 0, msg: "Initializing system..." },
    { pct: 15, msg: "Loading assets..." },
    { pct: 30, msg: "Compiling stylesheets..." },
    { pct: 50, msg: "Building components..." },
    { pct: 70, msg: "Fetching data..." },
    { pct: 85, msg: "Finalizing portfolio..." },
    { pct: 98, msg: "Almost ready!" },
  ];

  // ── Matrix Rain Effect ──
  const canvas = document.getElementById("matrix-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = "01アイウエオカキクケコサシスセ</>{}[]()#$%";
  const fontSize = 14;
  const cols = Math.floor(canvas.width / fontSize);
  const drops = Array(cols).fill(1);
  const colors = ["#00d4ff", "#7b2ff7", "#ff006e", "rgba(255,255,255,0.6)"];

  function drawMatrix() {
    ctx.fillStyle = "rgba(10, 1, 24, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillStyle = color;
      ctx.font = fontSize + "px monospace";
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  const matrixInterval = setInterval(drawMatrix, 50);

  // ── Progress Counter ──
  let count = 0;

  const interval = setInterval(() => {
    count++;
    counter.textContent = count;
    progressBar.style.width = count + "%";

    // Update status text
    for (let i = statusMessages.length - 1; i >= 0; i--) {
      if (count >= statusMessages[i].pct) {
        statusEl.textContent = statusMessages[i].msg;
        break;
      }
    }

    if (count === 100) {
      clearInterval(interval);
      clearInterval(matrixInterval);
      statusEl.textContent = "Welcome! 🚀";

      setTimeout(() => {
        loader.classList.add("fade-out");
        setTimeout(() => {
          loader.style.display = "none";
          mainContent.classList.add("show");
          startTypingAnimation();
        }, 800);
      }, 400);
    }
  }, 20);

  // Resize canvas on window resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});

// ============================================
// TYPING ANIMATION FOR HERO
// ============================================
function startTypingAnimation() {
  const text = "Halo, Saya Satria Wijaya Dwi Prayogo - Web Developer.";
  const typingElement = document.getElementById("typingText");
  let index = 0;

  typingElement.textContent = "";

  function type() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 80);
    }
  }

  type();
}

// ============================================
// PROJECT FILTER FUNCTIONALITY
// ============================================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projectItems.forEach((item) => {
      const categories = item.getAttribute("data-category").split(" ");
      let shouldShow = filter === "all" || categories.includes(filter);

      if (shouldShow) {
        item.style.display = "block";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
        }, 10);
      } else {
        item.style.opacity = "0";
        item.style.transform = "scale(0.8)";
        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  });
});

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
    }
  });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(10, 1, 24, 0.98)";
    navbar.style.boxShadow = "0 8px 32px rgba(0, 212, 255, 0.3)";
  } else {
    navbar.style.background = "rgba(10, 1, 24, 0.8)";
    navbar.style.boxShadow = "0 8px 32px rgba(0, 212, 255, 0.15)";
  }
});

// ============================================
// SCROLL ANIMATION FOR ELEMENTS
// ============================================
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".skill-card, .achievement-card, .project-card, .cv-card",
  );
  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < window.innerHeight - 100) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

document
  .querySelectorAll(".skill-card, .achievement-card, .project-card, .cv-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
  });

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// ============================================
// CV DOWNLOAD FUNCTIONALITY
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  const downloadBtn = document.getElementById("downloadCvBtn");

  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      const originalHtml = this.innerHTML;

      this.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i><span>Downloading...</span>';
      this.style.pointerEvents = "none";

      setTimeout(() => {
        this.innerHTML = originalHtml;
        this.style.pointerEvents = "auto";
        showDownloadNotification();
      }, 1500);
    });
  }
});

// ============================================
// DOWNLOAD SUCCESS NOTIFICATION
// ============================================
function showDownloadNotification() {
  document
    .querySelectorAll(".download-notification")
    .forEach((n) => n.remove());

  const notification = document.createElement("div");
  notification.className = "download-notification";
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-check-circle"></i>
      <span>CV berhasil diunduh! Periksa folder Downloads Anda.</span>
      <button class="notification-close"><i class="fas fa-times"></i></button>
    </div>
  `;

  notification.style.cssText = `
    position:fixed; top:20px; right:20px;
    background:linear-gradient(135deg,#00d4ff,#7b2ff7);
    color:white; padding:20px 30px; border-radius:15px;
    box-shadow:0 10px 40px rgba(0,212,255,0.5);
    z-index:9999; animation:slideIn 0.4s cubic-bezier(0.68,-0.55,0.265,1.55);
    font-weight:500; max-width:400px;
  `;

  document.body.appendChild(notification);

  notification
    .querySelector(".notification-close")
    .addEventListener("click", () => {
      notification.style.animation = "slideOut 0.3s ease-out";
      setTimeout(() => notification.remove(), 300);
    });

  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOut 0.3s ease-out";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// ============================================
// NOTIFICATION ANIMATIONS (injected)
// ============================================
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from { transform:translateX(120%); opacity:0; }
    to   { transform:translateX(0);   opacity:1; }
  }
  @keyframes slideOut {
    from { transform:translateX(0);   opacity:1; }
    to   { transform:translateX(120%); opacity:0; }
  }
  .notification-content {
    display:flex; align-items:center; gap:15px;
  }
  .notification-content i.fa-check-circle { font-size:24px; }
  .notification-close {
    background:rgba(255,255,255,0.2); border:none; color:white;
    cursor:pointer; width:30px; height:30px; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    transition:all 0.3s; margin-left:auto;
  }
  .notification-close:hover { background:rgba(255,255,255,0.3); transform:scale(1.1); }
`;
document.head.appendChild(style);

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log(
  "%c👋 Halo Developer!",
  "color:#00d4ff;font-size:24px;font-weight:bold;",
);
console.log(
  "%cTertarik dengan portfolio ini? Hubungi saya!",
  "color:#7b2ff7;font-size:14px;",
);
console.log("%c📧 Email: logichub122@gmail.com", "color:#fff;font-size:12px;");
console.log("%c📱 WhatsApp: +62 851-9492-8429", "color:#fff;font-size:12px;");
