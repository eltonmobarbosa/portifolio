// Grade de fundo: segue o mouse (o CSS revela só um círculo em volta dele)
addEventListener("pointermove", (e) => {
  document.body.style.setProperty("--mx", e.clientX + "px");
  document.body.style.setProperty("--my", e.clientY + "px");
});

// Texto "decodificando": letras aleatórias que vão se resolvendo da esquerda pra direita
const glyphs = "!<>-_\/[]{}=+*^?#01";

function scramble(el) {
  const text = el.textContent;
  el.setAttribute("aria-label", text); // leitores de tela leem o texto final
  let frame = 0;
  const tick = () => {
    const done = frame / 3; // ~3 frames por letra
    el.textContent = [...text]
      .map((ch, i) => (ch === " " || i < done ? ch : glyphs[(Math.random() * glyphs.length) | 0]))
      .join("");
    if (done < text.length) { frame++; requestAnimationFrame(tick); }
  };
  tick();
}

if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  scramble(document.querySelector("h1"));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { scramble(entry.target); io.unobserve(entry.target); }
    });
  }, { threshold: 1 });
  document.querySelectorAll("h2").forEach((h) => io.observe(h));
}
