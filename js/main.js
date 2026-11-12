// Botones de copiar: copian el texto de data-copy y muestran un aviso corto.
const toast = document.getElementById('toast');
let toastTimer;

function avisar(texto) {
  toast.textContent = texto;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

document.querySelectorAll('[data-copy]').forEach((boton) => {
  boton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(boton.dataset.copy);
      avisar('Copiado: ' + boton.dataset.copy);
    } catch {
      avisar('No se pudo copiar. Selecciona el texto y cópialo a mano.');
    }
  });
});
