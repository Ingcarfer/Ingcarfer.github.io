/**
 * CARLOS FERNÁNDEZ (ingcarfer) - PORTFOLIO INTERACTIVITY
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Interactive Ambient Mouse Glow
  const mouseGlow = document.getElementById('mouse-glow');
  if (mouseGlow && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateGlow = () => {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;
      mouseGlow.style.left = `${currentX}px`;
      mouseGlow.style.top = `${currentY + window.scrollY}px`;
      requestAnimationFrame(animateGlow);
    };
    animateGlow();
  } else if (mouseGlow) {
    mouseGlow.style.display = 'none';
  }

  // 3. Navbar Scrolled State
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('shadow-xl', 'bg-dark/90', 'border-slate-800');
      navbar.classList.remove('bg-dark/70', 'border-white/5');
    } else {
      navbar.classList.remove('shadow-xl', 'bg-dark/90', 'border-slate-800');
      navbar.classList.add('bg-dark/70', 'border-white/5');
    }
  });

  // 4. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconBars = document.getElementById('menu-icon-bars');
  const iconClose = document.getElementById('menu-icon-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileBtn && mobileMenu) {
    const toggleMobileMenu = (forceState) => {
      const willOpen = typeof forceState === 'boolean' 
        ? forceState 
        : mobileMenu.classList.contains('hidden');

      if (willOpen) {
        mobileMenu.classList.remove('hidden');
        if (iconBars) iconBars.classList.add('hidden');
        if (iconClose) iconClose.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        if (iconBars) iconBars.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
      }
    };

    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMobileMenu(false);
      });
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
        toggleMobileMenu(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        toggleMobileMenu(false);
      }
    });
  }

  // 5. Active Section Highlighting on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    const scrollY = window.pageYOffset + 140;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav);

  // 6. Copy Email to Clipboard with Toast Notification
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('email-text');
  const copyLabel = document.getElementById('copy-btn-label');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  const showToast = (message) => {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 2800);
  };

  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', async () => {
      const email = emailText.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        copyLabel.textContent = '¡Copiado!';
        copyBtn.classList.add('bg-emerald-400');
        showToast('¡Correo copiado al portapapeles!');

        setTimeout(() => {
          copyLabel.textContent = 'Copiar';
          copyBtn.classList.remove('bg-emerald-400');
        }, 2200);
      } catch (err) {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('¡Correo copiado!');
      }
    });
  }

  // 7. Copy Reference Phone Number to Clipboard with Toast Notification
  const copyPhoneBtn = document.getElementById('copy-ref-phone-btn');
  const refPhoneText = document.getElementById('ref-phone-text');
  const copyPhoneLabel = document.getElementById('copy-ref-phone-label');

  if (copyPhoneBtn || refPhoneText) {
    const copyPhoneAction = async () => {
      const phoneNumber = '3176408175';
      try {
        await navigator.clipboard.writeText(phoneNumber);
        if (copyPhoneLabel) copyPhoneLabel.textContent = '¡Copiado!';
        if (copyPhoneBtn) copyPhoneBtn.classList.add('bg-emerald-500/30', 'text-white');
        showToast('¡Teléfono de contacto copiado al portapapeles!');

        setTimeout(() => {
          if (copyPhoneLabel) copyPhoneLabel.textContent = 'Copiar';
          if (copyPhoneBtn) copyPhoneBtn.classList.remove('bg-emerald-500/30', 'text-white');
        }, 2200);
      } catch (err) {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = phoneNumber;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('¡Teléfono copiado!');
      }
    };

    if (copyPhoneBtn) {
      copyPhoneBtn.addEventListener('click', copyPhoneAction);
    }
    if (refPhoneText) {
      refPhoneText.addEventListener('click', copyPhoneAction);
    }
  }

  // 8. Copy Personal Contact Phone Number to Clipboard with Toast Notification
  const copyContactPhoneBtn = document.getElementById('copy-contact-phone-btn');
  const contactPhoneText = document.getElementById('contact-phone-text');
  const copyContactPhoneLabel = document.getElementById('copy-contact-phone-label');

  if (copyContactPhoneBtn || contactPhoneText) {
    const copyContactPhoneAction = async () => {
      const phoneNumber = '3178546723';
      try {
        await navigator.clipboard.writeText(phoneNumber);
        if (copyContactPhoneLabel) copyContactPhoneLabel.textContent = '¡Copiado!';
        if (copyContactPhoneBtn) copyContactPhoneBtn.classList.add('bg-cyan-400');
        showToast('¡Teléfono copiado al portapapeles!');

        setTimeout(() => {
          if (copyContactPhoneLabel) copyContactPhoneLabel.textContent = 'Copiar';
          if (copyContactPhoneBtn) copyContactPhoneBtn.classList.remove('bg-cyan-400');
        }, 2200);
      } catch (err) {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = phoneNumber;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('¡Teléfono copiado!');
      }
    };

    if (copyContactPhoneBtn) {
      copyContactPhoneBtn.addEventListener('click', copyContactPhoneAction);
    }
    if (contactPhoneText) {
      contactPhoneText.addEventListener('click', copyContactPhoneAction);
    }
  }

  // 9. Copy Demo Credentials with Toast Notification
  const copyCredButtons = document.querySelectorAll('.copy-cred-btn');
  copyCredButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        btn.classList.add('bg-emerald-500/30', 'text-emerald-300');
        showToast(`¡Copiado: ${textToCopy}!`);

        setTimeout(() => {
          btn.classList.remove('bg-emerald-500/30', 'text-emerald-300');
        }, 1800);
      } catch (err) {
        const tempInput = document.createElement('input');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`¡Copiado: ${textToCopy}!`);
      }
    });
  });
});
