const eventPools = [
    [
        { name: "AK-47 | Bloodsport", weight: 18 },
        { name: "USP-S | Printstream", weight: 18 },
        { name: "M4A4 | X-Ray", weight: 18 },
        { name: "AK-47 | Fire Serpent", weight: 16 },
        { name: "M4A4 | Howl", weight: 16 },
        { name: "AWP | Gungnir", weight: 14 }
    ],
    [
        { name: "AK-47 | Fire Serpent", weight: 18 },
        { name: "AK-47 | Bloodsport", weight: 17 },
        { name: "USP-S | Printstream", weight: 17 },
        { name: "M4A4 | Howl", weight: 16 },
        { name: "Sport Gloves | Pandora", weight: 16 },
        { name: "M4A1-S | Mecha Industries", weight: 16 }
    ],
    [
        { name: "AWP | Gungnir", weight: 18 },
        { name: "M4A1-S | Mecha Industries", weight: 18 },
        { name: "AK-47 | Bloodsport", weight: 17 },
        { name: "USP-S | Printstream", weight: 17 },
        { name: "M4A4 | Howl", weight: 16 },
        { name: "Sport Gloves | Pandora", weight: 14 }
    ],
    [
        { name: "M4A4 | Howl", weight: 18 },
        { name: "Sport Gloves | Pandora", weight: 18 },
        { name: "AK-47 | Fire Serpent", weight: 17 },
        { name: "M4A4 | X-Ray", weight: 17 },
        { name: "AWP | Gungnir", weight: 16 },
        { name: "AK-47 | Bloodsport", weight: 14 }
    ],
    [
        { name: "M4A1-S | Mecha Industries", weight: 18 },
        { name: "AWP | Gungnir", weight: 18 },
        { name: "M4A4 | X-Ray", weight: 17 },
        { name: "Sport Gloves | Pandora", weight: 17 },
        { name: "AK-47 | Fire Serpent", weight: 16 },
        { name: "USP-S | Printstream", weight: 14 }
    ]
];

const caseData = {
    free: {
        title: "Бесплатный кейс (0$)",
        cost: 0,
        pool: [
            { name: "Desert Eagle | Light Rail", weight: 45 },
            { name: "USP-S | Cyrex", weight: 30 },
            { name: "Desert Eagle | Code Red", weight: 15 },
            { name: "SSG 08 | Blood in the Water", weight: 8 },
            { name: "Bloodhound Gloves | Bronzed", weight: 2 },
            { name: "Hand Wraps | Leather", weight: 1 }
        ]
    },
    case200: {
        title: "Оружейный кейс (200$)",
        cost: 200,
        pool: [
            { name: "AK-47 | Asiimov", weight: 30 },
            { name: "M4A4 | Asiimov", weight: 25 },
            { name: "AK-47 | Vulcan", weight: 20 },
            { name: "M4A1-S | Printstream", weight: 15 },
            { name: "Glock-18 | Fade", weight: 8 },
            { name: "AWP | Fade", weight: 2 }
        ]
    },
    case300: {
        title: "Кейс с перчатками (300$)",
        cost: 300,
        pool: [
            { name: "Bloodhound Gloves | Bronzed", weight: 35 },
            { name: "Hand Wraps | Leather", weight: 25 },
            { name: "Specialist Gloves | Emerald Web", weight: 20 },
            { name: "Moto Gloves | Spearmint", weight: 12 },
            { name: "Driver Gloves | King Snake", weight: 5 },
            { name: "Sport Gloves | Vice", weight: 3 }
        ]
    },
    case500: {
        title: "Кейс с ножами (500$)",
        cost: 500,
        pool: [
            { name: "Navaja Knife | Case Hardened", weight: 30 },
            { name: "Gut Knife | Vanilla", weight: 25 },
            { name: "Flip Knife | Crimson Web", weight: 18 },
            { name: "Huntsman Knife | Doppler", weight: 14 },
            { name: "Bayonet | Autotronic", weight: 8 },
            { name: "Talon Knife | Tiger Tooth", weight: 3 },
            { name: "Skeleton Knife | Fade", weight: 2 }
        ]
    },
    premium: {
        title: "Премиум кейс (1000$)",
        cost: 1000,
        pool: [
            { name: "Talon Knife | Tiger Tooth", weight: 25 },
            { name: "Skeleton Knife | Fade", weight: 22 },
            { name: "Sport Gloves | Vice", weight: 18 },
            { name: "M9 Bayonet | Lore", weight: 15 },
            { name: "AWP | Fade", weight: 10 },
            { name: "Karambit | Gamma Doppler", weight: 6 },
            { name: "Butterfly Knife | Marble Fade", weight: 4 }
        ]
    },
    // 5 NEW CASES with new skins only
    case150: {
        title: "Опасная зона (150$)",
        cost: 150,
        pool: [
            { name: "Galil AR | Blue Titanium", weight: 25 },
            { name: "MP7 | Whiteout", weight: 22 },
            { name: "MP9 | Ruby Poison Dart", weight: 20 },
            { name: "P90 | Asiimov", weight: 18 },
            { name: "P250 | Whiteout", weight: 15 }
        ]
    },
    case350: {
        title: "Перелом (350$)",
        cost: 350,
        pool: [
            { name: "P250 | Kintsugi", weight: 22 },
            { name: "SSG 08 | Acid Fade", weight: 20 },
            { name: "MAC-10 | Neon Rider", weight: 18 },
            { name: "MP9 | Rose", weight: 16 },
            { name: "FAMAS | Eye of Athena", weight: 14 },
            { name: "AWP | BOOM", weight: 10 }
        ]
    },
    case600: {
        title: "Схватка (600$)",
        cost: 600,
        pool: [
            { name: "Desert Eagle | Cobalt Disruption", weight: 20 },
            { name: "Desert Eagle | Blaze", weight: 18 },
            { name: "USP-S | Kill Confirmed", weight: 16 },
            { name: "Glock-18 | Water Elemental", weight: 15 },
            { name: "AK-47 | Redline", weight: 14 },
            { name: "M4A4 | X-Ray", weight: 10 },
            { name: "M4A1-S | Mecha Industries", weight: 7 }
        ]
    },
    case800: {
        title: "Призма (800$)",
        cost: 800,
        pool: [
            { name: "AK-47 | Bloodsport", weight: 20 },
            { name: "USP-S | Printstream", weight: 18 },
            { name: "M4A4 | Howl", weight: 17 },
            { name: "Sport Gloves | Pandora", weight: 15 },
            { name: "AK-47 | Fire Serpent", weight: 14 },
            { name: "AWP | Gungnir", weight: 14 },
            { name: "M4A4 | X-Ray", weight: 12 }
        ]
    },
    case1200: {
        title: "Змеиный укус (1200$)",
        cost: 1200,
        pool: [
            { name: "AWP | Gungnir", weight: 20 },
            { name: "AK-47 | Fire Serpent", weight: 18 },
            { name: "M4A4 | Howl", weight: 16 },
            { name: "AK-47 | Bloodsport", weight: 14 },
            { name: "M4A1-S | Mecha Industries", weight: 12 },
            { name: "Sport Gloves | Pandora", weight: 10 },
            { name: "USP-S | Printstream", weight: 10 }
        ]
    },
    event: {
        title: "Ивентовый кейс (750$) — скины меняются каждый час",
        cost: 750,
        pool: eventPools[0]
    }
};

const cardWidth = 96;
let currentCaseType = 'free';
let currentQuantity = 1;
let isSpinning = false;

const modal = document.getElementById('case-modal');
const modalTitle = document.getElementById('modal-case-title');
const modalCost = document.getElementById('modal-cost');
const roulettesContainer = document.getElementById('modal-roulettes');
const spinBtn = document.getElementById('modal-spin-btn');

function getRandomFromPool(pool) {
    let totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    for (let item of pool) {
        if (random < item.weight) return skins.find(s => s.name === item.name);
        random -= item.weight;
    }
}

function generateRouletteItems(rouletteEl) {
    if (!rouletteEl) return;
    rouletteEl.innerHTML = '';
    const pool = caseData[currentCaseType].pool;
    for (let i = 0; i < 35; i++) {
        let skin = getRandomFromPool(pool);
        let card = document.createElement('div');
        card.className = `skin-card ${skin.rarity}`;
        card.innerHTML = createSkinCardHTML(skin);
        if (i === 30) card.dataset.winner = 'true';
        rouletteEl.appendChild(card);
    }
}

function buildRoulettes(count) {
    if (!roulettesContainer) return;
    roulettesContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const item = document.createElement('div');
        item.className = 'modal-roulette-item';
        const r = document.createElement('div');
        r.className = 'roulette';
        r.id = `roulette-${i}`;
        item.innerHTML = '<div class="selector"></div>';
        item.appendChild(r);
        roulettesContainer.appendChild(item);
        generateRouletteItems(r);
    }
}

function renderCaseContents() {
    const grid = document.getElementById('contents-grid');
    if (!grid) return;
    const pool = caseData[currentCaseType].pool;
    const totalWeight = pool.reduce((s, i) => s + i.weight, 0);
    pool.sort((a, b) => a.weight - b.weight);
    grid.innerHTML = pool.map(item => {
        const skin = skins.find(s => s.name === item.name);
        if (!skin) return '';
        const chance = ((item.weight / totalWeight) * 100).toFixed(1);
        return `<div class="contents-item" data-rarity="${skin.rarity}">
            <img class="ci-img" src="${skin.img}" alt="">
            <span class="ci-name">${skin.name}</span>
            <span class="ci-price">${skin.price}$</span>
            <span class="ci-chance">${chance}%</span>
        </div>`;
    }).join('');
}

function openCaseModal(caseType) {
    currentCaseType = caseType;
    currentQuantity = 1;
    if (caseType === 'event') {
        const slot = getCurrentEventSlot();
        caseData.event.pool = eventPools[slot];
        const slotNames = ['🔥 Огненный', '🔥 Кровавый', '🔥 Теневой', '🔥 Ледяной', '🔥 Ядовитый'];
        caseData.event.title = `${slotNames[slot]} ивент (750$) — меняется каждый час`;
    }
    document.querySelectorAll('.qty-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.qty-btn[data-qty="1"]')?.classList.add('active');
    document.querySelectorAll('.case-card').forEach(b => b.classList.remove('active'));
    document.querySelector(`.case-card[data-case="${caseType}"]`)?.classList.add('active');
    modalTitle.innerText = caseData[caseType].title;
    updateModalCost();
    renderCaseContents();
    buildRoulettes(1);
    modal.classList.add('active');
}

function updateModalCost() {
    const data = caseData[currentCaseType];
    modalCost.innerText = `Стоимость: ${data.cost * currentQuantity}$`;
}

document.querySelectorAll('.case-card').forEach(card => {
    card.addEventListener('click', function() {
        const caseType = this.dataset.case;
        if (caseType) openCaseModal(caseType);
    });
});

document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (isSpinning) return;
        document.querySelectorAll('.qty-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentQuantity = parseInt(this.dataset.qty);
        updateModalCost();
        buildRoulettes(currentQuantity);
    });
});

document.getElementById('modal-close')?.addEventListener('click', () => modal.classList.remove('active'));
modal?.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

spinBtn?.addEventListener('click', () => {
    if (isSpinning) return;
    const data = caseData[currentCaseType];
    const totalCost = data.cost * currentQuantity;
    if (getBalance() < totalCost) { alert("Недостаточно средств!"); return; }

    isSpinning = true;
    addBalance(-totalCost);
    updateBalanceDisplay();
    spinBtn.disabled = true;
    spinBtn.innerText = "Открытие...";

    audioSpin.currentTime = 0;
    audioSpin.play();

    document.querySelector('.modal-roulettes')?.classList.add('spinning');
    for (let i = 0; i < 15; i++) {
        setTimeout(() => spawnParticles(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight,
            ['#e5b042','#ff4747','#d32ce6','#4ade80'][Math.floor(Math.random()*4)],
            3
        ), i * 80);
    }

    const wheels = [];
    for (let i = 0; i < currentQuantity; i++) {
        const r = document.getElementById(`roulette-${i}`);
        if (!r) continue;
        r.style.transition = 'none';
        r.style.transform = 'translateX(0px)';
        r.offsetHeight;
        generateRouletteItems(r);
        wheels.push(r);
    }

    for (let r of wheels) {
        r.style.transition = 'transform 4s cubic-bezier(0.1, 0.8, 0.1, 1)';
        const wrapperWidth = r.parentElement.offsetWidth;
        const targetOffset = -(30 * cardWidth) + (wrapperWidth / 2) - (cardWidth / 2);
        const randomInCard = Math.floor(Math.random() * 40) - 20;
        r.style.transform = `translateX(${targetOffset + randomInCard}px)`;
    }

    setTimeout(() => {
        audioSpin.pause();
        const winners = [];
        const winIds = [];
        let totalWonThis = 0;
        let bestThis = 0;
        for (let i = 0; i < currentQuantity; i++) {
            const r = document.getElementById(`roulette-${i}`);
            if (!r) continue;
            const winnerCard = r.querySelector('[data-winner="true"]');
            if (winnerCard) {
                const baseSkin = skins.find(s => winnerCard.innerHTML.includes(s.name));
                if (baseSkin) {
                    const id = addToInventory(baseSkin);
                    const inv = getInventory();
                    const realItem = inv.find(x => x.id === id);
                    winners.push(realItem || baseSkin);
                    winIds.push(id);
                    totalWonThis += (realItem ? realItem.price : baseSkin.price);
                    if ((realItem ? realItem.price : baseSkin.price) > bestThis) bestThis = (realItem ? realItem.price : baseSkin.price);
                }
            }
        }
        const caseCfg = caseData[currentCaseType];
        const statsData = loadData();
        statsData.stats.totalCases += currentQuantity;
        statsData.stats.totalSpent += caseCfg.cost * currentQuantity;
        statsData.stats.totalWon += totalWonThis;
        if (bestThis > statsData.stats.bestWin) { statsData.stats.bestWin = bestThis; statsData.stats.bestWinName = winners[0]?.name || ''; }
        saveData(statsData);
        document.querySelector('.modal-roulettes')?.classList.remove('spinning');
        if (winners.length > 0) {
            document.body.classList.add('screen-flash');
            for (let i = 0; i < 30; i++) {
                setTimeout(() => spawnParticles(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight,
                    ['#e5b042','#ff4747','#d32ce6','#4ade80','#60a5fa'][Math.floor(Math.random()*5)],
                    5
                ), i * 100);
            }
            setTimeout(() => document.body.classList.remove('screen-flash'), 800);
            showWinModal(winners, winIds);
        }
        spinBtn.disabled = false;
        spinBtn.innerText = "Открыть";
        isSpinning = false;
    }, 4000);
});

let lastWinIds = [];
let lastWinSkins = [];

function sellWonItem(id, price, el) {
    removeFromInventory(id);
    addBalance(price);
    updateBalanceDisplay();
    const stats = getStats();
    updateStats({ totalSold: stats.totalSold + price });
    const wrapper = el.closest('.win-item-wrapper');
    if (wrapper) {
        wrapper.style.opacity = '0.3';
        wrapper.querySelector('.sell-win-btn')?.remove();
    }
    lastWinIds = lastWinIds.filter(i => i !== id);
    recalcWinSum();
}

function sellAllWon() {
    let total = 0;
    for (const id of lastWinIds) {
        const item = getInventory().find(i => i.id === id);
        if (item) total += item.price;
        removeFromInventory(id);
    }
    addBalance(total);
    updateBalanceDisplay();
    const stats = getStats();
    updateStats({ totalSold: stats.totalSold + total });
    document.getElementById('win-modal')?.classList.remove('active');
}

function recalcWinSum() {
    let total = 0;
    const wrappers = document.querySelectorAll('#win-skin-container .win-item-wrapper');
    wrappers.forEach(w => {
        const priceEl = w.querySelector('.win-item-price');
        if (priceEl && w.querySelector('.sell-win-btn')) {
            total += parseInt(priceEl.textContent) || 0;
        }
    });
    document.getElementById('win-sum').innerText = total + '$';
}

function showWinModal(skins, ids) {
    const modal = document.getElementById('win-modal');
    const container = document.getElementById('win-skin-container');
    if (!container) return;
    const arr = Array.isArray(skins) ? skins : [skins];
    lastWinIds = ids || [];
    lastWinSkins = arr;
    container.innerHTML = arr.map((s, i) => `
        <div class="win-item-wrapper">
            <div class="skin-card ${s.rarity}">${createSkinCardHTML(s)}</div>
            <div class="win-item-actions">
                <span class="win-item-price">${s.price}$</span>
                <button class="sell-win-btn" onclick="sellWonItem('${lastWinIds[i] || ''}', ${s.price}, this)">Продать</button>
            </div>
        </div>
    `).join('');
    recalcWinSum();
    audioWin.currentTime = 0;
    audioWin.play();
    modal.classList.add('active');
}

document.getElementById('close-modal-btn')?.addEventListener('click', () => {
    document.getElementById('win-modal').classList.remove('active');
});
document.getElementById('sell-all-btn')?.addEventListener('click', sellAllWon);

document.querySelector('.case-card[data-case="free"]')?.classList.add('active');

// === DAILY + EVENT TIMERS ===
function clickDaily() {
    if (!canClaimDaily()) return;
    claimDaily();
    updateDailyUI();
    alert("Вы получили 100$ бонуса!");
}

function updateDailyUI() {
    const card = document.getElementById('daily-card');
    if (!card) return;
    if (canClaimDaily()) {
        card.classList.add('claimable');
        document.getElementById('daily-status').innerText = '100$';
    } else {
        card.classList.remove('claimable');
        const t = getDailyTimer();
        const m = Math.floor(t / 60000);
        const s = Math.floor((t % 60000) / 1000);
        document.getElementById('daily-status').innerText = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    }
}

function updateEventUI() {
    const card = document.getElementById('event-case-card');
    const timerEl = document.getElementById('event-timer');
    const priceEl = document.getElementById('event-case-price');
    if (!card || !timerEl) return;
    const t = getEventTimer();
    const m = Math.floor(t / 60000);
    const s = Math.floor((t % 60000) / 1000);
    timerEl.innerText = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    card.style.display = '';
    const slot = getCurrentEventSlot();
    const slotNames = ['🔥 Огненный', '🔥 Кровавый', '🔥 Теневой', '🔥 Ледяной', '🔥 Ядовитый'];
    card.querySelector('.event-case-label').innerText = slotNames[slot];
    if (priceEl) priceEl.innerText = '750$';
}

function tickTimers() {
    updateDailyUI();
    updateEventUI();
}
setInterval(tickTimers, 1000);
tickTimers();
