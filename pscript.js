let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  navbar.classList.toggle('active');
};

document.querySelectorAll('.navbar a').forEach(link => {
  link.onclick = () => {
    navbar.classList.remove('active');
  };
});
