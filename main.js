/* =============================================
   КОЗАЦЬКИЙ СЕРІАЛ — main.js (30.05.2026)
   ============================================= */

const POST_CONFIG = {
  likes:    "109K",
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
    donate_btn:     "💰 ДОНАТ",
    next:           "Нові серії вже готуються 👀",
    post_text:      "Поширюйте цей ролик по всьому світу.\n«Ви навіть не уявляєте, як цей короткий ролик розхитує фундамент \"імперії зла\". Кожен ваш лайк, поширення чи коментар — навіть жовчний вигук ворога — це та сама крапля, що точить їхнє гниле корито, коли воно переповниться, то піде на дно так само впевнено й безславно, як їхній флагман \"Москва\". Ваша активність — це зброя, що наближає фінальне занурення»",
    
    land_title:     "«Козацькі Сміхолики»",
    land_p1:        "Козаки знову оживають — не в підручниках, а у веселих коротких історіях, жартах, пригодах і сучасних мемах.",
    land_p2:        "«Козацькі Сміхолики» — це серіал коротких роликів, у якому козацький дух поєднується з гумором, народною мудрістю та українським вайбом.",
    land_p3:        "Кожен ролик — це нова кумедна ситуація, несподіваний поворот або життєва історія, у якій легко впізнати себе, друзів чи сучасну Україну. Тут козаки можуть сперечатись через борщ, шукати скарб, “воювати” з лінощами або потрапляти в абсолютно абсурдні пригоди.",
    land_cta1:      "Якщо «Козацькі Сміхолики» запали вам у душу — підтримайте створення нових серій. Кожна підтримка допомагає:",
    land_li1:       "створювати нові ролики;",
    land_li2:       "покращувати анімацію та озвучку;",
    land_li3:       "вигадувати ще більше веселих сюжетів;",
    land_li4:       "розвивати український авторський контент.",
    land_cta2:      "А ще ви можете стати частиною проєкту:",
    land_li5:       "запропонувати власну тему чи ідею для нового ролика;",
    land_li6:       "проголосувати за сюжет, який хочете побачити наступним;",
    land_li7:       "вплинути на розвиток всесвіту «Козацьких Сміхоликів».",
    land_footer:    "Разом створимо серіал, який даруватиме людям усмішку та підніме дух 🇺🇦",
    read_more:      "читати більше",
    read_less:      "згорнути"
  },
  en: {
    html_lang:      "en",
    title:          "The Viral Cossack Series",
    hero:           "The Viral Cossack Series",
    sub:            "The video, which garnered millions of views on Facebook, was the start of a series of memes about the Cossacks.",
    before_video:   "The first episode that started it all 👇",
    donate_heading: "❤️ Support the Series",
    donate_text:    "This series is created independently and funded by its audience.<br>AI tools, scene generation, editing, and production all require resources.<br>If you enjoy this project — support future episodes ❤️",
    donate_btn:     "💰 DONATION",
    next:           "More episodes are coming soon 👀",
    post_text:      "Share this video all over the world.\n«You can't even imagine how this short video shakes the foundation of the \"empire of evil\". Every like, share, or comment — even an angry reaction from the enemy — is a drop that wears down their rotten trough. When it overflows, it will sink just as surely as their flagship \"Moskva\". Your activity is a weapon that hastens the final plunge»",
    
    land_title:     "“Cossack Smiholiky”",
    land_p1:        "Cossacks come to life once again — not in history textbooks, but in hilarious short stories, jokes, adventures, and modern memes.",
    land_p2:        "“Cossack Smiholiky” is a short-form video series where the free Cossack spirit perfectly blends with humor, folk wisdom, and authentic Ukrainian vibes.",
    land_p3:        "Each episode brings a new funny situation, an unexpected twist, or a relatable life story where you can easily recognize yourself, your friends, or modern Ukraine.",
    land_cta1:      "If “Cossack Smiholiky” captured your heart, please consider supporting the creation of new episodes. Every bit of support helps us to:",
    land_li1:       "produce new video episodes;",
    land_li2:       "improve animation and voice acting quality;",
    land_li3:       "brainstorm even more hilarious storylines;",
    land_li4:       "develop authentic Ukrainian independent content.",
    land_cta2:      "Moreover, you can become an active part of the project:",
    land_li5:       "suggest your own theme or idea for an upcoming episode;",
    land_li6:       "vote for the next storyline you want to see animated;",
    land_li7:       "influence the growth of the “Cossack Smiholiky” universe.",
    land_footer:    "Together, let's build a series that brings smiles and boosts the spirit 🇺🇦",
    read_more:      "read more",
    read_less:      "read less"
  }
};

window._currentLang = 'uk';

// i18n РЕНДЕР
function setLang(lang) {
  window._currentLang = lang;
  const t = I18N[lang];
  if (!t) return;

  localStorage.setItem('lang', lang);
  document.documentElement.lang = t.html_lang;
  document.title = t.title;

  if(document.getElementById('js-hero')) document.getElementById('js-hero').textContent = t.hero;
  if(document.getElementById('js-sub')) document.getElementById('js-sub').textContent = t.sub;
  if(document.getElementById('js-before-video')) document.getElementById('js-before-video').textContent = t.before_video;
  if(document.getElementById('js-post-text')) document.getElementById('js-post-text').textContent = t.post_text;
  if(document.getElementById('js-donate-heading')) document.getElementById('js-donate-heading').textContent = t.donate_heading;
  if(document.getElementById('js-donate-text')) document.getElementById('js-donate-text').innerHTML = t.donate_text;
  if(document.getElementById('js-next')) document.getElementById('js-next').textContent = t.next;

  if(document.getElementById('js-land-title')) document.getElementById('js-land-title').textContent = t.land_title;
  if(document.getElementById('js-land-p1')) document.getElementById('js-land-p1').textContent = t.land_p1;
  if(document.getElementById('js-land-p2')) document.getElementById('js-land-p2').textContent = t.land_p2;
  if(document.getElementById('js-land-p3')) document.getElementById('js-land-p3').textContent = t.land_p3;
  if(document.getElementById('js-land-cta1')) document.getElementById('js-land-cta1').textContent = t.land_cta1;
  if(document.getElementById('js-land-cta2')) document.getElementById('js-land-cta2').textContent = t.land_cta2;
  if(document.getElementById('js-land-footer')) document.getElementById('js-land-footer').textContent = t.land_footer;

  const lists = document.querySelectorAll('.land-list');
  if (lists.length >= 2) {
    const items1 = lists[0].querySelectorAll('li');
    if(items1.length >= 4) {
      items1[0].textContent = t.land_li1;
      items1[1].textContent = t.land_li2;
      items1[2].textContent = t.land_li3;
      items1[3].textContent = t.land_li4;
    }
    const items2 = lists[1].querySelectorAll('li');
    if(items2.length >= 3) {
      items2[0].textContent = t.land_li5;
      items2[1].textContent = t.land_li6;
      items2[2].textContent = t.land_li7;
    }
  }

  const readMoreBtn = document.getElementById('js-read-more-btn');
  const moreContent = document.getElementById('js-more-content');
  if(readMoreBtn && moreContent) {
    readMoreBtn.textContent = moreContent.classList.contains('expanded') ? t.read_less : t.read_more;
  }

  if(document.getElementById('js-donate-btn')) document.getElementById('js-donate-btn').textContent = t.donate_btn;
}

// ПОДІЇ ТА СЛУХАЧІ КНОПОК
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'uk';
  setLang(savedLang);

  document.getElementById('btn-uk').addEventListener('click', () => {
    document.getElementById('btn-uk').classList.add('active');
    document.getElementById('btn-en').classList.remove('active');
    setLang('uk');
  });
  document.getElementById('btn-en').addEventListener('click', () => {
    document.getElementById('btn-en').classList.add('active');
    document.getElementById('btn-uk').classList.remove('active');
    setLang('en');
  });

  const readMoreBtn = document.getElementById('js-read-more-btn');
  const moreContent = document.getElementById('js-more-content');
  if(readMoreBtn && moreContent) {
    readMoreBtn.addEventListener('click', () => {
      moreContent.classList.toggle('expanded');
      readMoreBtn.textContent = moreContent.classList.contains('expanded') ? I18N[window._currentLang].read_less : I18N[window._currentLang].read_more;
    });
  }

  if(document.getElementById('js-likes')) document.getElementById('js-likes').textContent = POST_CONFIG.likes;
  if(document.getElementById('js-comments')) document.getElementById('js-comments').textContent = POST_CONFIG.comments;
  if(document.getElementById('js-shares')) document.getElementById('js-shares').textContent = POST_CONFIG.shares;
});
