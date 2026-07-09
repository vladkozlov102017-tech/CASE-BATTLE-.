// ПОДКЛЮЧЕНИЕ СИСТЕМЫ ЗВУКОВ
const audioSpin = new Audio('sounds/spin.mp3');
const audioWin = new Audio('sounds/win.mp3');
const audioLose = new Audio('sounds/lose.mp3');

audioSpin.volume = 0.4;
audioWin.volume = 0.6;
audioLose.volume = 0.5;

// ПОЛНАЯ БАЗА ДАННЫХ (21 скин)
const skins = [
    { name: "AWP | Dragon Lore", price: 1500, rarity: "covert", img: "images/1.png" },
    { name: "Glock-18 | Fade", price: 400, rarity: "covert", img: "images/2.png" },
    { name: "AK-47 | Vulcan", price: 200, rarity: "classified", img: "images/3.png" },
    { name: "M4A4 | Asiimov", price: 120, rarity: "classified", img: "images/4.png" },
    { name: "USP-S | Cyrex", price: 15, rarity: "restricted", img: "images/5.png" },
    { name: "Desert Eagle | Light Rail", price: 5, rarity: "mil-spec", img: "images/6.png" },
    { name: "AK-47 | Asiimov", price: 110, rarity: "classified", img: "images/7.png" },
    { name: "M4A1-S | Printstream", price: 350, rarity: "covert", img: "images/8.png" },
    { name: "Desert Eagle | Code Red", price: 45, rarity: "classified", img: "images/9.png" },
    { name: "AWP | Fade", price: 950, rarity: "covert", img: "images/10.png" },
    { name: "SSG 08 | Blood in the Water", price: 65, rarity: "covert", img: "images/11.png" },

    // Ножи
    { name: "Karambit | Gamma Doppler", price: 1400, rarity: "covert", img: "images/knife1.png" },
    { name: "Butterfly Knife | Marble Fade", price: 1600, rarity: "covert", img: "images/knife2.png" },
    { name: "M9 Bayonet | Lore", price: 1100, rarity: "covert", img: "images/knife3.png" },
    { name: "Skeleton Knife | Fade", price: 900, rarity: "covert", img: "images/knife4.png" },
    { name: "Talon Knife | Tiger Tooth", price: 600, rarity: "classified", img: "images/knife5.png" },
    { name: "Bayonet | Autotronic", price: 450, rarity: "classified", img: "images/knife6.png" },
    { name: "Huntsman Knife | Doppler", price: 300, rarity: "restricted", img: "images/knife7.png" },
    { name: "Flip Knife | Crimson Web", price: 250, rarity: "restricted", img: "images/knife8.png" },
    { name: "Gut Knife | Vanilla", price: 100, rarity: "mil-spec", img: "images/knife9.png" },
    { name: "Navaja Knife | Case Hardened", price: 80, rarity: "mil-spec", img: "images/knife10.png" },

    // Перчатки
    { name: "Sport Gloves | Pandora's Box", price: 800, rarity: "covert", img: "images/glove1.png" },
    { name: "Specialist Gloves | Crimson Kimono", price: 700, rarity: "covert", img: "images/glove2.png" },
    { name: "Driver Gloves | King Snake", price: 500, rarity: "classified", img: "images/glove3.png" },
    { name: "Hand Wraps | Cobalt Skulls", price: 450, rarity: "classified", img: "images/glove4.png" },
    { name: "Moto Gloves | Spearmint", price: 200, rarity: "restricted", img: "images/glove5.png" },
    { name: "Bloodhound Gloves | Bronzed", price: 150, rarity: "restricted", img: "images/glove6.png" },
    { name: "Broken Fang Gloves | Jade", price: 100, rarity: "mil-spec", img: "images/glove7.png" }
];

// Шансы
const freeCaseWeights = [
    { name: "AWP | Dragon Lore", weight: 1 }, { name: "AWP | Fade", weight: 2 }, { name: "Glock-18 | Fade", weight: 3 },
    { name: "M4A1-S | Printstream", weight: 4 }, { name: "AK-47 | Vulcan", weight: 6 }, { name: "M4A4 | Asiimov", weight: 8 },
    { name: "AK-47 | Asiimov", weight: 10 }, { name: "SSG 08 | Blood in the Water", weight: 12 }, { name: "Desert Eagle | Code Red", weight: 15 },
    { name: "USP-S | Cyrex", weight: 25 }, { name: "Desert Eagle | Light Rail", weight: 50 }
];

const paidCaseWeights = [
    { name: "AWP | Dragon Lore", weight: 10 }, { name: "AWP | Fade", weight: 15 }, { name: "Glock-18 | Fade", weight: 20 },
    { name: "M4A1-S | Printstream", weight: 25 }, { name: "AK-47 | Vulcan", weight: 30 }, { name: "M4A4 | Asiimov", weight: 30 }
];

const knifeCaseWeights = [
    { name: "Butterfly Knife | Marble Fade", weight: 5 }, { name: "Karambit | Gamma Doppler", weight: 8 }, { name: "M9 Bayonet | Lore", weight: 12 },
    { name: "Skeleton Knife | Fade", weight: 15 }, { name: "Talon Knife | Tiger Tooth", weight: 20 }, { name: "Bayonet | Autotronic", weight: 25 },
    { name: "Huntsman Knife | Doppler", weight: 30 }, { name: "Flip Knife | Crimson Web", weight: 35 }, { name: "Gut Knife | Vanilla", weight: 50 },
    { name: "Navaja Knife | Case Hardened", weight: 60 }
];

const gloveCaseWeights = [
    { name: "Sport Gloves | Pandora's Box", weight: 5 }, { name: "Specialist Gloves | Crimson Kimono", weight: 8 },
    { name: "Driver Gloves | King Snake", weight: 15 }, { name: "Hand Wraps | Cobalt Skulls", weight: 20 },
    { name: "Moto Gloves | Spearmint", weight: 30 }, { name: "Bloodhound Gloves | Bronzed", weight: 40 },
    { name: "Broken Fang Gloves | Jade", weight: 55 }
];

const roulette = document.getElementById('roulette');
const spinBtn = document.getElementById('spin-btn');
const inventory = document.getElementById('inventory');
const balanceVal = document.getElementById('balance-val');

let balance = 1000;
const cardWidth = 130; 
let currentCase = 'free'; 
let caseQuantity = 1;
let playerInventory = [];
let selectedSkinForUpgrade = null;
let currentMultiplier = null;
let currentChance = 0;

const circle = document.getElementById('upgrade-circle');
const radius = circle ? circle.r.baseVal.value : 70;
const circumference = 2 * Math.PI * radius;
if (circle) {
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
}

function setProgress(percent) {
    if (!circle) return;
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

document.getElementById('btn-case-free')?.addEventListener('click', function() { if(spinBtn.disabled) return; switchCase('free', "Оружейный кейс (Бесплатно)", this); });
document.getElementById('btn-case-paid')?.addEventListener('click', function() { if(spinBtn.disabled) return; switchCase('paid', "Платный кейс (Цена: 50$)", this); });
document.getElementById('btn-case-knives')?.addEventListener('click', function() { if(spinBtn.disabled) return; switchCase('knives', "Кейс с ножами (Цена: 150$)", this); });
document.getElementById('btn-case-gloves')?.addEventListener('click', function() { if(spinBtn.disabled) return; switchCase('gloves', "Кейс с перчатками (Цена: 200$)", this); });

function switchCase(caseType, title, btn) {
    currentCase = caseType;
    document.querySelectorAll('.case-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('case-title').innerText = title;
    generateRouletteItems();
    updateSpinButtonText();
}

function getCaseCost() {
    if (currentCase === 'paid') return 50;
    if (currentCase === 'knives') return 150;
    if (currentCase === 'gloves') return 200;
    return 0;
}

function updateSpinButtonText() {
    if (!spinBtn) return;
    const total = getCaseCost() * caseQuantity;
    if (caseQuantity === 1) {
        spinBtn.innerText = total > 0 ? `Открыть кейс (${total}$)` : 'Открыть кейс';
    } else {
        spinBtn.innerText = total > 0 ? `Открыть ${caseQuantity} кейса (${total}$)` : `Открыть ${caseQuantity} кейса`;
    }
}

document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (spinBtn.disabled) return;
        document.querySelectorAll('.qty-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        caseQuantity = parseInt(this.getAttribute('data-qty'));
        updateSpinButtonText();
    });
});

function getRandomSkin() {
    let pool = freeCaseWeights;
    if (currentCase === 'paid') pool = paidCaseWeights;
    if (currentCase === 'knives') pool = knifeCaseWeights;
    if (currentCase === 'gloves') pool = gloveCaseWeights;
    let totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    for (let item of pool) {
        if (random < item.weight) return skins.find(s => s.name === item.name);
        random -= item.weight;
    }
}

function createSkinCardHTML(skin) {
    return `<img src="${skin.img}" alt="${skin.name}" class="skin-img"><div class="skin-info"><div class="skin-name">${skin.name}</div><div class="skin-price">${skin.price}$</div></div>`;
}

function generateRouletteItems() {
    if (!roulette) return;
    roulette.innerHTML = '';
    for (let i = 0; i < 35; i++) {
        let skin = getRandomSkin();
        let card = document.createElement('div');
        card.className = `skin-card ${skin.rarity}`;
        card.innerHTML = createSkinCardHTML(skin);
        if (i === 30) card.id = "winner-target"; 
        roulette.appendChild(card);
    }
}

// Открытие кейсов
spinBtn?.addEventListener('click', () => {
    const cost = getCaseCost() * caseQuantity;
    if (balance < cost) { alert("Недостаточно средств!"); return; }
    
    balance -= cost;
    balanceVal.innerText = balance;
    spinBtn.disabled = true;
    document.querySelectorAll('.qty-btn').forEach(b => b.disabled = true);

    audioSpin.currentTime = 0;
    audioSpin.play();

    roulette.style.transition = 'none';
    roulette.style.transform = 'translateX(0px)';
    roulette.offsetHeight; 
    generateRouletteItems();

    roulette.style.transition = 'transform 4s cubic-bezier(0.1, 0.8, 0.1, 1)';
    const wrapperWidth = document.querySelector('.roulette-wrapper').offsetWidth;
    const targetOffset = -(30 * cardWidth) + (wrapperWidth / 2) - (cardWidth / 2);
    const randomInCard = Math.floor(Math.random() * 40) - 20; 
    roulette.style.transform = `translateX(${targetOffset + randomInCard}px)`;

    setTimeout(() => {
        audioSpin.pause();
        audioWin.currentTime = 0;
        audioWin.play();

        const winnerCard = document.getElementById('winner-target');
        const winnerSkin = skins.find(s => winnerCard.innerHTML.includes(s.name));

        // Первый скин — тот, что показала рулетка; остальные (при открытии нескольких кейсов) докручиваются мгновенно
        const wonSkins = [winnerSkin];
        for (let i = 1; i < caseQuantity; i++) {
            wonSkins.push(getRandomSkin());
        }
        wonSkins.forEach(skin => addSkinToInventory(skin));
        showWinModal(wonSkins);

        spinBtn.disabled = false;
        document.querySelectorAll('.qty-btn').forEach(b => b.disabled = false);
    }, 4000);
});

function addSkinToInventory(skin) {
    playerInventory.push({ id: Date.now() + Math.random().toString(36).substr(2, 9), ...skin });
    renderInventory();
}

// НОВОЕ: РЕНДЕР ИНВЕНТАРЯ С ФУНКЦИЕЙ ПРОДАЖИ
function renderInventory() {
    if (!inventory) return;
    inventory.innerHTML = '';
    playerInventory.forEach(item => {
        let invCard = document.createElement('div');
        invCard.className = `skin-card ${item.rarity}`;
        invCard.innerHTML = createSkinCardHTML(item);
        
        // Кнопка «Продать» внутри карточки
        let sellBtn = document.createElement('button');
        sellBtn.className = 'sell-btn';
        sellBtn.innerText = `Продать за ${item.price}$`;
        
        // Клик по кнопке продает скин
        sellBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Чтобы не срабатывал выбор для апгрейда
            sellSkin(item);
        });

        // Клик по самой карточке выбирает её для апгрейда
        invCard.addEventListener('click', () => selectSkinForUpgrade(item));
        
        invCard.appendChild(sellBtn);
        inventory.appendChild(invCard);
    });
}

// НОВОЕ: ФУНКЦИЯ ПРОДАЖИ СКИНА
function sellSkin(item) {
    // Если скин сейчас заряжен в апгрейдер, сбрасываем его оттуда
    if (selectedSkinForUpgrade && selectedSkinForUpgrade.id === item.id) {
        selectedSkinForUpgrade = null;
        document.getElementById('selected-skin-slot').innerHTML = `<div class="slot-placeholder">Выберите скин из инвентаря</div>`;
        resetUpgradePanel();
    }
    
    // Удаляем из инвентаря
    playerInventory = playerInventory.filter(i => i.id !== item.id);
    
    // Добавляем деньги на баланс
    balance += item.price;
    balanceVal.innerText = balance;
    
    // Звук получения денег (используем win.mp3)
    audioWin.currentTime = 0;
    audioWin.play();
    
    renderInventory();
}

function selectSkinForUpgrade(item) {
    if(document.getElementById('upgrade-btn')?.innerText === "Колесо крутится...") return;
    selectedSkinForUpgrade = item;
    const slot = document.getElementById('selected-skin-slot');
    if (slot) slot.innerHTML = `<div class="skin-card ${item.rarity}">${createSkinCardHTML(item)}</div>`;
    updateUpgradeDetails();
}

document.querySelectorAll('.mult-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if(document.getElementById('upgrade-btn')?.innerText === "Колесо крутится...") return;
        document.querySelectorAll('.mult-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentMultiplier = parseInt(this.getAttribute('data-mult'));
        currentChance = currentMultiplier === 2 ? 50 : (currentMultiplier === 5 ? 30 : 5);
        document.getElementById('chance-percent').innerText = currentChance + '%';
        setProgress(currentChance);
        updateUpgradeDetails();
    });
});

function updateUpgradeDetails() {
    const upgradeBtn = document.getElementById('upgrade-btn');
    if (!upgradeBtn) return;
    if (selectedSkinForUpgrade && currentMultiplier) {
        document.getElementById('potential-win').innerText = (selectedSkinForUpgrade.price * currentMultiplier) + '$';
        upgradeBtn.disabled = false;
    } else {
        document.getElementById('potential-win').innerText = '0$';
        upgradeBtn.disabled = true;
    }
}

function resetUpgradePanel() {
    document.getElementById('upgrade-btn').innerText = "Апгрейд";
    document.querySelectorAll('.mult-btn').forEach(b => b.classList.remove('active'));
    currentMultiplier = null;
    currentChance = 0;
    document.getElementById('chance-percent').innerText = '0%';
    setProgress(0);
    updateUpgradeDetails();
}

// ЛОГИКА АПГРЕЙДА С АНИМАЦИЕЙ ПРОИГРЫША И ВЫИГРЫША
document.getElementById('upgrade-btn')?.addEventListener('click', function() {
    if (!selectedSkinForUpgrade || !currentMultiplier) return;

    const upgradeBtn = this;
    upgradeBtn.disabled = true;
    upgradeBtn.innerText = "Колесо крутится...";
    if (spinBtn) spinBtn.disabled = true;
    
    const pointer = document.getElementById('upgrade-pointer');
    if (!pointer) return;
    
    pointer.style.transition = 'none';
    pointer.style.transform = 'rotate(0deg)';
    pointer.offsetHeight; 

    audioSpin.currentTime = 0;
    audioSpin.play();

    const roll = Math.random() * 100;
    const isWin = roll <= currentChance; 
    let targetDegree = 0;
    let maxWinAngle = currentChance * 3.6; 

    if (isWin) {
        let randomWinAngle = Math.random() * (maxWinAngle - 10) + 5; 
        targetDegree = randomWinAngle - 90;
    } else {
        let randomLoseAngle = Math.random() * (360 - maxWinAngle - 10) + maxWinAngle + 5;
        targetDegree = randomLoseAngle - 90;
    }

    const totalRotation = 1800 + targetDegree; 

    setTimeout(() => {
        pointer.style.transition = 'transform 3s cubic-bezier(0.15, 0.85, 0.2, 1)';
        pointer.style.transform = `rotate(${totalRotation}deg)`;
    }, 15);

    setTimeout(() => {
        audioSpin.pause(); 

        // Скин сгорает в любом случае
        playerInventory = playerInventory.filter(item => item.id !== selectedSkinForUpgrade.id);

        if (isWin) {
            audioWin.currentTime = 0;
            audioWin.play();

            const targetPrice = selectedSkinForUpgrade.price * currentMultiplier;
            let rewardSkin = skins.reduce((prev, curr) => Math.abs(curr.price - targetPrice) < Math.abs(prev.price - targetPrice) ? curr : prev);
            addSkinToInventory(rewardSkin);
            showWinModal(rewardSkin);
        } else {
            // ОБНОВЛЕНО: Звук и плавный показ окна поражения
            audioLose.currentTime = 0;
            audioLose.play();
            showLoseModal();
        }

        selectedSkinForUpgrade = null;
        document.getElementById('selected-skin-slot').innerHTML = `<div class="slot-placeholder">Выберите скин из инвентаря</div>`;
        
        resetUpgradePanel();
        renderInventory();
        if (spinBtn) spinBtn.disabled = false;
    }, 3100);
});

function showWinModal(skinsWon) {
    const modal = document.getElementById('win-modal');
    const skinsArray = Array.isArray(skinsWon) ? skinsWon : [skinsWon];
    const container = document.getElementById('win-skin-container');
    const modalContent = document.querySelector('.win-modal-content');
    const titleEl = document.querySelector('.win-title');

    container.innerHTML = skinsArray.map(skin => `<div class="skin-card ${skin.rarity}">${createSkinCardHTML(skin)}</div>`).join('');

    const isMulti = skinsArray.length > 1;
    container.classList.toggle('multi', isMulti);
    if (modalContent) modalContent.classList.toggle('wide', isMulti);
    if (titleEl) titleEl.innerText = isMulti ? `ПОЗДРАВЛЯЕМ! (${skinsArray.length} шт.)` : "ПОЗДРАВЛЯЕМ!";

    modal.classList.add('active');
}

// НОВОЕ: Окно проигрыша
function showLoseModal() {
    document.getElementById('lose-modal').classList.add('active');
}

document.getElementById('close-modal-btn')?.addEventListener('click', () => {
    document.getElementById('win-modal').classList.remove('active');
});

// НОВОЕ: Закрытие окна проигрыша
document.getElementById('close-lose-btn')?.addEventListener('click', () => {
    document.getElementById('lose-modal').classList.remove('active');
});

generateRouletteItems();
updateSpinButtonText();