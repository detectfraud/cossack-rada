// =============================================
// МИТТЄВЕ IP БЛОКУВАННЯ ТА БЕЗКІНЕЧНЕ ЗАВАНТАЖЕННЯ
// =============================================
(function () {
  const BLOCKED_COUNTRIES = ['RU', 'BY'];

  const showGeoBlock = () => {
    // Зупиняємо будь-яке подальше завантаження сторінки, скриптів та картинок
    window.stop(); 
    
    // Повністю блокуємо інтерфейс і вмикаємо вічний спінер
    document.documentElement.innerHTML = `
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Завантаження...</title>
        <style>
          html, body { margin: 0; padding: 0; width: 100%; height: 100%; background: #0a0a0a; overflow: hidden; }
          @keyframes _spin { to { transform: rotate(360deg); } }
          ._loader { position: fixed; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; font-family: Arial, sans-serif; }
          ._spinner { width: 40px; height: 40px; border: 3px solid #1a1a1a; border-top-color: #ffd700; border-radius: 50%; animation: _spin 1.1s linear infinite; }
          ._loader-text { color: #555; font-size: 13px; letter-spacing: 1px; }
        </style>
      </head>
      <body>
        <div class="_loader">
          <div class="_spinner"></div>
          <span class="_loader-text">Завантаження сторінки...</span>
        </div>
      </body>`;
  };

  // Робимо запит. Завдяки cache: 'no-store' провайдери не підсунуть старий результат
  fetch('https://ip-api.com/json/?fields=countryCode', { cache: 'no-store' })
    .then(r => r.json())
    .then(data => { 
      if (BLOCKED_COUNTRIES.includes(data.countryCode)) {
        showGeoBlock(); 
      }
    })
    .catch(() => {
      // Якщо увімкнено жорсткий VPN, який блокує сам API запит,
      // сайт продовжить завантажуватись для звичайних людей.
    });
})();