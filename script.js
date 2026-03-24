document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const formulario = document.getElementById("formulario");

  // Abre/fecha sidebar no mobile
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  // Fecha o menu ao clicar em um link no mobile
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900 && sidebar) {
        sidebar.classList.remove("open");
      }
    });
  });

  // Destaca o link da seção atual conforme o scroll
  const activateCurrentSection = () => {
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
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

  // Se sair do mobile, garante que a sidebar volte ao estado normal
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && sidebar) {
      sidebar.classList.remove("open");
    }
  });

  // Formulário de contato
  if (formulario) {
    formulario.addEventListener("submit", enviarMensagem);
  }
});

function enviarMensagem(event) {
  event.preventDefault();

  const nomeInput = document.getElementById("nome");
  const mensagemInput = document.getElementById("mensagem");

  const nome = nomeInput ? nomeInput.value.trim() : "";
  const mensagem = mensagemInput ? mensagemInput.value.trim() : "";
  const telefone = "5568999365536";

  if (!nome || !mensagem) {
    alert("Por favor, preencha seu nome e a mensagem antes de enviar.");
    return;
  }

  const texto = `Olá Elton! Me chamo ${nome}. ${mensagem}`;
  const msgFormatada = encodeURIComponent(texto);

  window.open(`https://wa.me/${telefone}?text=${msgFormatada}`, "_blank");

  if (nomeInput) nomeInput.value = "";
  if (mensagemInput) mensagemInput.value = "";
}