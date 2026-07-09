const circle = document.getElementById('upgrade-circle');
const radius = circle ? circle.r.baseVal.value : 70;
const circumference = 2 * Math.PI * radius;
if (circle) {
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
}

let selectedSkinForUpgrade = null;
let currentMultiplier = null;
let currentChance = 0;

function setProgress(percent) {
    if (!circle) return;
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

function renderInventoryForUpgrade() {
    const container = document.getElementById('upgrade-inventory');
    if (!container) return;
    const items = getInventory();
    container.innerHTML = '';
    if (items.length === 0) {
        container.innerHTML = '<div class="inventory-empty">В инвентаре нет скинов. Откройте кейсы!</div>';
        return;
    }
    items.forEach(item => {
        let card = document.createElement('div');
        card.className = `skin-card ${item.rarity}`;
        card.innerHTML = createSkinCardHTML(item);
        if (selectedSkinForUpgrade && selectedSkinForUpgrade.id === item.id) {
            card.classList.add('selected-skin');
        }
        card.addEventListener('click', () => selectSkinForUpgrade(item));
        container.appendChild(card);
    });
}

function selectSkinForUpgrade(item) {
    if(document.getElementById('upgrade-btn')?.innerText === "Колесо крутится...") return;
    selectedSkinForUpgrade = item;
    const slot = document.getElementById('selected-skin-slot');
    if (slot) slot.innerHTML = `<div class="skin-card ${item.rarity}">${createSkinCardHTML(item)}</div>`;
    updateUpgradeDetails();
    renderInventoryForUpgrade();
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
    const targetSlot = document.getElementById('target-skin-slot');
    if (selectedSkinForUpgrade && currentMultiplier) {
        const targetPrice = selectedSkinForUpgrade.price * currentMultiplier;
        let targetSkin = skins.reduce((prev, curr) => Math.abs(curr.price - targetPrice) < Math.abs(prev.price - targetPrice) ? curr : prev);
        document.getElementById('potential-win').innerText = targetPrice + '$';
        upgradeBtn.disabled = false;
        if (targetSlot) {
            targetSlot.innerHTML = `<div class="skin-card ${targetSkin.rarity}">${createSkinCardHTML(targetSkin)}</div>`;
        }
    } else {
        document.getElementById('potential-win').innerText = '0$';
        upgradeBtn.disabled = true;
        if (targetSlot) {
            targetSlot.innerHTML = `<div class="slot-placeholder">Цель апгрейда</div>`;
        }
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

document.getElementById('upgrade-btn')?.addEventListener('click', function() {
    if (!selectedSkinForUpgrade || !currentMultiplier) return;

    const upgradeBtn = this;
    upgradeBtn.disabled = true;
    upgradeBtn.innerText = "Колесо крутится...";

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
    let maxWinAngle = Math.max(currentChance * 3.6, 5);

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

        const oldId = selectedSkinForUpgrade.id;
        const skinPrice = selectedSkinForUpgrade.price;

        removeFromInventory(oldId);

        if (isWin) {
            audioWin.currentTime = 0;
            audioWin.play();
            const targetPrice = skinPrice * currentMultiplier;
            let rewardSkin = skins.reduce((prev, curr) => Math.abs(curr.price - targetPrice) < Math.abs(prev.price - targetPrice) ? curr : prev);
            const newId = addToInventory(rewardSkin);
            const inv = getInventory();
            const realItem = inv.find(x => x.id === newId);
            const stats = getStats();
            updateStats({ totalWon: stats.totalWon + (realItem ? realItem.price : rewardSkin.price) });
            showWinModalUpgrade(rewardSkin, newId);
        } else {
            audioLose.currentTime = 0;
            audioLose.play();
            showLoseModalUpgrade();
        }

        selectedSkinForUpgrade = null;
        document.getElementById('selected-skin-slot').innerHTML = `<div class="slot-placeholder">Выберите скин из инвентаря</div>`;
        resetUpgradePanel();
        renderInventoryForUpgrade();
    }, 3100);
});

function showWinModalUpgrade(skin, id) {
    const modal = document.getElementById('win-modal');
    const container = document.getElementById('win-skin-container');
    container.innerHTML = `<div class="win-item-wrapper">
        <div class="skin-card ${skin.rarity}">${createSkinCardHTML(skin)}</div>
        <div class="win-item-actions">
            <span class="win-item-price">${skin.price}$</span>
            <button class="sell-win-btn" onclick="sellWonItem('${id}', ${skin.price}, this)">Продать</button>
        </div>
    </div>`;
    modal.classList.add('active');
}

function showLoseModalUpgrade() {
    document.getElementById('lose-modal').classList.add('active');
}

document.getElementById('close-modal-btn')?.addEventListener('click', () => {
    document.getElementById('win-modal').classList.remove('active');
});

document.getElementById('close-lose-btn')?.addEventListener('click', () => {
    document.getElementById('lose-modal').classList.remove('active');
});

renderInventoryForUpgrade();
