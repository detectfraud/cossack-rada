/* =============================================
   КОЗАЦЬКИЙ СЕРІАЛ — main.js
   ============================================= */

const POST_CONFIG = {
  likes:    "101K",
  comments: "2K",
  shares:   "16K"
};

const I18N = {
  uk: {
    html_lang:      "uk",
    title:          "«Козацькі Сміхолики» — Веселі козацькі меми та анімаційний серіал",
    hero:           "«Козацькі Сміхолики»",
    sub:            "Відео, яке зібрало мільйони переглядів в Facebook, стало початком серії мемів про козаків.",
    before_video:   "Перша серія, з якої все почалося 👇",
    donate_heading: "❤️ Підтримати серіал",
    donate_text:    "Ми створюємо цей серіал власним коштом.<br>AI-сервіси, генерація сцен, монтаж та створення нових серій потребують ресурсів.<br>Якщо тобі подобається цей проєкт — підтримай його розвиток ❤️",
    donate_btn:     "Грошовий донат",
    next:           "Нові серії вже готуються 👀",
    post_text:      "Поширюйте цей ролик по всьому світу.\n«Ви навіть не уявляєте, як цей короткий ролик розхитує фундамент \"імперії зла\". Кожен ваш лайк, поширення чи коментар — навіть жовчний вигук ворога — це та сама крапля, що точить їхнє гниле корито, коли воно переповниться, то піде на дно так само впевнено й безславно, як їхній флагман \"Москва\". Ваша активність — це зброя, що наближає фінальне занурення»",
    smart_btn:        "Безкоштовний рекламний донат",
    smart_btn_locked: "⏳ Пауза до ",

    land_title:  "«Козацькі Сміхолики»",
    land_p1:     "Козаки знову оживають — не в підручниках, а у веселих коротких історіях, жартах, пригодах і сучасних мемах.",
    land_p2:     "«Козацькі Сміхолики» — це серіал коротких роликів, у якому козацький дух поєднується з гумором, народною мудрістю та українським вайбом.",
    land_p3:     "Кожен ролик — це нова кумедна ситуація, несподіваний поворот або життєва історія, у якій легко впізнати себе, друзів чи сучасну Україну.",
    land_cta1:   "Якщо «Козацькі Сміхолики» запали вам у душу — підтримайте створення нових серій. Кожна підтримка допомагає:",
    land_li1:    "створювати нові ролики;",
    land_li2:    "покращувати анімацію та озвучку;",
    land_li3:    "вигадувати ще більше веселих сюжетів;",
    land_li4:    "розвивати український авторський контент.",
    land_cta2:   "А ще ви можете стать частиною проєкту:",
    land_li5:    "запропонувати власну тему чи ідею для нового ролика;",
    land_li6:    "проголосувати за сюжет, який хочете побачити наступним;",
    land_li7:    "вплинути на розвиток всесвіту «Козацьких Сміхоликів».",
    land_footer: "Разом створимо серіал, який даруватиме людям усмішку та підніме дух 🇺🇦",
    read_more:   "————————— читати більше",
    read_less:   "————————— згорнути",

    inst_title:        "📢 Рекламний донат — як користуватись",
    inst_intro:        "Рекламний донат дозволяє підтримати нас абсолютно безкоштовно! Кліком ви вмикаєте офіційний скрипт нашого рекламного партнера, який покаже вам оголошення, за що мережа нарахує нам кошти на AI-генерацію. Перепрошуємо за специфічний вміст оголошень — це повністю автоматичний підбір мережі.",
    inst_adblock:      "⚠️ Важливо: якщо у вас увімкнений AdBlock або Brave Shields — система не зможе зарахувати донат. Будь ласка, вимкніть їх перед кліком.",
    inst_more:         "Читати інструкцію далі 👇",
    inst_less:         "Згорнути інструкцію ▲",

    offer_text: "Ви вперше натиснули на 'Рекламний донат'. Бажаєте ознайомитися з короткою інструкцією?",
    cb_label:   "Більше не показувати це питання",
    yes_text:   "ТАК",
    no_text:    "НІ",

    adblock_lines: [
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
    donate_text:    "This series is created independently and funded by its audience.<br>AI tools, scene generation, editing, and production all require resources.<br>If you enjoy this project — support future episodes ❤️",
    donate_btn:     "Money Donation",
    next:           "More episodes are coming soon 👀",
    post_text:      "Share this video all over the world.\n«You can't even imagine how this short video shakes the foundation of the \"empire of evil\". Every like, share, or comment — even an angry reaction from the enemy — is a drop that wears down their rotten trough. When it overflows, it will sink just as surely as their flagship \"Moskva\". Your activity is a weapon that hastens the final plunge»",
    smart_btn:        "Free Advertising Donation",
    smart_btn_locked: "⏳ Paused until ",

    land_title:  ""Cossack Smiholiky"",
    land_p1:     "Cossacks come to life once again — not in history textbooks, but in hilarious short stories, jokes, adventures, and modern memes.",
    land_p2:     ""Cossack Smiholiky" is a short-form video series where the free Cossack spirit perfectly blends with humor, folk wisdom, and authentic Ukrainian vibes.",
    land_p3:     "Each episode brings a new funny situation, an unexpected twist, or a relatable life story where you can easily recognize yourself, your friends, or modern Ukraine.",
    land_cta1:   "If "Cossack Smiholiky" captured your heart, please consider supporting the creation of new episodes. Every bit of support helps us to:",
    land_li1:    "produce new video episodes;",
    land_li2:    "improve animation and voice acting quality;",
    land_li3:    "brainstorm even more hilarious storylines;",
    land_li4:    "develop authentic Ukrainian independent content.",
    land_cta2:   "Moreover, you can become an active part of the project:",
    land_li5:    "suggest your own theme or idea for an upcoming episode;",
    land_li6:    "vote for the next storyline you want to see animated;",
    land_li7:    "influence the growth of the "Cossack Smiholiky" universe.",
    land_footer: "Together, let's build a series that brings smiles and boosts the spirit 🇺🇦",
    read_more:   "————————— read more",
    read_less:   "————————— read less",

    inst_title:   "📢 Advertising Donation — How to Use",
    inst_intro:   "Advertising donation allows you to support us absolutely for free! By clicking, you activate the official script of our advertising partner, which will show you an ad, and the network rewards us with funds for further AI generation.",
    inst_adblock: "⚠️ Important: if you have AdBlock or Brave Shields active, the network cannot register your donation. Please disable them before clicking.",
    inst_more:    "Read instruction further 👇",
    inst_less:    "Collapse instruction ▲",

    offer_text: "This is your first click on 'Advertising Donation'. Would you like to read a short manual?",
    cb_label:   "Do not show this question again",
    yes_text:   "YES",
    no_text:    "NO",

    adblock_lines: [
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
// ЗАШИФРОВАНИЙ TIMESTAMP (той самий u_data_ts)
// =============================================
const keyTimeHash   = "u_data_ts";
const keyStringHash = "u_data_str";

function maskData(value)        { return btoa("czk_" + value + "_czk"); }
function unmaskData(maskedValue) {
  if (!maskedValue) return '';
  try {
    const decoded = atob(maskedValue);
    return decoded.substring(4, decoded.length - 4);
  } catch(e) { return ''; }
}
function isBlocked() {
  const until = unmaskData(localStorage.getItem(keyTimeHash));
  return until && Date.now() < parseInt(until);
}
function setBlock() {
  const rand    = Math.floor(Math.random() * (20 - 2 + 1)) + 2; // 2..20 хв
  const until   = new Date(Date.now() + 24*60*60*1000 + rand*60*1000);
  const h = String(until.getHours()).padStart(2,'0');
  const m = String(until.getMinutes()).padStart(2,'0');
  localStorage.setItem(keyTimeHash,   maskData(until.getTime().toString()));
  localStorage.setItem(keyStringHash, maskData(`${h}:${m}`));
}
function getBlockTimeString() {
  return unmaskData(localStorage.getItem(keyStringHash)) || '';
}

// =============================================
// ADBLOCK DETECTOR
// =============================================
window.showAdblockMessage = function() {
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

(function () {
  const isDebug = window.location.hash === "#test";
  const isBoss  = localStorage.getItem('iamtheboss') === 'true';
  if (isDebug || isBoss) return;
  const checkAdblock = () => {
    const bait = document.createElement('div');
    bait.className = 'adsbox ad-unit text-ad';
    bait.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;';
    document.body.appendChild(bait);
    setTimeout(() => {
      const s = window.getComputedStyle(bait);
      const blocked = bait.offsetHeight === 0 || bait.offsetWidth === 0 ||
                      s.display === 'none' || s.visibility === 'hidden';
      bait.remove();
      if (blocked) window.showAdblockMessage();
    }, 300);
  };
  if (document.readyState === 'complete') checkAdblock();
  else window.addEventListener('load', checkAdblock);
})();

// =============================================
// ADSTERRA — підключення банерів
// Вставте сюди скрипт Adsterra якщо він потрібен глобально.
// Або вставте код безпосередньо в #ad-left / #ad-right в index.html.
// =============================================
function injectAdsterraScript() {
  // Тут нічого не робимо — Adsterra банери вставляються напряму в .ad блоки
  // через їхній код в index.html. Ця функція — плейсхолдер для майбутнього
  // якщо Adsterra дасть глобальний скрипт.
}

// =============================================
// ПІДКЛЮЧЕННЯ ADSTERRA для "рекламного донату"
// Замінює стару функцію підключення реклами
// Вставте сюди Direct Link або onclick-код від Adsterra
// =============================================
function injectAdsterraSmartlink() {
  if (document.getElementById('adsterra-smartlink-tag')) return; // вже вставлено
  if (isBlocked()) return;                                        // пауза активна

  // TODO: замінити src на реальний скрипт Adsterra smartlink/direct link
  // Приклад: const script = document.createElement('script');
  //          script.id = 'adsterra-smartlink-tag';
  //          script.src = 'https://adsterra-script-url.js';
  //          document.head.appendChild(script);
  console.log('[Adsterra] smartlink script — вставте сюди код від Adsterra');
}

// =============================================
// АДМІН ЛІЧИЛЬНИК
// =============================================
function initAdminCounter() {
  const container = document.getElementById('my-stats-counter');
  if (!container) return;

  const isBoss = localStorage.getItem('iamtheboss') === 'true';

  // Лічильник крутиться завжди (для статистики), але бейдж видно тільки адміну
  const img = document.createElement('img');
  img.src = 'https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fdetectfraud.github.io&count_bg=%23795548&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=views&edge_flat=false';
  img.alt = 'Hits';

  if (isBoss) {
    container.classList.add('counter-box');
    const label = document.createElement('p');
    label.textContent = 'Перегляди:';
    container.appendChild(label);
    container.appendChild(img);
    // Показуємо через setProperty щоб перебити display:none
    container.style.setProperty('display', 'flex', 'important');
    // Зсуваємо lang-switcher щоб не перекривався з лічильником
    document.body.classList.add('has-counter');
  } else {
    // Для всіх — тихий лічильник, бейдж невидимий
    img.style.cssText = 'display:none!important;position:absolute;left:-9999px;';
    container.appendChild(img);
  }
}

// =============================================
// i18n РЕНДЕР
// =============================================
function setLang(lang) {
  const t = I18N[lang];
  if (!t) return;

  localStorage.setItem('lang', lang);
  document.documentElement.lang = t.html_lang;
  document.title = t.title;

  const set = (id, val, html) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (html) el.innerHTML = val; else el.textContent = val;
  };

  set('js-hero',           t.hero);
  set('js-sub',            t.sub);
  set('js-before-video',   t.before_video);
  set('js-post-text',      t.post_text);
  set('js-donate-heading', t.donate_heading);
  set('js-donate-text',    t.donate_text, true);
  set('js-next',           t.next);
  set('js-land-title',     t.land_title);
  set('js-land-p1',        t.land_p1);
  set('js-land-p2',        t.land_p2);
  set('js-land-p3',        t.land_p3);
  set('js-land-cta1',      t.land_cta1);
  set('js-land-cta2',      t.land_cta2);
  set('js-land-footer',    t.land_footer);
  set('js-inst-title',     t.inst_title);
  set('js-inst-intro',     t.inst_intro);
  set('js-inst-adblock-warn', t.inst_adblock);
  set('js-offer-text',     t.offer_text);
  set('js-cb-label',       t.cb_label);
  set('js-offer-yes',      t.yes_text);
  set('js-offer-no',       t.no_text);

  // read-more кнопки
  const readMoreBtn  = document.getElementById('js-read-more-btn');
  const moreContent  = document.getElementById('js-more-content');
  if (readMoreBtn && moreContent)
    readMoreBtn.textContent = moreContent.classList.contains('expanded') ? t.read_less : t.read_more;

  const instMoreBtn     = document.getElementById('js-inst-more-btn');
  const instMoreContent = document.getElementById('js-inst-more-content');
  if (instMoreBtn && instMoreContent)
    instMoreBtn.textContent = instMoreContent.classList.contains('expanded') ? t.inst_less : t.inst_more;

  // Список пунктів
  const listItems = document.querySelectorAll('.land-list li');
  const liKeys = ['land_li1','land_li2','land_li3','land_li4','land_li5','land_li6','land_li7'];
  listItems.forEach((li, i) => { if (liKeys[i]) li.textContent = t[liKeys[i]]; });

  // Статистика поста
  set('js-likes',    POST_CONFIG.likes);
  set('js-comments', POST_CONFIG.comments);
  set('js-shares',   POST_CONFIG.shares);

  // Кнопки мови
  const btnUk = document.getElementById('btn-uk');
  const btnEn = document.getElementById('btn-en');
  if (btnUk) btnUk.classList.toggle('active', lang === 'uk');
  if (btnEn) btnEn.classList.toggle('active', lang === 'en');

  // Кнопка донату
  set('js-donate-btn', t.donate_btn);

  // Смарт-кнопка
  const smartBtn = document.getElementById('js-smart-btn');
  if (smartBtn) {
    if (isBlocked()) {
      smartBtn.disabled = true;
      smartBtn.style.opacity = '0.5';
      smartBtn.style.cursor = 'not-allowed';
      smartBtn.textContent = t.smart_btn_locked + getBlockTimeString();
      // Видаляємо скрипт реклами в режимі паузи
      const adTag = document.getElementById('adsterra-smartlink-tag');
      if (adTag) adTag.remove();
    } else if (window._isAdblockDetected) {
      smartBtn.disabled = false;
      smartBtn.classList.add('blocked-by-adblock');
      smartBtn.textContent = lang === 'en'
        ? '⚠️ Disable AdBlock to Support'
        : '⚠️ Вимкніть AdBlock для донату';
    } else {
      smartBtn.disabled = false;
      smartBtn.classList.remove('blocked-by-adblock');
      smartBtn.style.opacity = '1';
      smartBtn.style.cursor = 'pointer';
      smartBtn.textContent = '💰 ' + t.smart_btn;
      injectAdsterraSmartlink();
    }
  }

  window._currentLang = lang;

  // Якщо adblock вже показується — оновлюємо текст
  if (window._isAdblockDetected) {
    const lines = t.adblock_lines.map(l => `<p>${l}</p>`).join('');
    document.querySelectorAll('.ad').forEach(el => {
      el.innerHTML = `<div class="adblock-msg">${lines}</div>`;
    });
    const stickyMsg = document.querySelector('#js-sticky .adblock-msg--sticky');
    if (stickyMsg) stickyMsg.textContent = t.adblock_sticky;
  }
}

// =============================================
// DOM READY
// =============================================
document.addEventListener('DOMContentLoaded', () => {

  // Лічильник адміна
  initAdminCounter();

  const smartBtn        = document.getElementById('js-smart-btn');
  const readMoreBtn     = document.getElementById('js-read-more-btn');
  const moreContent     = document.getElementById('js-more-content');
  const instMoreBtn     = document.getElementById('js-inst-more-btn');
  const instMoreContent = document.getElementById('js-inst-more-content');
  const offerModal      = document.getElementById('js-offer-modal');
  const neverShowCb     = document.getElementById('js-never-show-cb');
  const adminClearBtn   = document.getElementById('js-admin-clear-btn');

  // Повторний рендер через 100мс (щоб стан кнопок відповідав localStorage)
  setTimeout(() => setLang(window._currentLang || 'uk'), 100);

  // --- Виконання рекламного донату ---
  function executeAdDonation() {
    setBlock();
    const adTag = document.getElementById('adsterra-smartlink-tag');
    if (adTag) adTag.remove();
    setLang(window._currentLang || 'uk');
  }

  // --- Клік по смарт-кнопці ---
  if (smartBtn) {
    smartBtn.addEventListener('click', (e) => {
      if (smartBtn.disabled) return;

      if (smartBtn.classList.contains('blocked-by-adblock')) {
        e.preventDefault();
        const msg = window._currentLang === 'en'
          ? 'Please disable AdBlock to continue!'
          : 'Будь ласка, вимкніть AdBlock, щоб продовжити!';
        alert(msg);
        return;
      }

      const hideOffer = localStorage.getItem('hide_instruction_offer') === 'true';
      if (!hideOffer) {
        e.preventDefault();
        if (offerModal) offerModal.style.display = 'block';
        return;
      }

      // Ловимо blur (перехід на рекламну вкладку) → ставимо блок
      window.addEventListener('blur', function blurHandler() {
        setTimeout(executeAdDonation, 2000);
        window.removeEventListener('blur', blurHandler);
      }, { once: true });
    });
  }

  // --- Модалка пропозиції інструкції: ТАК ---
  const offerYes = document.getElementById('js-offer-yes');
  if (offerYes) {
    offerYes.addEventListener('click', () => {
      if (neverShowCb && neverShowCb.checked)
        localStorage.setItem('hide_instruction_offer', 'true');
      if (offerModal) offerModal.style.display = 'none';
      // Розгортаємо інструкцію
      if (instMoreContent && instMoreBtn) {
        instMoreContent.classList.add('expanded');
        const lang = window._currentLang || 'uk';
        instMoreBtn.textContent = I18N[lang].inst_less;
        instMoreContent.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // --- Модалка: НІ — одразу запускаємо донат ---
  const offerNo = document.getElementById('js-offer-no');
  if (offerNo) {
    offerNo.addEventListener('click', () => {
      if (neverShowCb && neverShowCb.checked)
        localStorage.setItem('hide_instruction_offer', 'true');
      if (offerModal) offerModal.style.display = 'none';

      window.addEventListener('blur', function blurHandler() {
        setTimeout(executeAdDonation, 2000);
        window.removeEventListener('blur', blurHandler);
      }, { once: true });
    });
  }

  // --- Тумблери розгортання ---
  if (readMoreBtn && moreContent) {
    readMoreBtn.addEventListener('click', () => {
      const expanded = moreContent.classList.toggle('expanded');
      const lang = window._currentLang || 'uk';
      readMoreBtn.textContent = expanded ? I18N[lang].read_less : I18N[lang].read_more;
    });
  }
  if (instMoreBtn && instMoreContent) {
    instMoreBtn.addEventListener('click', () => {
      const expanded = instMoreContent.classList.toggle('expanded');
      const lang = window._currentLang || 'uk';
      instMoreBtn.textContent = expanded ? I18N[lang].inst_less : I18N[lang].inst_more;
    });
  }

  // --- Адмін: скидання паузи ---
  if (adminClearBtn) {
    adminClearBtn.addEventListener('click', () => {
      localStorage.removeItem(keyTimeHash);
      localStorage.removeItem(keyStringHash);
      alert('🔒 Блокування скинуто! Кнопка активна.');
      location.reload();
    });
  }

  // --- Zoom картинок інструкції ---
  document.querySelectorAll('.zoom-img-box').forEach(box => {
    box.addEventListener('click', (e) => {
      e.stopPropagation();
      const img = box.querySelector('img');
      if (img) {
        if (img.style.transform === 'scale(2.5)') {
          img.style.transform = 'scale(1)';
          img.style.zIndex = '1';
        } else {
          img.style.transform = 'scale(2.5)';
          img.style.zIndex = '999';
        }
      }
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.zoom-img-box img').forEach(img => {
      img.style.transform = 'scale(1)';
      img.style.zIndex = '1';
    });
  });

  // --- Кнопки мови ---
  const btnUk = document.getElementById('btn-uk');
  const btnEn = document.getElementById('btn-en');
  if (btnUk) btnUk.addEventListener('click', () => setLang('uk'));
  if (btnEn) btnEn.addEventListener('click', () => setLang('en'));
});

// =============================================
// СТАРТ
// =============================================
(function () {
  const saved    = localStorage.getItem('lang');
  const urlLang  = new URLSearchParams(window.location.search).get('lng');
  const detected = saved || urlLang || 'uk';
  setLang(I18N[detected] ? detected : 'uk');
})();
