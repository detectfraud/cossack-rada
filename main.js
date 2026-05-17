/**
 * КОЗАЦЬКА РАДА СМІХОЛИКІВ — main.js
 * Production-ready interactive voting system
 * Anti-cheat · Anti-spam · API-ready architecture
 */

'use strict';

/* ================================================================
   CONFIG
   ================================================================ */
const CONFIG = {
  VOTE_COOLDOWN_MS: 24 * 60 * 60 * 1000, // 24h cooldown
  MIN_CLICK_INTERVAL_MS: 300,             // anti-spam: ignore clicks faster than 300ms
  TOAST_DURATION_MS: 2800,
  COUNTER_DURATION_MS: 1800,
  TICKER_DELAY_MS: 2000,

  // Obfuscated localStorage keys (NEVER use readable names)
  STORAGE_KEYS: {
    STATE:    'kz_rt',       // main vote state (base64)
    DEVICE:   'c0s_x71',    // device fingerprint hash
    SYNC:     'rada_sync',  // last sync timestamp
    COOLDOWN: 'vlt_k7',     // cooldown map (base64)
    // Decoy keys (noise for reverse-engineering)
    DECOY_A:  '_ux_meta',
    DECOY_B:  '__fb_tr',
    DECOY_C:  '_gtm_uid',
  },

  // API endpoints — ready for Cloudflare Workers
  API: {
    VOTE:    '/api/vote',
    RESULTS: '/api/results',
  },
};

/* ================================================================
   TOPIC DATA (mock state — replace with API later)
   ================================================================ */
const TOPICS = [
  {
    id: 'cyber_sich',
    emoji: '🤖',
    title: 'Козаки в майбутньому: Cyber Січ',
    desc: 'Запорізька Січ 2077. Дрони замість коней, лазери замість шаблів.',
    votes: 1247,
  },
  {
    id: 'comments',
    emoji: '💬',
    title: 'Козаки читають ваші коментарі',
    desc: 'Гетьман зачитує найпальованіші коменти підписників у прямому ефірі.',
    votes: 987,
  },
  {
    id: 'ai_vs_cossacks',
    emoji: '🧠',
    title: 'Козаки проти штучного інтелекту',
    desc: 'ШІ пише сценарій, козаки це оцінюють. Хто кращий автор?',
    votes: 856,
  },
  {
    id: 'letter_musk',
    emoji: '✉️',
    title: 'Козаки пишуть лист Маску',
    desc: 'Листа в дусі класичного листа запорожців. Тільки замість султана — Ілон.',
    votes: 723,
  },
  {
    id: 'news_porebryk',
    emoji: '📺',
    title: 'Козаки дивляться новини «за порєбріком»',
    desc: 'Реакція Козацької Ради на пропаганду. Без цензури, з гумором.',
    votes: 611,
  },
];

/* ================================================================
   APP STATE (in-memory, synced to obfuscated localStorage)
   ================================================================ */
const STATE = {
  topics: [],      // enriched topic objects with live votes
  votedTopics: {}, // { topicId: timestamp }
  deviceId: null,
  lastClickTime: 0,
};

/* ================================================================
   UTILS
   ================================================================ */

/** Simple djb2 hash → base36 string */
function hashStr(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) ^ str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
}

/** btoa-safe base64 encode */
function b64e(str) {
  try { return btoa(unescape(encodeURIComponent(str))); } catch { return ''; }
}
function b64d(str) {
  try { return decodeURIComponent(escape(atob(str))); } catch { return null; }
}

/** Get total votes across all topics */
function totalVotes() {
  return STATE.topics.reduce((s, t) => s + t.votes, 0);
}

/** Percentage of votes for a topic */
function pct(votes) {
  const total = totalVotes();
  if (!total) return 0;
  return Math.round((votes / total) * 100);
}

/** Format number with thin-space thousands separator */
function fmtNum(n) {
  return n.toLocaleString('uk-UA');
}

/* ================================================================
   DEVICE FINGERPRINT (lightweight, no library)
   ================================================================ */
function genDeviceFingerprint() {
  const parts = [
    navigator.language || '',
    navigator.platform || '',
    String(screen.width) + 'x' + String(screen.height),
    String(screen.colorDepth),
    String(navigator.hardwareConcurrency || 0),
    Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    String(navigator.maxTouchPoints || 0),
  ];
  return hashStr(parts.join('|'));
}

/* ================================================================
   STORAGE — obfuscated read/write
   ================================================================ */
const Store = {
  _enc(obj) { return b64e(JSON.stringify(obj)); },
  _dec(str) {
    const raw = b64d(str);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  },

  save() {
    try {
      const payload = { v: STATE.votedTopics, d: STATE.deviceId, t: Date.now() };
      localStorage.setItem(CONFIG.STORAGE_KEYS.STATE, this._enc(payload));
      localStorage.setItem(CONFIG.STORAGE_KEYS.COOLDOWN, this._enc(STATE.votedTopics));
      localStorage.setItem(CONFIG.STORAGE_KEYS.SYNC, String(Date.now()));
      // Inject decoy noise keys
      localStorage.setItem(CONFIG.STORAGE_KEYS.DECOY_A, b64e(String(Math.random())));
      localStorage.setItem(CONFIG.STORAGE_KEYS.DECOY_B, b64e('{"uid":null}'));
      localStorage.setItem(CONFIG.STORAGE_KEYS.DECOY_C, b64e(String(Date.now() + Math.random())));
    } catch {/* storage may be unavailable (private mode) */}
  },

  load() {
    try {
      const raw = localStorage.getItem(CONFIG.STORAGE_KEYS.STATE);
      if (!raw) return;
      const data = this._dec(raw);
      if (data && typeof data.v === 'object') {
        STATE.votedTopics = data.v || {};
        STATE.deviceId = data.d || null;
      }
    } catch {/* ignore */}
  },
};

/* ================================================================
   ANTI-CHEAT — vote eligibility
   ================================================================ */
const AntiCheat = {
  /** Returns true if this device is allowed to vote on topicId */
  canVote(topicId) {
    const ts = STATE.votedTopics[topicId];
    if (!ts) return true;
    return (Date.now() - ts) > CONFIG.VOTE_COOLDOWN_MS;
  },

  /** Returns true if this is a legit click (not spam) */
  isLegitClick() {
    const now = Date.now();
    if (now - STATE.lastClickTime < CONFIG.MIN_CLICK_INTERVAL_MS) return false;
    STATE.lastClickTime = now;
    return true;
  },

  /** Mark topic as voted */
  markVoted(topicId) {
    STATE.votedTopics[topicId] = Date.now();
    Store.save();
  },
};

/* ================================================================
   API LAYER — mock now, real Cloudflare Worker later
   ================================================================ */
const API = {
  /**
   * POST /api/vote
   * When backend is ready: replace mock with real fetch
   */
  async vote(topicId, deviceId) {
    // MOCK: simulate network delay
    await new Promise(r => setTimeout(r, 180 + Math.random() * 120));

    // Future real call:
    // const res = await fetch(CONFIG.API.VOTE, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ topicId, deviceId, ts: Date.now() }),
    // });
    // return res.json();

    return { ok: true, topicId };
  },

  /**
   * GET /api/results
   */
  async results() {
    // MOCK
    await new Promise(r => setTimeout(r, 100));
    return STATE.topics.map(t => ({ id: t.id, votes: t.votes }));
  },
};

/* ================================================================
   VOTING LOGIC
   ================================================================ */
async function castVote(topicId) {
  // Anti-spam: ignore ultra-fast clicks
  if (!AntiCheat.isLegitClick()) return;

  // Check cooldown
  if (!AntiCheat.canVote(topicId)) {
    showToast('⏳ Ти вже голосував сьогодні!', '#ff6b00');
    return;
  }

  // Find topic
  const topic = STATE.topics.find(t => t.id === topicId);
  if (!topic) return;

  // Optimistic UI update
  topic.votes += 1;
  AntiCheat.markVoted(topicId);
  renderTopics();
  renderLeaderboard();
  updateCounters();
  showToast('⚔️ Голос прийнято Радою!', null);
  addTickerVote(topicId);

  // Send to backend
  try {
    await API.vote(topicId, STATE.deviceId);
  } catch {
    // If backend fails: vote stays locally (resilient UX)
  }
}

/* ================================================================
   RENDER — TOPIC CARDS
   ================================================================ */
function renderTopics() {
  const grid = document.getElementById('topicsGrid');
  if (!grid) return;

  // Sort by votes to get ranks
  const sorted = [...STATE.topics].sort((a, b) => b.votes - a.votes);

  grid.innerHTML = STATE.topics.map((topic, i) => {
    const rank = sorted.findIndex(t => t.id === topic.id) + 1;
    const percentage = pct(topic.votes);
    const isVoted = !AntiCheat.canVote(topic.id);
    const isLeading = rank === 1;

    return `
      <div class="topic-card reveal ${isLeading ? 'leading' : ''} ${isVoted ? 'voted' : ''}"
           style="animation-delay:${i * 0.07}s"
           data-topic-id="${topic.id}">

        <div class="topic-card__header">
          <div>
            <div class="topic-emoji">${topic.emoji}</div>
            <div class="topic-title">${escHtml(topic.title)}</div>
          </div>
          <div class="topic-meta">
            <span class="topic-rank ${rank === 1 ? 'top1' : ''}">#${rank}</span>
          </div>
        </div>

        <p class="topic-desc">${escHtml(topic.desc)}</p>

        <div class="progress-wrap">
          <div class="progress-bar">
            <div class="progress-fill" style="width:${percentage}%"></div>
          </div>
          <span class="progress-pct">${percentage}%</span>
        </div>

        <div class="topic-footer">
          <div class="votes-count">🗡️ <strong>${fmtNum(topic.votes)}</strong> голосів</div>
          <button
            class="vote-btn ${isVoted ? 'voted-state' : ''}"
            onclick="castVote('${topic.id}')"
            aria-label="Голосувати за: ${escHtml(topic.title)}"
          >
            ${isVoted ? '✅ Проголосовано' : '⚔️ Голосувати'}
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Trigger reveal animations
  requestAnimationFrame(() => {
    grid.querySelectorAll('.reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 60);
    });
  });
}

/* ================================================================
   RENDER — LEADERBOARD
   ================================================================ */
function renderLeaderboard() {
  const lb = document.getElementById('leaderboard');
  if (!lb) return;

  const sorted = [...STATE.topics].sort((a, b) => b.votes - a.votes);
  const maxVotes = sorted[0]?.votes || 1;

  const medals = ['🥇', '🥈', '🥉', '4', '5'];

  lb.innerHTML = sorted.map((topic, i) => {
    const barW = Math.round((topic.votes / maxVotes) * 100);
    const cls = i === 0 ? 'top-1' : i === 1 ? 'top-2' : i === 2 ? 'top-3' : '';

    return `
      <div class="lb-row reveal ${cls}">
        <div class="lb-rank">${medals[i] || (i + 1)}</div>
        <div class="lb-info">
          <div class="lb-title">${topic.emoji} ${escHtml(topic.title)}</div>
          <div class="lb-bar">
            <div class="lb-fill" style="width:${barW}%"></div>
          </div>
        </div>
        <div class="lb-votes">${fmtNum(topic.votes)}</div>
      </div>
    `;
  }).join('');

  requestAnimationFrame(() => {
    lb.querySelectorAll('.reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 70);
    });
  });
}

/* ================================================================
   ANIMATED COUNTERS
   ================================================================ */
function animateCounter(el, target, duration) {
  const start = parseInt(el.textContent.replace(/\D/g, '')) || 0;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out quart
    const ease = 1 - Math.pow(1 - progress, 4);
    const value = Math.round(start + (target - start) * ease);
    el.textContent = fmtNum(value);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function updateCounters() {
  const members = document.getElementById('statMembers');
  const votes   = document.getElementById('statVotes');
  const topics  = document.getElementById('statTopics');

  if (members) animateCounter(members, 12847 + Math.floor(Math.random() * 30), CONFIG.COUNTER_DURATION_MS);
  if (votes)   animateCounter(votes,   totalVotes(), CONFIG.COUNTER_DURATION_MS);
  if (topics)  animateCounter(topics,  STATE.topics.length, CONFIG.COUNTER_DURATION_MS);
}

/* ================================================================
   TOAST NOTIFICATION
   ================================================================ */
let toastTimer = null;

function showToast(message, color) {
  const toast = document.getElementById('voteToast');
  if (!toast) return;

  toast.querySelector('.toast-text').textContent = message;
  if (color) toast.style.color = color;
  else toast.style.color = '';

  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), CONFIG.TOAST_DURATION_MS);
}

/* ================================================================
   TICKER — add live vote entry
   ================================================================ */
const COSSACK_NAMES = [
  'Гетьман_Х', 'Козак_Мем', 'Запорожець_777', 'Січовик_UA',
  'MemeAtaman', 'Борщ_Нація', 'Шабля_Кодер', 'Лицар_UA',
];

function addTickerVote(topicId) {
  const ticker = document.getElementById('tickerTrack');
  if (!ticker) return;
  const topic = STATE.topics.find(t => t.id === topicId);
  if (!topic) return;

  const name = COSSACK_NAMES[Math.floor(Math.random() * COSSACK_NAMES.length)];
  const span = document.createElement('span');
  span.innerHTML = `⚔️ <b>${name}</b> проголосував за «${topic.title}»`;
  ticker.appendChild(span.cloneNode(true)); // dupe for seamless loop
}

/* ================================================================
   SUBMIT IDEA FORM
   ================================================================ */
function submitIdea() {
  const nick  = document.getElementById('nickInput')?.value.trim();
  const idea  = document.getElementById('ideaInput')?.value.trim();

  if (!nick || nick.length < 2) {
    flashInput('nickInput');
    return;
  }
  if (!idea || idea.length < 10) {
    flashInput('ideaInput');
    return;
  }

  // Disable button
  const btn = document.getElementById('submitBtn');
  if (btn) { btn.classList.add('loading'); btn.querySelector('span:nth-child(2)').textContent = 'Надсилаємо...'; }

  // Simulate API call (POST /api/idea when ready)
  setTimeout(() => {
    document.getElementById('submitForm').style.display = 'none';
    document.getElementById('submitSuccess').style.display = 'block';
    showToast('✅ Ідею передано Раді!', null);
  }, 900);
}

function resetSubmit() {
  const form = document.getElementById('submitForm');
  const success = document.getElementById('submitSuccess');
  if (form) { form.style.display = ''; }
  if (success) { success.style.display = 'none'; }
  const btn = document.getElementById('submitBtn');
  if (btn) {
    btn.classList.remove('loading');
    btn.querySelector('span:nth-child(2)').textContent = 'ПЕРЕДАТИ ІДЕЮ РАДІ';
  }
  const nickInput = document.getElementById('nickInput');
  const ideaInput = document.getElementById('ideaInput');
  if (nickInput) nickInput.value = '';
  if (ideaInput) ideaInput.value = '';
  updateCharCount();
}

function flashInput(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.borderColor = 'rgba(230,57,70,0.7)';
  el.style.boxShadow = '0 0 0 3px rgba(230,57,70,0.15)';
  el.focus();
  setTimeout(() => { el.style.borderColor = ''; el.style.boxShadow = ''; }, 1200);
}

function updateCharCount() {
  const textarea = document.getElementById('ideaInput');
  const counter  = document.getElementById('charCount');
  if (textarea && counter) {
    counter.textContent = String(textarea.value.length);
    counter.style.color = textarea.value.length > 180 ? 'var(--orange)' : '';
  }
}

/* ================================================================
   SMOOTH SCROLL
   ================================================================ */
function smoothTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 20;
  window.scrollTo({ top, behavior: 'smooth' });
}

/* ================================================================
   SCROLL REVEAL (IntersectionObserver)
   ================================================================ */
function initReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ================================================================
   PARTICLE CANVAS (lightweight, CSS-variable-aware)
   ================================================================ */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = -Math.random() * 0.5 - 0.1;
    this.alpha = Math.random() * 0.4 + 0.1;
    this.size = Math.random() * 2 + 0.5;
    this.color = Math.random() > 0.5 ? '#f5c518' : '#ff6b00';
  }

  Particle.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.0008;
    if (this.alpha <= 0 || this.y < -10) {
      this.x = Math.random() * W;
      this.y = H + 10;
      this.alpha = Math.random() * 0.4 + 0.1;
    }
  };

  Particle.prototype.draw = function() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  };

  function spawn() {
    const count = Math.min(50, Math.floor(W / 14));
    particles = Array.from({ length: count }, () => {
      const p = new Particle();
      p.y = Math.random() * H; // initial spread
      return p;
    });
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }

  resize();
  spawn();
  loop();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); spawn(); }, 150);
  });
}

/* ================================================================
   DUPLICATE TICKER for seamless infinite loop
   ================================================================ */
function initTicker() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  // Clone all children for seamless CSS animation loop
  const original = Array.from(track.children);
  original.forEach(el => track.appendChild(el.cloneNode(true)));
}

/* ================================================================
   CHAR COUNTER for textarea
   ================================================================ */
function initCharCounter() {
  const textarea = document.getElementById('ideaInput');
  if (textarea) textarea.addEventListener('input', updateCharCount);
}

/* ================================================================
   XSS GUARD
   ================================================================ */
function escHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ================================================================
   INIT
   ================================================================ */
function init() {
  // Load persisted vote state
  Store.load();

  // Generate device fingerprint
  STATE.deviceId = STATE.deviceId || genDeviceFingerprint();
  Store.save();

  // Clone topic data into state (future: fetch from API)
  STATE.topics = TOPICS.map(t => ({ ...t }));

  // Randomize vote counts slightly for realism
  STATE.topics.forEach(t => {
    t.votes += Math.floor(Math.random() * 30);
  });

  // Render
  renderTopics();
  renderLeaderboard();

  // Initialize stats counters on scroll into view
  const statsEl = document.getElementById('stats');
  if (statsEl && 'IntersectionObserver' in window) {
    let fired = false;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !fired) {
        fired = true;
        updateCounters();
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(statsEl);
  } else {
    updateCounters();
  }

  // Sub-systems
  initReveal();
  initTicker();
  initCharCounter();

  // Particles — only on desktop/non-reduced-motion
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    initParticles();
  }

  // Simulate live activity: increment votes slowly
  startLiveSimulation();
}

/* ================================================================
   LIVE SIMULATION (fake real-time activity)
   Simulates other users voting in real time.
   Replace with WebSocket / SSE when backend is ready.
   ================================================================ */
function startLiveSimulation() {
  function tick() {
    // Pick random topic and add 1–3 votes
    const topic = STATE.topics[Math.floor(Math.random() * STATE.topics.length)];
    const added = Math.floor(Math.random() * 3) + 1;
    topic.votes += added;

    // Update UI silently (no toast for simulated votes)
    renderTopics();
    renderLeaderboard();

    // Update stats
    const votesEl = document.getElementById('statVotes');
    if (votesEl) animateCounter(votesEl, totalVotes(), 600);

    const membersEl = document.getElementById('statMembers');
    if (membersEl && Math.random() > 0.7) {
      const cur = parseInt(membersEl.textContent.replace(/\D/g, '')) || 12847;
      animateCounter(membersEl, cur + 1, 600);
    }

    // Add ticker entry
    addTickerVote(topic.id);

    // Schedule next tick (random interval 8–25s)
    const delay = 8000 + Math.random() * 17000;
    setTimeout(tick, delay);
  }

  // Start after initial load
  setTimeout(tick, CONFIG.TICKER_DELAY_MS + Math.random() * 5000);
}

/* ================================================================
   GLOBAL expose for HTML onclick handlers
   ================================================================ */
window.castVote    = castVote;
window.smoothTo    = smoothTo;
window.submitIdea  = submitIdea;
window.resetSubmit = resetSubmit;

/* ================================================================
   BOOT
   ================================================================ */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
