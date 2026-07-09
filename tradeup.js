let tradeupSelection = [];

function renderTradeupSlots() {
    const container = document.getElementById('tradeup-slots');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        const slot = document.createElement('div');
        slot.className = 'tradeup-slot';
        if (tradeupSelection[i]) {
            const item = tradeupSelection[i];
            slot.innerHTML = `<div class="skin-card ${item.rarity}" style="width:100%;height:100%;margin:0;padding:4px">${createSkinCardHTML(item)}</div>`;
        } else {
            slot.innerHTML = `<div class="slot-placeholder" style="font-size:10px">${i+1}</div>`;
        }
        container.appendChild(slot);
    }
    updateTradeupInfo();
}

function updateTradeupInfo() {
    const info = document.getElementById('tradeup-info');
    const btn = document.getElementById('tradeup-btn');
    const resultSlot = document.getElementById('tradeup-result');
    if (!info) return;
    info.innerText = `Выбрано: ${tradeupSelection.length}/10`;
    if (tradeupSelection.length >= 5) {
        const rarities = tradeupSelection.map(i => i.rarity);
        const allSame = rarities.every(r => r === rarities[0]);
        if (allSame && getNextRarity(rarities[0])) {
            btn.disabled = false;
            info.innerText += ` → ${rarities[0]} → ${getNextRarity(rarities[0])}`;
            const possible = getRaritySkins(getNextRarity(rarities[0]));
            if (possible.length > 0 && resultSlot) {
                const avgMult = tradeupSelection.reduce((s, i) => s + (i.wearMult || 1), 0) / tradeupSelection.length;
                const preview = possible[Math.floor(Math.random() * possible.length)];
                resultSlot.innerHTML = `<div style="text-align:center;font-size:10px;color:#888">Пример:</div><div class="skin-card ${preview.rarity}" style="width:100%;height:auto;margin:2px 0;padding:4px">${createSkinCardHTML({...preview, price: Math.round(preview.price * avgMult), wearLabel: '?'})}</div>`;
            }
        } else {
            btn.disabled = true;
            if (!allSame) info.innerText += ' — скины должны быть одного ранга';
        }
    } else {
        btn.disabled = true;
    }
}

function renderTradeupInventory() {
    const container = document.getElementById('tradeup-inventory');
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
        if (tradeupSelection.find(t => t.id === item.id)) {
            card.classList.add('selected-skin');
        }
        card.addEventListener('click', () => toggleTradeupItem(item));
        container.appendChild(card);
    });
}

function toggleTradeupItem(item) {
    const idx = tradeupSelection.findIndex(t => t.id === item.id);
    if (idx >= 0) {
        tradeupSelection.splice(idx, 1);
    } else {
        if (tradeupSelection.length >= 10) return;
        if (tradeupSelection.length > 0 && item.rarity !== tradeupSelection[0].rarity) return;
        tradeupSelection.push(item);
    }
    renderTradeupSlots();
    renderTradeupInventory();
}

document.getElementById('tradeup-btn')?.addEventListener('click', () => {
    if (tradeupSelection.length < 5) return;
    const rarities = tradeupSelection.map(i => i.rarity);
    if (!rarities.every(r => r === rarities[0])) return;
    const nextRarity = getNextRarity(rarities[0]);
    if (!nextRarity) return;

    const ids = tradeupSelection.map(i => i.id);
    ids.forEach(id => removeFromInventory(id));

    const possible = getRaritySkins(nextRarity);
    const reward = possible[Math.floor(Math.random() * possible.length)];
    const avgMult = tradeupSelection.reduce((s, i) => s + (i.wearMult || 1), 0) / tradeupSelection.length;
    const wearRoll = Math.random();
    let resultWear;
    if (avgMult > 1.0) {
        resultWear = wearRoll < 0.3 ? WEARS[0] : wearRoll < 0.6 ? WEARS[1] : WEARS[2];
    } else if (avgMult > 0.7) {
        resultWear = wearRoll < 0.2 ? WEARS[0] : wearRoll < 0.4 ? WEARS[1] : wearRoll < 0.6 ? WEARS[2] : WEARS[3];
    } else {
        resultWear = wearRoll < 0.15 ? WEARS[1] : wearRoll < 0.35 ? WEARS[2] : wearRoll < 0.55 ? WEARS[3] : WEARS[4];
    }
    const finalPrice = Math.round(reward.price * resultWear.mult);
    const newId = addToInventory({ ...reward, wear: resultWear });

    tradeupSelection = [];
    renderTradeupSlots();
    renderTradeupInventory();

    const container = document.getElementById('win-skin-container');
    if (container) {
        container.innerHTML = `<div class="win-item-wrapper"><div class="skin-card ${reward.rarity}">${createSkinCardHTML({...reward, price: finalPrice, wearLabel: resultWear.label})}</div></div>`;
    }
    audioWin.play();
    document.getElementById('win-modal').classList.add('active');

    const stats = getStats();
    updateStats({ totalWon: stats.totalWon + finalPrice });
});

document.getElementById('close-modal-btn')?.addEventListener('click', () => {
    document.getElementById('win-modal').classList.remove('active');
});

renderTradeupSlots();
renderTradeupInventory();
