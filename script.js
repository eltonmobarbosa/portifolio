document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const formulario = document.getElementById("formulario");

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        sidebar.classList.remove("open");
      }
    });
  });

  const activateCurrentSection = () => {
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");

      if (href === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", activateCurrentSection);
  activateCurrentSection();

  if (formulario) {
    formulario.addEventListener("submit", enviarMensagem);
  }
});

function enviarMensagem(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();
  const telefone = "5568999365536";

  if (!nome || !mensagem) {
    alert("Por favor, preencha seu nome e a mensagem antes de enviar.");
    return;
  }

  const texto = `Olá Elton! Me chamo ${nome}. ${mensagem}`;
  const msgFormatada = encodeURIComponent(texto);

  window.open(`https://wa.me/${telefone}?text=${msgFormatada}`, "_blank");
  document.getElementById("formulario").reset();
}