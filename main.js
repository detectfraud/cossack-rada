/* =============================================
   КОЗАЦЬКИЙ СЕРІАЛ — main.js
   ============================================= */

const POST_CONFIG = {
  likes:        "92 тис.",
  comments:    "1,6 тис.",
  shares:      "14 тис.",
  author:      "Козак-Веселун",
  date:        "21 травня"
};

const I18N = {
  uk: {
    html_lang:      "uk",
    title:          "Козацький серіал",
    hero:           "Козацький серіал",
    sub:            "Відео, яке зібрало мільйони переглядів, стало початком серії мемів про козаків.",
    before_video:   "Перша серія, з якої все почалося 👇",
    donate_heading: "❤️ Підтримати серіал",
    donate_text:    "Ми створюємо цей серіал власним коштом.\nAI-сервіси, генерація сцен, монтаж та створення нових серій потребують ресурсів.\nЯкщо тобі подобається цей проєкт — підтримай його розвиток ❤️",
    donate_btn:     "Підтримати серіал",
    ads_heading:    "📢 Монетизація",
    ads_text:       "Реклама допомагає випускати нові серії та підтримувати проєкт.\nДякуємо за підтримку ❤️",
    next:           "Нові серії вже готуються 👀",
    post_text:      "Поширюйте цей ролик по всьому світу.\n«Ви навіть не уявляєте, как цей короткий ролик розхитує фундамент \"імперії зла\". Кожен ваш лайк, поширення чи коментар — навіть жовчний вигук ворога — це та сама крапля, що точить їхнє гниле корито, коли воно переповниться, то піде на дно так само впевнено й безславно, як їхній флагман \"Москва\". Ваша активність — це зброя, що наближає фінальне занурення»",
    adblock_lines:  [
      "⚠️ Схоже, у вас увімкнений блокувальник реклами.",
      "Ми створюємо цей серіал <strong>власним коштом</strong>.",
      "Реклама допомагає оплачувати AI-сервіси, монтаж та випуск нових серій.",
      "Будь ласка, додайте сайт у винятки AdBlock або підтримайте проєкт донатом ❤️"
    ],
    adblock_sticky: "⚠️ Будь ласка, додайте сайт у винятки AdBlock або підтримайте проєкт донатом❤️",
  },
  en: {
    html_lang:      "en",
    title:          "The Viral Cossack Series",
    hero:           "The Viral Cossack Series",
    sub:            "A short viral video with millions of views became the beginning of a Cossack meme series.",
    before_video:   "The first episode that started it all 👇",
    donate_heading: "❤️ Support the Series",
    donate_text:    "This series is created independently and funded by its audience.\nAI tools, scene generation, editing, and production all require resources.\nIf you enjoy this project — support future episodes ❤️",
    donate_btn:     "Support the Series",
    ads_heading:    "📢 Advertising",
    ads_text:       "Advertising helps fund new episodes and keeps the project alive.\nThank you for your support ❤️",
    next:           "More episodes are coming soon 👀",
    post_text:      "Share this video all over the world.\n«You can't even imagine how this short video shakes the foundation of the \"empire of evil\". Every like, share, or comment — even an angry reaction from the enemy — is a drop that wears down their rotten trough. When it overflows, it will sink just as surely as their flagship \"Moskva\". Your activity is a weapon that hastens the final plunge»",
    adblock_lines:  [
      "⚠️ It looks like you're using an ad blocker.",
      "This series is created <strong>independently</strong> and funded through ads and community support.",
      "Please consider disabling AdBlock for this site",
      "or supporting the project with a donation ❤️"
    ],
    adblock_sticky: "⚠️ Please consider disabling AdBlock for this site or supporting the project with a donation ❤️",
  }
};

// =============================================
// IP БЛОКУВАННЯ — РФ та Білорусь
// =============================================
(function () {
  const BLOCKED_COUNTRIES = ['RU', 'BY'];
  const showGeoBlock = () => {
    document.body.style.overflow = 'hidden';
    document.body.innerHTML = `
      <style>
        @keyframes _spin { to { transform: rotate(360deg); } }
        ._loader { position: fixed; inset: 0; background: #0a0a0a; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; font-family: Arial, sans-serif; }
        ._spinner { width: 48px; height: 48px; border: 4px solid #222; border-top-color: #555; border-radius: 50%; animation: _spin 0.9s linear infinite; }
        ._loader-text { color: #444; font-size: 13px; letter-spacing: 1px; }
      </style>
      <div class="_loader"><div class="_spinner"></div><span class="_loader-text">Завантаження...</span></div>`;
    window.stop();
  };
  fetch('https://ip-api.com/json/?fields=countryCode', { cache: 'no-store' })
    .then(r => r.json())
    .then(data => { if (BLOCKED_COUNTRIES.includes(data.countryCode)) showGeoBlock(); })
    .catch(() => {});
})();

// =============================================
// ADBLOCK DETECTOR
// =============================================
(function () {
  const isDebug = window.location.hash === "#test";
  if (isDebug) return;

  const showAdblockMessage = () => {
    const lang = window._currentLang || 'uk';
    const t = I18N[lang] || I18N['uk'];
    const lines = t.adblock_lines.map(l => `<p>${l}</p>`).join('');

    document.querySelectorAll('.ad').forEach(el => {
      el.innerHTML = `<div class="adblock-msg"><span class="adblock-icon">⚠️</span>${lines}</div>`;
    });
    const stickyEl = document.getElementById('js-sticky');
    if (stickyEl) stickyEl.innerHTML = `<div class="adblock-msg adblock-msg--sticky">${t.adblock_sticky}</div>`;
  };

  const checkAds = () => {
    const hp = document.createElement('div');
    hp.className = 'ad-unit banner-ad sponsored';
    hp.style.cssText = 'position:absolute;left:-9999px;width:300px;height:250px;pointer-events:none;';
    document.body.appendChild(hp);
    setTimeout(() => {
      const s = window.getComputedStyle(hp);
      const blocked = hp.offsetHeight === 0 || hp.offsetWidth === 0 || s.display === 'none' || s.visibility === 'hidden';
      hp.remove();
      if (blocked) showAdblockMessage();
    }, 800);

    fetch('https://cdn.monetag.com/tag.min.js', { method: 'HEAD', mode: 'no-cors', cache: 'no-store' }).catch(() => showAdblockMessage());
  };

  const checkDev = () => {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && e.keyCode === 73) || (e.ctrlKey && e.shiftKey && e.keyCode === 74) || (e.ctrlKey && e.keyCode === 85)) e.preventDefault();
    });
  };

  if (document.readyState === 'complete') { checkAds(); checkDev(); } 
  else { window.addEventListener('load', () => { checkAds(); checkDev(); }); }
  document.addEventListener('contextmenu', e => e.preventDefault());
})();

// =============================================
// i18n РЕНДЕР
// =============================================
function setLang(lang) {
  const t = I18N[lang];
  if (!t) return;

  localStorage.setItem('lang', lang);
  document.documentElement.lang = t.html_lang;
  document.title = t.title;

  document.getElementById('js-hero').textContent           = t.hero;
  document.getElementById('js-sub').textContent            = t.sub;
  document.getElementById('js-before-video').textContent   = t.before_video;
  document.getElementById('js-post-text').textContent      = t.post_text;
  document.getElementById('js-donate-heading').textContent = t.donate_heading;
  document.getElementById('js-donate-text').textContent    = t.donate_text;
  document.getElementById('js-donate-btn').textContent     = '💰 ' + t.donate_btn;
  document.getElementById('js-ads-heading').textContent    = t.ads_heading;
  document.getElementById('js-ads-text').textContent       = t.ads_text;
  document.getElementById('js-next').textContent           = t.next;

  // Повертаємо заповнення лічильників, щоб блоки не пустували
  document.getElementById('js-author-name').textContent    = POST_CONFIG.author;
  document.getElementById('js-post-date').textContent      = POST_CONFIG.date;
  document.getElementById('js-likes').textContent          = POST_CONFIG.likes;
  document.getElementById('js-comments').textContent       = POST_CONFIG.comments;
  document.getElementById('js-shares').textContent         = POST_CONFIG.shares;

  document.getElementById('btn-uk').classList.toggle('active', lang === 'uk');
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');

  window._currentLang = lang;

  const lines = t.adblock_lines.map(l => `<p>${l}</p>`).join('');
  document.querySelectorAll('.ad .adblock-msg').forEach(el => {
    el.innerHTML = `<span class="adblock-icon">⚠️</span>${lines}`;
  });
  const stickyMsg = document.querySelector('#js-sticky .adblock-msg--sticky');
  if (stickyMsg) stickyMsg.textContent = t.adblock_sticky;
}

// Слухачі подій кнопок
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-uk').addEventListener('click', () => setLang('uk'));
  document.getElementById('btn-en').addEventListener('click', () => setLang('en'));
});

// Старт
(function () {
  const saved   = localStorage.getItem('lang');
  const urlLang = new URLSearchParams(window.location.search).get('lng');
  const detected = saved || urlLang || 'uk';
  setLang(I18N[detected] ? detected : 'uk');
})();
