/* ===================================================================
   SENIOR DEVELOPER CLI TERMINAL (senior-dev-cli)
   Interactive terminal emulator for recruiters and engineers
   =================================================================== */

(function initTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');
  const terminalOutput = document.getElementById('terminal-output');
  const quickCmdBtns = document.querySelectorAll('.quick-cmd-btn');

  if (!terminalInput || !terminalOutput) return;

  const COMMANDS = {
    help: () => `
<div class="term-dim">Available commands in Jonathan Alva's environment:</div>
<div>  <span class="term-cmd">whoami</span>       - Executive summary & current Team Lead mission</div>
<div>  <span class="term-cmd">skills</span>       - Core tech stack & enterprise proficiencies</div>
<div>  <span class="term-cmd">projects</span>     - Key architecture and enterprise projects delivered</div>
<div>  <span class="term-cmd">experience</span>   - Career history & technical journey</div>
<div>  <span class="term-cmd">migration</span>    - Deep dive into Hybris-to-Spring Boot & Kafka strategy</div>
<div>  <span class="term-cmd">architecture</span> - Engineering philosophy on high throughput & scalability</div>
<div>  <span class="term-cmd">contact</span>      - Direct communication channels & email</div>
<div>  <span class="term-cmd">sudo hire</span>    - Initiate collaboration protocol</div>
<div>  <span class="term-cmd">clear</span>        - Clean terminal display buffer</div>
`,
    whoami: () => `
<div class="term-success">Jonathan Alva | Java & Spring Boot Team Lead</div>
<div>• Current Role: Team Lead at PT. Astra Graphia Information Technology (AGIT)</div>
<div>• Location: Jakarta, Indonesia</div>
<div>• Core Mission: Managing developer squads to rewrite legacy SAP Hybris using modern Spring Boot & Java, migrating Hybris APIs, building the high-speed Core System, and leveraging Apache Kafka for zero-downtime event streaming migration.</div>
<div>• Education: B.S. in Computer Science from Parahyangan Catholic University (UNPAR), GPA 3.56</div>
`,
    skills: () => `
<div class="term-info">=== TECHNICAL COMPETENCIES MATRIX ===</div>
<div>[Core Backend]     Java, Spring Boot, Spring Data JPA, Hibernate, SAP Commerce (Hybris)</div>
<div>[Modernization]    Hybris-to-Spring Boot Rewrite, Legacy API Migration, Core System Architecture</div>
<div>[Event & Message]  Apache Kafka (Event Streaming, Partitions, Consumer Groups, Schema Registry)</div>
<div>[Data & Caching]   PostgreSQL, MySQL, Redis, Ehcache, Oracle DB</div>
<div>[ERP & Python]     Odoo 10/12, Python, Business Workflow Customization</div>
<div>[Leadership]       Developer Management, Sprint Milestones, Architecture Reviews, Code Audits</div>
<div>[Networking/Ops]   Cisco CCNA Certified, Linux System Administration, Docker, Git, CI/CD</div>
`,
    projects: () => `
<div class="term-info">=== FEATURED PRODUCTION SYSTEMS ===</div>
<div>1. <span class="term-cmd">Hybris-to-Spring Boot Core Rewrite</span> (AGIT) - Developer management, API migration, Kafka event pipeline</div>
<div>2. <span class="term-cmd">Mango MotorkuX</span> (Astra Motor) - Checkout optimization & virtual exhibition backend</div>
<div>3. <span class="term-cmd">Oddyseus Digiroom</span> (Auto2000) - Real-time inquiry pipeline & dynamic e-cert engine</div>
<div>4. <span class="term-cmd">SEVA Platform</span> (Astra Digital) - High-volume automotive marketplace backoffice & analytics</div>
<div>5. <span class="term-cmd">Jayana Retail POS</span> (Nibble Softworks) - Odoo 12 ERP & Flutter cashier application</div>
<div>6. <span class="term-cmd">Femina Group ERP</span> (Nibble Softworks) - Custom publishing financial workflow automation</div>
<div>7. <span class="term-cmd">Cipta D.Lab System</span> (Nibble Softworks) - Diagnostic medical laboratory ERP</div>
<div>8. <span class="term-cmd">SIMARU Catalog</span> (Nibble Softworks) - Enterprise asset management (ReactJS + Sequelize)</div>
`,
    migration: () => `
<div class="term-info">=== HYBRIS TO SPRING BOOT REWRITE STRATEGY ===</div>
<div>• Pattern: Strangler Fig Application with Apache Kafka Event Replication.</div>
<div>• Step 1: Stand up Spring Boot Core System alongside legacy Hybris.</div>
<div>• Step 2: Stream database change-data-capture (CDC) & transactional mutations via Kafka topics.</div>
<div>• Step 3: Incrementally migrate Hybris APIs (Cart -> Pricing -> Order -> Checkout) to Spring Boot.</div>
<div>• Step 4: Zero-Friction Password Migration: Implement custom DelegatingPasswordEncoder (just-in-time cryptographic re-hashing from Hybris PBKDF2/SHA to Argon2id upon first login, avoiding forced password resets).</div>
<div>• Step 5: Route production traffic dynamically via API Gateway with zero customer-facing downtime.</div>
`,
    experience: () => `
<div class="term-info">=== WORK EXPERIENCE & TENURE ===</div>
<div>• <span class="term-success">PT. Astra Graphia Information Technology (AGIT)</span> (Oct 2020 - Present)</div>
<div>  Role: Java & Spring Boot Team Lead</div>
<div>  Key Tasks: Managing developer squad, rewriting SAP Hybris to Spring Boot on Java, migrating Hybris APIs, exploring zero-friction password migration (Argon2 lazy re-hash), building the core system, and orchestrating Kafka event replication.</div>
<br>
<div>• <span class="term-success">Nibble Softworks</span> (Mar 2019 - Jul 2020)</div>
<div>  Role: Full Stack Software Engineer</div>
<div>  Key Tasks: Engineered custom enterprise Odoo ERP (Python/PostgreSQL), ReactJS web apps, and institutional systems (Jayana, Femina, Cipta D.Lab, Ursulin, SIMARU).</div>
`,
    architecture: () => `
<div class="term-dim">=== ARCHITECTURAL PRINCIPLES ===</div>
<div>1. Modernize Resiliently: Decouple legacy monoliths via Spring Boot microservices & Kafka event brokers.</div>
<div>2. Low-Latency SLAs: Leverage multi-tier caching (Ehcache + Redis) to cut response times below 85ms.</div>
<div>3. High Observability: Distributed tracing, idempotency guards, and automated regression testing.</div>
<div>4. Squad Velocity: Clear domain ownership, crisp code review rubrics, and continuous mentoring.</div>
`,
    contact: () => `
<div>Email: <a href="mailto:jonathan.alva97@yahoo.com" class="term-cmd" style="text-decoration:underline;">jonathan.alva97@yahoo.com</a></div>
<div>LinkedIn: <a href="https://www.linkedin.com/in/jnthnalva" target="_blank" class="term-cmd" style="text-decoration:underline;">linkedin.com/in/jnthnalva</a></div>
<div>Location: Jakarta, Indonesia</div>
`,
    "sudo hire": () => {
      triggerConfetti();
      return `
<div class="term-success" style="font-size: 1.1rem; font-weight: bold;">
🚀 ACCESS GRANTED: Protocol initialized!
</div>
<div class="term-cmd">
Jonathan Alva is ready to lead backend engineering squads, architect core Spring Boot systems, or drive complex legacy enterprise migrations.
</div>
<div>Connect directly via LinkedIn: <strong>https://www.linkedin.com/in/jnthnalva</strong></div>
`;
    },
    clear: () => {
      terminalOutput.innerHTML = '';
      return null;
    }
  };

  function executeCommand(inputVal) {
    const raw = inputVal.trim();
    if (!raw) return;

    // Add prompt line
    const historyLine = document.createElement('div');
    historyLine.className = 'term-line';
    historyLine.innerHTML = `<span class="terminal-prompt">jonathan@dev:~$</span> <span class="term-cmd">${escapeHtml(raw)}</span>`;
    terminalOutput.appendChild(historyLine);

    const cmdKey = raw.toLowerCase();
    const result = COMMANDS[cmdKey] ? COMMANDS[cmdKey]() : `<div class="term-dim">Command not found: "${escapeHtml(raw)}". Type <span class="term-cmd">'help'</span> for list of commands.</div>`;

    if (result !== null) {
      const respLine = document.createElement('div');
      respLine.className = 'term-line';
      respLine.innerHTML = result;
      terminalOutput.appendChild(respLine);
    }

    terminalInput.value = '';
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
    }
  });

  quickCmdBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        terminalInput.value = cmd;
        executeCommand(cmd);
      }
    });
  });

  function triggerConfetti() {
    if (window.showToast) {
      window.showToast("🎉 Protocol Initiated! Ready to build exceptional software together.");
    }
  }
})();
