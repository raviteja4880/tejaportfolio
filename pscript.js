// Navbar toggle
const menu = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

menu.onclick = () => {
  navbar.classList.toggle("active");
};

document.querySelectorAll(".navbar a").forEach(link => {
  link.onclick = () => {
    navbar.classList.remove("active");
  };
});

// Contact form
const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

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
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert("Message sent ✅");
        form.reset();
      } else {
        alert("Oops! Something went wrong ❌");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  });
}

function showTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.toggle-buttons .btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.${tabName}`).classList.add('active');
  event.currentTarget.classList.add('active');
}

// Animate skill bars
const skillBars = document.querySelectorAll(".progress-bar span");

function animateSkills() {
  skillBars.forEach(bar => {
    const targetWidth = bar.getAttribute("data-width");
    const barTop = bar.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (barTop < screenHeight - 50 && bar.style.width === "") {
      bar.style.width = targetWidth;
    }
  });
}

window.addEventListener("scroll", animateSkills);
