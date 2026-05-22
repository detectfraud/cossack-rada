/* =============================================
   КОЗАЦЬКИЙ СЕРІАЛ — main.js
   ============================================= */

const POST_CONFIG = {
  likes:    "101 тис.",
  comments: "15 тис.",
  shares:   "2 тис.",
  author:   "Козак-Веселун",
  date:     "21 травня"
};

const I18N = {
  uk: {
    html_lang:      "uk",
    title:          "Козацький серіал",
    hero:           "Козацький серіал",
    sub:            "Відео, яке зібрало мільйони переглядів в Facebook, стало початком серії мемів про козаків.",
    before_video:   "Перша серія, з якої все почалося 👇",
    donate_heading: "❤️ Підтримати серіал",
    donate_text:    "Ми створюємо цей серіал власним коштом.\nAI-сервіси, генерація сцен, монтаж та створення нових серій потребують ресурсів.\nЯкщо тобі подобається цей проєкт — підтримай його розвиток ❤️",
    donate_btn:     "Підтримати серіал",
    ads_heading:    "📢 Монетизація",
    ads_text:       "Реклама допомагає випускати нові серії та підтримувати проєкт.\nДякуємо за підтримку ❤️",
    next:           "Нові серії вже готуються 👀",
    post_text:      "Поширюйте цей ролик по всьому світу.\n«Ви навіть не уявляєте, як цей короткий ролик розхитує фундамент \"імперії зла\". Кожен ваш лайк, поширення чи коментар — навіть жовчний вигук ворога — це та сама крапля, що точить їхнє гниле корито, коли воно переповниться, то піде на дно так само впевнено й безславно, як їхній флагман \"Москва\". Ваша активність — це зброя, що наближає фінальне занурення»",
    adblock_lines:  [
      "⚠️ Схоже, у вас увімкнений блокувальник реклами.",
      "Ми створюємо цей серіал <strong>власним коштом</strong>.",
      "Реклама допомагає оплачувати AI-сервіси, монтаж та випуск нових серій.",
      "Будь ласка, додайте сайт у винятки AdBlock або підтримайте проєкт донатом ❤️"
    ],
    adblock_sticky: "⚠️ Будь ласка, додайте сайт у винятки AdBlock або підтримайте проєкт донатом ❤️",
  },
  en: {
    html_lang:      "en",
    title:          "The Viral Cossack Series",
    hero:           "The Viral Cossack Series",
    sub:            "The video, which garnered millions of views on Facebook, was the start of a series of memes about the Cossacks.",
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

window._isAdblockDetected = false;

// =============================================
// ADBLOCK DETECTOR
// Логіка: перевіряємо тільки honeypot (CSS-блокування).
// НЕ перевіряємо чи порожній ad-блок — Monetag завантажується
// асинхронно і може зайняти довше ніж будь-який таймер.
// =============================================
(function () {
  const isDebug = window.location.hash === "#test";
  const isBoss  = localStorage.getItem('iamtheboss') === 'true';
  if (isDebug || isBoss) return;

  const showAdblockMessage = () => {
    window._isAdblockDetected = true;
    const lang = window._currentLang || 'uk';
    const t    = I18N[lang] || I18N['uk'];
    const lines = t.adblock_lines.map(l => `<p>${l}</p>`).join('');

    document.querySelectorAll('.ad').forEach(el => {
      el.innerHTML = `<div class="adblock-msg">${lines}</div>`;
    });

    const stickyEl = document.getElementById('js-sticky');
    if (stickyEl) {
      stickyEl.innerHTML = `<div class="adblock-msg adblock-msg--sticky">${t.adblock_sticky}</div>`;
      stickyEl.style.display = 'block';
    }
  };

  const checkAdblock = () => {
    // Honeypot: елемент з класами які блокує AdBlock
    const bait = document.createElement('div');
    bait.className = 'adsbox ad-unit text-ad';
    bait.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;';
    document.body.appendChild(bait);

    // Чекаємо 300мс щоб CSS-правила AdBlock застосувались
    setTimeout(() => {
      const s = window.getComputedStyle(bait);
      const blocked = bait.offsetHeight === 0 ||
                      bait.offsetWidth  === 0 ||
                      s.display      === 'none' ||
                      s.visibility   === 'hidden';
      bait.remove();

      if (blocked) showAdblockMessage();
      // Якщо не заблокований — нічого не робимо,
      // Monetag сам заповнить блоки коли завантажиться
    }, 300);
  };

  if (document.readyState === 'complete') {
    checkAdblock();
  } else {
    window.addEventListener('load', checkAdblock);
  }
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

  document.getElementById('js-author-name').textContent = POST_CONFIG.author;
  document.getElementById('js-post-date').textContent   = POST_CONFIG.date;
  document.getElementById('js-likes').textContent       = POST_CONFIG.likes;
  document.getElementById('js-comments').textContent    = POST_CONFIG.comments;
  document.getElementById('js-shares').textContent      = POST_CONFIG.shares;

  document.getElementById('btn-uk').classList.toggle('active', lang === 'uk');
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');

  window._currentLang = lang;

  // Оновлюємо переклад якщо adblock вже показується
  if (window._isAdblockDetected) {
    const lines = t.adblock_lines.map(l => `<p>${l}</p>`).join('');
    document.querySelectorAll('.ad').forEach(el => {
      el.innerHTML = `<div class="adblock-msg">${lines}</div>`;
    });
    const stickyMsg = document.querySelector('#js-sticky .adblock-msg--sticky');
    if (stickyMsg) stickyMsg.textContent = t.adblock_sticky;
  }
}

// Кнопки перемикача мови
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-uk').addEventListener('click', () => setLang('uk'));
  document.getElementById('btn-en').addEventListener('click', () => setLang('en'));
});

// Старт
(function () {
  const saved    = localStorage.getItem('lang');
  const urlLang  = new URLSearchParams(window.location.search).get('lng');
  const detected = saved || urlLang || 'uk';
  setLang(I18N[detected] ? detected : 'uk');
})();
