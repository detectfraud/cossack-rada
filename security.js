/**
 * S.A.F.E. Project - AdBlock Detector for Monetag
 * v.3.1 - Soft mode: показує повідомлення в рекламних блоках
 */
(function() {
    const isDebug = window.location.hash === "#test";
    if (isDebug) return;

    const MSG = `<div class="adblock-msg">
        <span class="adblock-icon">⚠️</span>
        <p>Схоже, у вас увімкнений блокувальник реклами.</p>
        <p>Ми створюємо цей серіал <strong>власним коштом</strong>.</p>
        <p>Реклама допомагає оплачувати AI-сервіси, монтаж та випуск нових серій.</p>
        <p>Будь ласка, додайте сайт у винятки AdBlock або підтримайте проєкт донатом ❤️</p>
    </div>`;

    const showAdblockMessage = () => {
        // Замінюємо вміст усіх .ad блоків
        document.querySelectorAll('.ad').forEach(el => {
            el.innerHTML = MSG;
        });
        // Замінюємо sticky bottom
        const sticky = document.querySelector('.sticky');
        if (sticky) {
            sticky.innerHTML = `<div class="adblock-msg adblock-msg--sticky">⚠️ Будь ласка, вимкніть AdBlock — реклама допомагає випускати нові серії ❤️</div>`;
        }
    };

    const checkAds = () => {
        // Метод 1: honeypot елемент з класами що блокує AdBlock
        const honeyPot = document.createElement('div');
        honeyPot.className = 'ad-unit banner-ad sponsored';
        honeyPot.style.cssText = 'position:absolute;left:-9999px;width:300px;height:250px;pointer-events:none;';
        document.body.appendChild(honeyPot);

        setTimeout(() => {
            const style = window.getComputedStyle(honeyPot);
            const blocked =
                honeyPot.offsetHeight === 0 ||
                honeyPot.offsetWidth === 0 ||
                style.display === 'none' ||
                style.visibility === 'hidden';

            honeyPot.remove();
            if (blocked) { showAdblockMessage(); return; }
        }, 800);

        // Метод 2: перевірка доступу до Monetag CDN
        fetch('https://cdn.monetag.com/tag.min.js', {
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-store'
        }).catch(() => {
            showAdblockMessage();
        });
    };

    // Блокування DevTools (залишаємо)
    const checkDev = () => {
        window.addEventListener('keydown', (e) => {
            if (
                e.keyCode === 123 ||
                (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
                (e.ctrlKey && e.shiftKey && e.keyCode === 74) ||
                (e.ctrlKey && e.keyCode === 85)
            ) {
                e.preventDefault();
            }
        });
    };

    if (document.readyState === 'complete') {
        checkAds();
        checkDev();
    } else {
        window.addEventListener('load', () => {
            checkAds();
            checkDev();
        });
    }

    document.addEventListener('contextmenu', e => e.preventDefault());
})();
