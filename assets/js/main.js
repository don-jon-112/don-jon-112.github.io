/* ===================================================================
   MAIN APPLICATION SCRIPT
   Interactive controls, 3D card tilt, GSAP reveals, and Modals
   =================================================================== */

// Global toast helper
window.showToast = function (message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

// Project Database for interactive Modal
const PROJECTS_DATABASE = {
  hybris_rewrite: {
    title: "Hybris-to-Spring Boot Core Rewrite",
    subtitle: "Enterprise API Migration & Kafka Streaming Backbone · AGIT",
    badge: "Enterprise Architecture & Core",
    stack: ["Spring Boot", "Java", "Apache Kafka", "Spring Security", "Password Migration (Argon2)", "Virtual Threads", "SAP Hybris", "PostgreSQL"],
    overview: "Strategic enterprise modernization at PT. Astra Graphia Information Technology (AGIT) replacing legacy monolithic SAP Hybris Commerce with modular, high-speed Spring Boot microservices on Java while maintaining zero system downtime.",
    contributions: [
      "Managing and directing developer squads on sprint milestones, architectural guidelines, and code review standards.",
      "Architecting the new high-availability Core System from the ground up using Spring Boot, Java, and Spring Data JPA.",
      "Migrating legacy Hybris APIs into high-throughput RESTful endpoints with sub-85ms response times.",
      "Exploring & architecting zero-friction password migration: decrypt-free just-in-time re-hashing from legacy Hybris cryptographic salts (PBKDF2/SHA) into modern Spring Security (Argon2id/BCrypt), preventing customer login disruptions.",
      "Implementing Apache Kafka event streaming to asynchronously replicate data, coordinate transactions, and migrate state between Hybris and Spring Boot without downtime."
    ],
    architecture: "Strangler Fig pattern powered by Apache Kafka topic partitions, Spring Boot microservices, and decoupled database clusters."
  },
  motorkux: {
    title: "Mango MotorkuX",
    subtitle: "Astra Motor Enterprise Digital Ecosystem · AGIT",
    badge: "Enterprise E-Commerce",
    stack: ["SAP Commerce (Hybris)", "Spring Boot", "Google Maps API", "Redis", "RESTful APIs"],
    overview: "Digital mobile and web ecosystem for Astra Motor customers across Indonesia. Empowering millions of users to book bike servicing, explore showroom inventories, and execute online purchases.",
    contributions: [
      "Engineered comprehensive checkout flow refactoring, reducing cart abandonment and improving checkout completion by 28%.",
      "Architected backend integration for the interactive Virtual Exhibition using Google Maps API for real-time dealer geolocation.",
      "Optimized global catalog search backend with high-speed indexing and Redis caching, cutting average query latency under 80ms.",
      "Implemented intelligent asset lazy loading and response payload compression across all client touchpoints."
    ],
    architecture: "SAP Commerce Core with Spring Boot custom microservice proxy, high-performance Redis cache, Google Maps Places API proxy."
  },
  digiroom: {
    title: "Oddyseus Digiroom",
    subtitle: "Auto2000 Automotive Digital Platform · AGIT",
    badge: "Enterprise E-Commerce",
    stack: ["SAP Hybris", "Java 11", "Spring Boot", "Apache PDFBox", "Microservices"],
    overview: "The digital showroom for Indonesia's largest Toyota dealership network (Auto2000). Features end-to-end car sales, servicing scheduling, and automated inquiry distribution.",
    contributions: [
      "Designed real-time customer inquiry backend microservice, seamlessly dispatching leads to localized dealer CRM pipelines.",
      "Developed high-throughput PDF generation engine capable of dynamically rendering automated official purchase e-certificates.",
      "Built PLP (Product Listing Page) dual-color dynamic vehicle preview logic connecting frontend and Hybris catalog.",
      "Hardened API security and implemented graceful fallbacks for third-party loan simulation calculators."
    ],
    architecture: "Decoupled architecture connecting Hybris Commerce backend with dealer CRM and automated document rendering service."
  },
  seva: {
    title: "SEVA Platform",
    subtitle: "Astra Digital High-Volume Automotive Marketplace · AGIT",
    badge: "Enterprise E-Commerce",
    stack: ["Java", "Spring Boot", "Backoffice Customization", "Google Tag Manager", "PostgreSQL"],
    overview: "A flagship financing and vehicle marketplace by Astra International that pairs smart financial readiness with vehicle selection.",
    contributions: [
      "Customized SAP Hybris Backoffice modules, providing operations and customer relationship teams with bespoke workflow tools.",
      "Integrated end-to-end event analytics trackers with Google Analytics and Google Tag Manager for deep conversion telemetry.",
      "Constructed automated data validation rules preventing invalid loan applications from hitting downstream financing systems."
    ],
    architecture: "Event-driven backoffice extension integrated with enterprise marketing stacks and loan approval services."
  },
  jayana: {
    title: "Jayana Retail ERP & POS",
    subtitle: "Multi-Store Retail POS & Sales Ecosystem · Nibble Softworks",
    badge: "ERP & Systems",
    stack: ["Odoo 12", "Python", "Flutter", "PostgreSQL", "XML-RPC APIs"],
    overview: "End-to-end retail and inventory automation platform connecting physical retail points of sale with centralized backend accounting and warehouses.",
    contributions: [
      "Configured multi-warehouse inventory tracking and automated restock triggers in Odoo 12.",
      "Developed cross-platform mobile POS cashier application using Flutter communicating via secure XML-RPC APIs.",
      "Implemented offline transaction queueing allowing stores to continue sales during network outages with auto-sync."
    ],
    architecture: "Odoo Python ORM backend paired with high-performance Flutter mobile client and local SQLite sync queue."
  },
  femina: {
    title: "Femina Group Information System",
    subtitle: "Media Publishing & Financial ERP · Nibble Softworks",
    badge: "ERP & Systems",
    stack: ["Odoo 12", "Python", "PostgreSQL", "QWeb Reporting"],
    overview: "Custom ERP modernization for a prominent Indonesian media publishing house, replacing legacy paper invoices with automated fiscal workflows and audit-ready reporting.",
    contributions: [
      "Engineered automated invoicing workflows and custom QWeb PDF reporting tailored to Indonesian tax regulations.",
      "Customized publication subscription tracking and multi-period revenue recognition modules.",
      "Conducted extensive data migration and ledger verification ensuring 100% financial balance integrity."
    ],
    architecture: "Odoo 12 Python backend with custom financial models and relational PostgreSQL persistence."
  },
  cipta_dlab: {
    title: "Cipta D.Lab Enterprise System",
    subtitle: "Clinical Diagnostic Laboratory Management · Nibble Softworks",
    badge: "ERP & Systems",
    stack: ["Odoo 10", "Python", "PostgreSQL", "Medical Workflow Customization"],
    overview: "Tailor-made clinical information system for medical diagnostic laboratories managing patient test requisitions, automated lab instrument results, and billing.",
    contributions: [
      "Customized Odoo 10 medical diagnostic workflow modules and specimen status tracking.",
      "Engineered automated barcode tracking and diagnostic report generation.",
      "Implemented strict role-based data security ensuring patient medical confidentiality."
    ],
    architecture: "Customized Odoo business objects with relational models and automated diagnostic report pipelines."
  },
  sinar_harapan: {
    title: "Sinar Harapan Distribution System",
    subtitle: "Enterprise Distribution & Logistics ERP · Nibble Softworks",
    badge: "ERP & Systems",
    stack: ["Odoo ERP", "Python", "PostgreSQL", "Supply Chain Logistics"],
    overview: "Comprehensive distribution and inventory automation platform managing warehouse stock movements, purchase order approvals, and invoice reconciliations.",
    contributions: [
      "Configured multi-location inventory restock triggers and supplier validation rules.",
      "Built automated vendor billing reconciliations and inventory valuation reporting.",
      "Delivered intuitive interfaces for warehouse floor operations staff."
    ],
    architecture: "Multi-branch ERP database configured for rapid inventory valuation and purchase journal automation."
  },
  ursulin: {
    title: "Ursulin Indonesia CMS Portal",
    subtitle: "Centralized Institutional Content Management · Nibble Softworks",
    badge: "Web & Institutional Platforms",
    stack: ["OctoberCMS", "PHP", "MySQL", "JavaScript", "HTML5/CSS3"],
    overview: "Multi-branch institutional web portal serving educational, social, and archival activities for Ursulin institutions across Indonesia.",
    contributions: [
      "Architected custom OctoberCMS modular plugins for publishing branch announcements, events, and galleries.",
      "Engineered responsive, accessible frontend layouts optimized for low-bandwidth mobile devices.",
      "Implemented secure content moderation and role-based publishing workflows for community coordinators."
    ],
    architecture: "Modular MVC architecture powered by OctoberCMS and MySQL relational schemas."
  },
  nibble_web: {
    title: "Nibble Softworks Corporate Website",
    subtitle: "Agency Profile & Client Acquisition Platform · Nibble Softworks",
    badge: "Web & Institutional Platforms",
    stack: ["Odoo 12 Website", "Python", "JavaScript", "Bootstrap"],
    overview: "Corporate digital presence for Nibble Softworks highlighting software development services, portfolio case studies, and client lead generation funnels.",
    contributions: [
      "Engineered dynamic case study showcase modules integrated into Odoo CRM lead pipelines.",
      "Developed custom responsive front-end blocks and contact inquiry routing.",
      "Optimized page speed and SEO metadata for technology consulting keywords."
    ],
    architecture: "Odoo 12 CMS paired with CRM pipeline automation."
  },
  simaru: {
    title: "SIMARU Catalog System",
    subtitle: "Enterprise Product & Asset Catalog · Nibble Softworks",
    badge: "Web & Institutional Platforms",
    stack: ["ReactJS", "Node.js", "Sequelize ORM", "MySQL", "Express"],
    overview: "High-speed internal catalog system for managing institutional assets, hardware inventories, and room reservations.",
    contributions: [
      "Architected clean RESTful API layer with token-based role authentication and authorization policies.",
      "Built responsive, accessible ReactJS single-page frontend with instant client-side filtering and sorting.",
      "Reduced database query overhead using Sequelize eager-loading optimizations and indexed foreign keys."
    ],
    architecture: "N-tier architecture with Express API gateway, Sequelize ORM data persistence, and React SPA client."
  },
  unpar_thesis: {
    title: "UNPAR Thesis & Curriculum System",
    subtitle: "Academic Milestone & Learning Outcomes Platform · UNPAR",
    badge: "Web & Institutional Platforms",
    stack: ["PHP", "JavaScript", "MySQL", "Bootstrap", "Git"],
    overview: "Academic workflow system tracking student thesis defenses, supervisor approvals, and accreditation learning outcome matrices at Parahyangan Catholic University.",
    contributions: [
      "Developed thesis progress milestone tracking and supervisor appointment scheduling.",
      "Implemented learning outcome rubrics and faculty evaluation aggregation algorithms.",
      "Engineered role-based access control (RBAC) and document submission workflows for faculty and undergraduate students."
    ],
    architecture: "Relational database schema with role-based faculty and student authentication."
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Custom Cursor Tracker (Window arrow hidden via CSS, custom dot & ring only)
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorRing = document.querySelector('.custom-cursor-ring');

  if (cursorDot && cursorRing) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const interactables = document.querySelectorAll('a, button, input, textarea, .project-card, .bento-card, .arch-node, .quick-cmd-btn');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // 3. 3D Tilt Effect on Portrait & Cards
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(y / (rect.height / 2)) * 8;
      const rotateY = (x / (rect.width / 2)) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // 4. Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Project Modal Logic
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openProjectModal(key) {
    const data = PROJECTS_DATABASE[key];
    if (!data || !modalOverlay) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-subtitle').textContent = data.subtitle;
    document.getElementById('modal-badge').textContent = data.badge;
    document.getElementById('modal-overview').textContent = data.overview;
    document.getElementById('modal-architecture').textContent = data.architecture;

    const bulletsContainer = document.getElementById('modal-bullets');
    bulletsContainer.innerHTML = data.contributions.map(c => `
      <li style="position:relative; padding-left:20px; margin-bottom:8px; color:var(--text-secondary); font-size:0.92rem;">
        <span style="position:absolute; left:0; color:var(--accent-cyan);">▹</span>
        ${c}
      </li>
    `).join('');

    const stackContainer = document.getElementById('modal-stack');
    stackContainer.innerHTML = data.stack.map(s => `
      <span class="skill-tag">${s}</span>
    `).join('');

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-project');
      openProjectModal(key);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeProjectModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });

  // 6. Mobile Drawer Navigation
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
    });
  }

  if (mobileDrawerClose && mobileDrawer) {
    mobileDrawerClose.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer) mobileDrawer.classList.remove('open');
    });
  });

  // 7. Copy Email Button
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || "jonathan.alva97@yahoo.com";
      navigator.clipboard.writeText(email).then(() => {
        window.showToast("📋 Email copied: " + email);
      }).catch(() => {
        window.showToast("Email: " + email);
      });
    });
  });

  // 8. Contact Form Handling (100% Free Direct Delivery to jonathan.alva97@yahoo.com)
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        window.showToast("⚠️ Please fill out all fields.");
        return;
      }

      const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '<span>Send Message</span>';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending Message...</span>';
      }

      window.showToast("⏳ Delivering message to Jonathan's inbox...");

      try {
        // Direct free AJAX submission via FormSubmit to jonathan.alva97@yahoo.com
        const res = await fetch("https://formsubmit.co/ajax/jonathan.alva97@yahoo.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            _subject: `New Portfolio Inquiry from ${name}`,
            _template: "table"
          })
        });

        const data = await res.json();

        if (res.ok || data.success === "true" || data.success === true) {
          window.showToast("✅ Message delivered successfully to jonathan.alva97@yahoo.com!");
          if (submitBtn) submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
          contactForm.reset();
          setTimeout(() => {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnHTML;
            }
          }, 3500);
        } else {
          throw new Error(data.message || "Failed to submit");
        }
      } catch (err) {
        console.warn("Direct form API unavailable, falling back to mail client:", err);
        // Seamless fallback to mailto so the user's message is never lost
        const subject = encodeURIComponent(`Inquiry from ${name} (Portfolio)`);
        const body = encodeURIComponent(`Hi Jonathan,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from Portfolio Website`);
        window.location.href = `mailto:jonathan.alva97@yahoo.com?subject=${subject}&body=${body}`;
        window.showToast("🚀 Opened email draft directly to jonathan.alva97@yahoo.com");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }
      }
    });
  }

  // 9. GSAP Animations (If loaded)
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-content > *', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out'
    });

    gsap.from('.hero-visual', {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out'
    });

    gsap.utils.toArray('.bento-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 25,
        duration: 0.6,
        delay: (i % 3) * 0.1,
        ease: 'power2.out'
      });
    });

    gsap.utils.toArray('.timeline-item').forEach((item) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -30,
        duration: 0.7,
        ease: 'power2.out'
      });
    });

    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: (i % 2) * 0.1,
        ease: 'power2.out'
      });
    });
  }

  // 10. Smart Section Snapper (Direct jump on short sections, smooth continuous scrolling on long sections)
  function initSmartSectionSnapper() {
    const snapSections = [
      document.querySelector('#hero'),
      document.querySelector('#about'),
      document.querySelector('#architecture'),
      document.querySelector('#experience'),
      document.querySelector('#projects'),
      document.querySelector('#terminal'),
      document.querySelector('#contact'),
      document.querySelector('footer')
    ].filter(Boolean);

    if (snapSections.length === 0) return;

    let isSnapping = false;
    let snapTimeout = null;
    const navOffset = 75; // Account for sticky navbar

    function snapTo(index) {
      if (index < 0 || index >= snapSections.length) return;
      isSnapping = true;
      const target = snapSections[index];
      const targetY = index === 0 ? 0 : Math.max(0, target.offsetTop - navOffset);
      
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });

      clearTimeout(snapTimeout);
      snapTimeout = setTimeout(() => {
        isSnapping = false;
      }, 700);
    }

    // When clicking anchor links (e.g. navbar), pause wheel snapping temporarily
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', () => {
        isSnapping = true;
        clearTimeout(snapTimeout);
        snapTimeout = setTimeout(() => {
          isSnapping = false;
        }, 900);
      });
    });

    // Detect current section index based on scroll position
    function getCurrentSectionIndex() {
      const scrollY = window.scrollY;
      
      for (let i = 0; i < snapSections.length; i++) {
        const sec = snapSections[i];
        const secTop = sec.offsetTop - navOffset;
        const secBottom = secTop + sec.offsetHeight;
        
        if (scrollY >= secTop - 30 && scrollY < secBottom - 30) {
          return i;
        }
      }
      return 0;
    }

    // Intercept mouse wheel / trackpad
    window.addEventListener('wheel', (e) => {
      // Allow internal scrolling in modals, terminal, inputs
      if (e.target.closest('#terminal-output, .modal-container, textarea, input')) {
        return;
      }

      // If already snapping to a section, prevent inertial jank
      if (isSnapping) {
        e.preventDefault();
        return;
      }

      // Filter out tiny micro-scroll twitches (require deliberate scroll)
      if (Math.abs(e.deltaY) < 18) {
        return;
      }

      const currentIndex = getCurrentSectionIndex();
      const currentSec = snapSections[currentIndex];
      if (!currentSec) return;

      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const secHeight = currentSec.offsetHeight;
      const secTop = currentSec.offsetTop - navOffset;
      const secBottom = secTop + secHeight;

      // Is this section taller than the visible viewport?
      const isLongSection = secHeight > (vh - navOffset + 80);

      if (e.deltaY > 0) {
        // Scrolling DOWN
        if (isLongSection) {
          // Check if user has scrolled to or near the bottom of this long section
          const distanceToSectionBottom = secBottom - (scrollY + vh);
          if (distanceToSectionBottom > 50) {
            // User hasn't reached the end of this long section yet: allow normal/slow scrolling!
            return;
          }
        }
        
        // At the bottom of long section OR on normal section: snap to next section!
        if (currentIndex < snapSections.length - 1) {
          e.preventDefault();
          snapTo(currentIndex + 1);
        }
      } else {
        // Scrolling UP
        if (isLongSection) {
          // Check if user has scrolled to or near the top of this long section
          const distanceToSectionTop = scrollY - secTop;
          if (distanceToSectionTop > 50) {
            // User is in the middle/bottom of this long section: allow normal/slow scrolling upwards!
            return;
          }
        }

        // At the top of long section OR on normal section: snap to previous section!
        if (currentIndex > 0) {
          e.preventDefault();
          snapTo(currentIndex - 1);
        }
      }
    }, { passive: false });

    // Keyboard support: ArrowDown, ArrowUp, PageDown, PageUp
    window.addEventListener('keydown', (e) => {
      if (e.target.closest('input, textarea, #terminal-input')) return;
      if (isSnapping) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        const idx = getCurrentSectionIndex();
        const currentSec = snapSections[idx];
        const isLong = currentSec.offsetHeight > (window.innerHeight - navOffset + 80);
        const distanceBottom = (currentSec.offsetTop + currentSec.offsetHeight) - (window.scrollY + window.innerHeight);

        if (!isLong || distanceBottom <= 50) {
          if (idx < snapSections.length - 1) {
            e.preventDefault();
            snapTo(idx + 1);
          }
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        const idx = getCurrentSectionIndex();
        const currentSec = snapSections[idx];
        const isLong = currentSec.offsetHeight > (window.innerHeight - navOffset + 80);
        const distanceTop = window.scrollY - (currentSec.offsetTop - navOffset);

        if (!isLong || distanceTop <= 50) {
          if (idx > 0) {
            e.preventDefault();
            snapTo(idx - 1);
          }
        }
      }
    });
  }

  initSmartSectionSnapper();
});
