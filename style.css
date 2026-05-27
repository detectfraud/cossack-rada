/* =============================================
   КОЗАЦЬКИЙ СЕРІАЛ — style.css
   ============================================= */
* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #0f0f0f;
  color: #fff;
}

/* ===== ЛІЧИЛЬНИК АДМІНА ===== */
/* Показується тільки через JS (iamtheboss) */
#my-stats-counter {
  display: none; /* JS перевизначає через style.setProperty */
}
.counter-box {
  display: none; /* базовий стан — JS вмикає */
  align-items: center;
  justify-content: center;
  gap: 6px;
  /* Фіксована позиція поруч з lang-switcher */
  position: fixed;
  top: 10px;
  left: 15px;
  z-index: 1001; /* вище lang-switcher (1000) щоб не перекривався */
  background: gold;
  border-radius: 20px;
  padding: 0 12px;
  height: 28px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  cursor: default;
  font-family: Arial, sans-serif;
}
.counter-box p {
  margin: 0;
  font-size: 11px;
  font-weight: bold;
  color: #000;
  white-space: nowrap;
}
.counter-box img {
  display: block;
  height: 16px;
  width: auto;
}

/* ===== LANG SWITCHER — ВЛІВО, з відступом якщо є лічильник ===== */
.lang-switcher {
  position: fixed;
  top: 12px;
  left: 16px;
  z-index: 1000;
  display: flex;
  gap: 6px;
  /* Якщо лічильник активний — JS додає клас .has-counter до body,
     і lang-switcher зсувається правіше */
  transition: left 0.2s;
}
body.has-counter .lang-switcher {
  left: 160px; /* відступ від лічильника */
}
.lang-btn {
  padding: 5px 10px;
  border-radius: 20px;
  border: 1px solid #444;
  background: #1a1a1a;
  color: #aaa;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all .2s;
}
.lang-btn:hover { border-color: gold; color: gold; }
.lang-btn.active { background: gold; color: #000; border-color: gold; }

/* ===== LAYOUT ===== */
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.sidebar {
  width: 180px;
  padding: 10px;
  flex-shrink: 0;
}
.sidebar-sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 20px;
}
.content {
  flex-grow: 1;
  max-width: 800px;
  padding: 20px;
  padding-top: 50px;
}

/* ===== AD SLOTS ===== */
.ad {
  background: #1e1e1e;
  border-radius: 10px;
  width: 100%;
  min-width: 120px;
  max-width: 160px;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
  font-size: 12px;
  overflow: hidden;
}

/* ===== ADBLOCK MESSAGE ===== */
.adblock-msg {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  text-align: center;
  width: 100%;
}
.adblock-msg p { margin: 0; font-size: 11px; line-height: 1.5; color: #aaa; }
.adblock-msg strong { color: gold; }
.adblock-msg--sticky { font-size: 13px; color: #ccc; padding: 6px; }

/* ===== TYPOGRAPHY ===== */
h1 { text-align: center; color: gold; }
.card {
  background: #1b1b1b;
  padding: 15px;
  margin: 15px 0;
  border-radius: 12px;
}

/* ===== FB POST MOCK ===== */
.fb-post-mock {
  overflow: hidden;
  background: #242526;
  border-radius: 12px;
}
.fb-post-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px 8px;
}
.fb-author-info { display: flex; flex-direction: column; }
.fb-author-name { font-size: 14px; font-weight: 600; color: #e4e6eb; text-decoration: none; }
.fb-author-name:hover { text-decoration: underline; }
.fb-post-date { font-size: 12px; color: #8a8d91; margin-top: 1px; }
.fb-post-text {
  font-size: 14px; line-height: 1.6; color: #e4e6eb;
  padding: 0 16px 12px; margin: 0; white-space: pre-line;
}
.fb-stats {
  display: flex; gap: 20px;
  padding: 10px 16px;
  border-top: 1px solid #3a3b3c;
  background: #1c1e21;
}
.fb-stat { display: flex; align-items: center; gap: 5px; font-size: 13px; color: #8a8d91; }

/* ===== YOUTUBE VIDEO ===== */
.video-container {
  width: 100%;
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
}
.video-container iframe {
  position: absolute;
  top: 0; left: 0;
  width: 100% !important;
  height: 100% !important;
  border: none;
}

/* ===== DONATE SMART BUTTON ===== */
.donate-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
}
.donate-smart-btn {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 14px;
  font-size: 15px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  box-shadow: 0 4px 6px rgba(40,167,69,0.15);
  flex-grow: 1;
  text-align: center;
  width: 100%;
}
.donate-smart-btn:hover { background-color: #218838; }
.donate-smart-btn:active { transform: scale(0.99); }
.donate-smart-btn.blocked-by-adblock {
  background-color: #555 !important;
  color: #ccc !important;
  border: 1px dashed #888 !important;
  cursor: not-allowed !important;
  box-shadow: none !important;
}
.donate-smart-btn.blocked-by-adblock:hover { background-color: #666 !important; }

.btn-donatello {
  display: block;
  text-align: center;
  padding: 14px;
  background: gold;
  color: black;
  font-weight: bold;
  border-radius: 10px;
  text-decoration: none;
  transition: transform 0.1s;
}
.btn-donatello:active { transform: scale(0.99); }

/* ===== ЛЕНДІНГ ОПИС ===== */
.land-description-section {
  max-width: 800px;
  margin: 30px auto 15px auto;
  padding: 0 15px;
  color: #e0e0e0;
  line-height: 1.6;
  text-align: left;
}
.land-description-section h2 {
  font-size: 24px;
  color: #ffc107;
  margin-bottom: 15px;
  font-weight: bold;
}
.land-description-section p { margin-bottom: 12px; font-size: 16px; }

.more-content { display: none; }
.more-content.expanded { display: block; }

.read-more-link {
  background: none;
  border: none;
  color: #007bff;
  font-size: 15px;
  cursor: pointer;
  padding: 5px 0;
  font-weight: 500;
  transition: color 0.2s;
}
.read-more-link:hover { color: #0056b3; text-decoration: underline; }

.land-list {
  list-style: none;
  padding-left: 20px;
  margin-bottom: 15px;
}
.land-list li {
  position: relative;
  margin-bottom: 8px;
  font-size: 15px;
}
.land-list li::before {
  content: "•";
  color: #ffc107;
  font-weight: bold;
  position: absolute;
  left: -15px;
}
.cta-lead { font-weight: bold; margin-top: 15px; color: #fff; }
.land-footer-text { font-style: italic; margin-top: 20px; color: #ffc107; }

/* ===== NEXT CTA ===== */
.next-cta { text-align: center; font-size: 15px; color: #aaa; padding: 10px 0 4px; }

/* ===== STICKY BOTTOM ===== */
.sticky {
  display: none;
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: #111;
  padding: 8px;
  text-align: center;
  border-top: 1px solid #333;
  z-index: 999;
}

/* ===== MOBILE ===== */
@media (max-width: 900px) {
  .wrapper { display: block; }
  .sidebar { display: none; }
  .content { margin: 0; max-width: 100%; }
  .sticky  { display: none !important; }
  .donate-smart-btn { width: 100%; }
  body.has-counter .lang-switcher { left: 16px; }
  /* На мобільних лічильник іде праворуч щоб не перекривати кнопки */
  .counter-box {
    left: auto;
    right: 15px;
  }
}
