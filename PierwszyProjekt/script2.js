function updateclock() {
  const clockElement = document.getElementById("live-clock");
  if (!clockElement) return;
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateclock, 1000);
updateclock();

function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeButtonText(savedTheme);
}

function toggleTheme() {
  const currTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeButtonText(newTheme);
}

function updateThemeButtonText(theme) {
  const btn = document.getElementById("themeBtn");
  if (btn) {
    btn.textContent = theme === "light" ? "Jasny" : "Ciemny";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme(); // Inicjalizacja motywu przy starcie

  const themeBtn = document.getElementById("themeBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");
      const emailError = document.getElementById("emailError");
      const messageError = document.getElementById("messageError");
      const statusBox = document.getElementById("statusBox");

      let isValid = true;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailError.style.display = "block";
        emailInput.style.borderColor = "var(--error)";
        isValid = false;
      } else {
        emailError.style.display = "none";
        emailInput.style.borderColor = "var(--border-color)";
      }

      if (messageInput.value.trim().length < 10) {
        messageError.style.display = "block";
        messageError.textContent = "Wiadomość musi zawierać minimum 10 znaków";
        messageInput.style.borderColor = "var(--error)";
        isValid = false;
      } else {
        messageError.style.display = "none";
        messageInput.style.borderColor = "var(--border-color)";
      }

      if (isValid) {
        statusBox.className = "status-box status-box-success";
        statusBox.textContent =
          "Dziękujemy! Zapytanie zostało pomyślnie wysłane.";
        statusBox.style.display = "block";
        contactForm.reset();

        setTimeout(() => {
          statusBox.style.display = "none";
        }, 5000);
      }
    });
  }
});

function switchPage(pageName) {
  const pages = document.querySelectorAll(".page-content");
  pages.forEach((page) => {
    page.classList.add("hidden");
  });
  const targetPage = document.getElementById(`page-${pageName}`);
  if (targetPage) {
    targetPage.classList.remove("hidden");
  }

  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  const activeLink = document.getElementById(`nav-${pageName}`);
  if (activeLink) {
    activeLink.classList.add("active");
  }

  window.scrollTo(0, 0);
}

document.addEventListener("DOMContentLoaded", () => {
  const navTriggers = document.querySelectorAll(".nav-link");
  navTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const pageName = trigger.getAttribute("data-target");
      if (pageName) {
        switchPage(pageName);
      }
    });
  });
});
