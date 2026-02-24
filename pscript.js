// ========================= Navbar Toggle =========================
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const overlay = document.querySelector(".nav-overlay");
const header = document.querySelector(".header");

// Toggle mobile menu
menuIcon.onclick = () => {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  menuIcon.classList.toggle("bx-x");
};

// Close menu when clicking overlay
overlay.onclick = () => {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  menuIcon.classList.remove("bx-x");
};

// Close menu when clicking nav links
document.querySelectorAll(".navbar a").forEach(link => {
  link.onclick = () => {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    menuIcon.classList.remove("bx-x");
  };
});

// Header scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ========================= Scroll Reveal Animation =========================
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  
  reveals.forEach((element, index) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      const delay = element.dataset.delay || (index * 100);
      setTimeout(() => {
        element.classList.add("active");
      }, delay);
    }
  });
}

window.addEventListener("load", reveal);
window.addEventListener("scroll", reveal);

// ========================= Active Navigation Link =========================
const sections = document.querySelectorAll("section[id]");

function highlightNav() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.navbar a[href="#${sectionId}"]`);
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll(".navbar a").forEach(link => link.classList.remove("active"));
      if (navLink) navLink.classList.add("active");
    }
  });
}

window.addEventListener("scroll", highlightNav);

// ========================= Tab Functionality =========================
function showTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  document.querySelectorAll('.toggle-buttons .btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  document.querySelector(`.${tabName}`).classList.add('active');
  
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }
  
  if (tabName === 'skills-tab') {
    animateSkills();
  }
}

// ========================= Animate Skill Bars =========================
const skillBars = document.querySelectorAll(".progress-bar span");

function animateSkills() {
  skillBars.forEach((bar, index) => {
    const targetWidth = bar.getAttribute("data-width");
    const barTop = bar.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (barTop < screenHeight - 100) {
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, index * 150);
    }
  });
}

window.addEventListener("load", () => {
  setTimeout(animateSkills, 500);
});

window.addEventListener("scroll", animateSkills);

// ========================= Smooth Scroll =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================= Contact Form =========================
const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";
    submitBtn.style.opacity = "0.8";

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const response = await fetch(form.action, {
        method: form.method,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        submitBtn.innerText = "✓ Sent!";
        submitBtn.style.background = "linear-gradient(135deg, #10b981, #059669)";
        form.reset();
        
        setTimeout(() => {
          submitBtn.innerText = originalText;
          submitBtn.style.background = "";
          submitBtn.style.opacity = "1";
        }, 3000);
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      submitBtn.innerText = "✗ Failed";
      submitBtn.style.background = "linear-gradient(135deg, #ef4444, #dc2626)";
      
      setTimeout(() => {
        submitBtn.innerText = originalText;
        submitBtn.style.background = "";
        submitBtn.disabled = false;
      }, 3000);
    }
  });
}

// ========================= Typing Animation =========================
const typingText = document.querySelector('.typing-text');
const roles = ['Web Developer', 'Frontend Developer', 'MERN Stack Developer', 'UI/UX Enthusiast'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingText) return;
  
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let typeSpeed = isDeleting ? 50 : 100;
  
  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500;
  }
  
  setTimeout(typeEffect, typeSpeed);
}

if (typingText) {
  document.addEventListener('DOMContentLoaded', typeEffect);
}

// ========================= Current Year =========================
document.getElementById("year").textContent = new Date().getFullYear();

// ========================= Intersection Observer for Animations =========================
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    section.classList.add('reveal');
    section.dataset.delay = index * 100;
  });

  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    item.classList.add('reveal');
    item.dataset.delay = index * 150;
  });

  const skills = document.querySelectorAll('.skill');
  skills.forEach((skill, index) => {
    skill.classList.add('reveal');
    skill.dataset.delay = index * 100;
  });

  const projects = document.querySelectorAll('.project');
  projects.forEach((project, index) => {
    project.classList.add('reveal');
    project.dataset.delay = index * 150;
  });

  const certificates = document.querySelectorAll('.certificate-card');
  certificates.forEach((cert, index) => {
    cert.classList.add('reveal');
    cert.dataset.delay = index * 150;
  });
});

// ========================= Parallax Effect =========================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const homeImg = document.querySelector('.home-img img');
  
  if (homeImg && window.innerWidth > 768) {
    homeImg.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
});

// ========================= Preloader =========================
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
