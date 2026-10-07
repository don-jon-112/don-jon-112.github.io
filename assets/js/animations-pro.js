/* ===================================================================
   ADVANCED INTERACTIVE ANIMATIONS (UI/UX PRO MAX SUITE)
   Scramble Text, Magnetic Buttons, Spotlight Hover, Counter Rollup
   =================================================================== */

// 1. Text Scramble / Decrypt Animator
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20);
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span class="scramble-glyph">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Init Text Scramble on Hero Role
  const scrambleEl = document.getElementById('scramble-role');
  if (scrambleEl) {
    const fx = new TextScramble(scrambleEl);
    const phrases = [
      'Java & Spring Boot Team Lead',
      'SAP Hybris Commerce Developer',
      'Engineering Squad Lead @ AGIT',
      'Kafka & Microservices Architect',
      'Senior Software Engineer'
    ];
    let counter = 0;
    const nextPhrase = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(nextPhrase, 3200);
      });
      counter = (counter + 1) % phrases.length;
    };
    nextPhrase();
  }

  // Spotlight Mouse-Tracker for Cards
  const spotlightCards = document.querySelectorAll('.spotlight-card, .bento-card, .project-card, .timeline-card');
  spotlightCards.forEach((card) => {
    card.classList.add('spotlight-card');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Magnetic Button Physics
  const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-terminal, .btn-primary-sm');
  magneticButtons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // Numbers Counter Roll-Up Animation
  const metricNumbers = document.querySelectorAll('[data-counter-target]');
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetEl = entry.target;
            const targetValue = parseFloat(targetEl.getAttribute('data-counter-target'));
            const suffix = targetEl.getAttribute('data-counter-suffix') || '';
            const decimals = parseInt(targetEl.getAttribute('data-counter-decimals') || '0', 10);
            let current = 0;
            const duration = 1800;
            const startTime = performance.now();

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out cubic
              const ease = 1 - Math.pow(1 - progress, 3);
              current = ease * targetValue;

              targetEl.innerHTML = `${current.toFixed(decimals)}<span>${suffix}</span>`;

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                targetEl.innerHTML = `${targetValue.toFixed(decimals)}<span>${suffix}</span>`;
              }
            }

            requestAnimationFrame(updateCounter);
            observer.unobserve(targetEl);
          }
        });
      },
      { threshold: 0.5 }
    );

    metricNumbers.forEach((el) => counterObserver.observe(el));
  }
});
