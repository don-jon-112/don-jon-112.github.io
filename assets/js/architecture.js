/* ===================================================================
   INTERACTIVE ARCHITECTURE VISUALIZER
   High-scalability enterprise architecture diagrams & specs
   =================================================================== */

const ARCHITECTURE_DATA = {
  client: {
    title: "Client & Presentation Layer",
    tech: "ReactJS · Flutter Mobile · Web Frontend",
    desc: "Cross-platform customer touchpoints communicating through resilient RESTful interfaces. Built with responsive client-side caching, optimistic UI updates, and lazy-loaded assets to guarantee snappy mobile checkout experiences.",
    metrics: [
      { name: "Avg Page Load Time", val: "< 1.4s" },
      { name: "Mobile Traffic Share", val: "78%" },
      { name: "Frameworks Handled", val: "React, Flutter, Blade" }
    ],
    patterns: "Progressive Web App, Code Splitting, Optimistic UI"
  },
  gateway: {
    title: "API Gateway & Strangler Migration Proxy",
    tech: "Spring Cloud Gateway · Nginx · JWT / OAuth2 · Dynamic Routing",
    desc: "Intelligent gateway proxying traffic during the Hybris-to-Spring Boot migration. Dynamically routes migrated API paths to new Spring Boot microservices while routing unmigrated endpoints to legacy Hybris with zero downtime.",
    metrics: [
      { name: "Throughput Capacity", val: "50k+ req/sec" },
      { name: "Migration Traffic Routed", val: "100% Zero Downtime" },
      { name: "Security Protocol", val: "OAuth 2.0 / JWT" }
    ],
    patterns: "Strangler Fig Pattern, Dynamic Routing, Circuit Breaker"
  },
  core: {
    title: "Spring Boot Core System (Rewriting SAP Hybris)",
    tech: "Java · Spring Boot · Virtual Threads · Spring Security · Spring Data JPA",
    desc: "The high-performance enterprise Core System designed and led by Jonathan Alva. Rewrites monolithic SAP Hybris Commerce into modular, decoupled Spring Boot microservices leveraging Java Virtual Threads to handle core checkout funnels, catalog data, and pricing engines. Features zero-friction password migration (just-in-time lazy re-hashing from Hybris PBKDF2/SHA salts to Argon2id/BCrypt without forced user resets).",
    metrics: [
      { name: "Latency Improvement", val: "85ms (-96% vs Monolith)" },
      { name: "Transaction Scalability", val: "100k+ Daily Tx" },
      { name: "Password Migration", val: "Zero Forced Resets" }
    ],
    patterns: "Domain-Driven Design (DDD), DelegatingPasswordEncoder (JIT Re-hash), Clean Architecture"
  },
  kafka: {
    title: "Apache Kafka Event-Driven Migration Bus",
    tech: "Apache Kafka · Kafka Streams · Schema Registry · Topic Partitions",
    desc: "Critical event streaming backbone utilized by Jonathan's squad to synchronize transactional mutations and replicate legacy Hybris data to the new Spring Boot Core System asynchronously without database locks.",
    metrics: [
      { name: "Event Throughput", val: "25k+ msg/sec" },
      { name: "Replication Lag", val: "< 45ms" },
      { name: "Reliability Guarantee", val: "At-Least-Once Delivery" }
    ],
    patterns: "Event-Driven Architecture (EDA), Outbox Pattern, Dead Letter Queue"
  },
  caching: {
    title: "Distributed Caching & In-Memory Store",
    tech: "Ehcache L1/L2 · Redis Distributed Cache",
    desc: "High-speed multi-tier caching layer preventing database stampedes during peak e-commerce sales. Features fine-tuned TTL policies and automated cache invalidation upon catalog change events.",
    metrics: [
      { name: "Cache Hit Ratio", val: "94.8%" },
      { name: "Read Latency", val: "< 3ms" },
      { name: "DB Load Reduction", val: "-68%" }
    ],
    patterns: "Cache-Aside, Write-Through, Region-based Invalidation"
  },
  database: {
    title: "Persistent Storage & Data Replication",
    tech: "PostgreSQL · MySQL · Flyway Migration · HikariCP",
    desc: "ACID-compliant relational database clusters configured with read replicas, partitioned event ledgers, and optimized query plans managed by Flyway migration scripts.",
    metrics: [
      { name: "Availability SLA", val: "99.98% Uptime" },
      { name: "Replication Lag", val: "< 150ms" },
      { name: "Connection Pooling", val: "HikariCP Optimized" }
    ],
    patterns: "Read/Write Replica Splitting, Connection Pool Tuning"
  }
};

function initArchitectureVisualizer() {
  const nodes = document.querySelectorAll('.arch-node');
  const titleEl = document.getElementById('arch-detail-title');
  const techEl = document.getElementById('arch-detail-tech');
  const descEl = document.getElementById('arch-detail-desc');
  const metricsContainer = document.getElementById('arch-metrics-container');

  if (!nodes.length || !titleEl) return;

  function updateArchCard(key) {
    const data = ARCHITECTURE_DATA[key];
    if (!data) return;

    nodes.forEach(n => {
      n.classList.toggle('active', n.getAttribute('data-node') === key);
    });

    titleEl.textContent = data.title;
    if (techEl) techEl.textContent = data.tech;
    descEl.textContent = data.desc;

    if (metricsContainer) {
      metricsContainer.innerHTML = data.metrics.map(m => `
        <div class="arch-metric-row">
          <span class="arch-metric-name">${m.name}</span>
          <span class="arch-metric-val">${m.val}</span>
        </div>
      `).join('');
    }
  }

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const key = node.getAttribute('data-node');
      updateArchCard(key);
    });
  });

  // Init default node
  updateArchCard('core');
}

document.addEventListener('DOMContentLoaded', initArchitectureVisualizer);
