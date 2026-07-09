let rarityFilter = 'all';
let sortMode = 'newest';
let searchQuery = '';
let selectMode = false;
let selectedIds = new Set();

function renderStats() {
    const stats = getStats();
    const el = id => document.getElementById(id);
    if (el('stat-cases')) el('stat-cases').innerText = stats.totalCases;
    if (el('stat-spent')) el('stat-spent').innerText = stats.totalSpent;
    if (el('stat-won')) el('stat-won').innerText = stats.totalWon;
    if (el('stat-sold')) el('stat-sold').innerText = stats.totalSold;
    if (el('stat-best')) el('stat-best').innerText = stats.bestWin > 0 ? stats.bestWinName + ' (' + stats.bestWin + '$)' : '—';
}

function toggleSelectMode() {
    selectMode = !selectMode;
    selectedIds.clear();
    if (!selectMode) {
        document.getElementById('mass-sell-bar').style.display = 'none';
        document.getElementById('mass-select-toggle').classList.remove('active');
    } else {
        document.getElementById('mass-select-toggle').classList.add('active');
    }
    renderFullInventory();
}

function updateMassBar() {
    const bar = document.getElementById('mass-sell-bar');
    const countEl = document.getElementById('mass-count');
    const totalEl = document.getElementById('mass-total');
    if (!bar || !countEl || !totalEl) return;
    let total = 0;
    const inv = getInventory();
    selectedIds.forEach(id => {
        const item = inv.find(i => i.id === id);
        if (item) total += item.price;
    });
    countEl.innerText = selectedIds.size;
    totalEl.innerText = total;
    bar.style.display = selectedIds.size > 0 ? 'flex' : 'none';
}

function executeMassSell() {
    if (selectedIds.size === 0) return;
    if (!confirm(`Продать ${selectedIds.size} предметов?`)) return;
    let total = 0;
    selectedIds.forEach(id => {
        const inv = getInventory();
        const item = inv.find(i => i.id === id);
        if (item) total += item.price;
        removeFromInventory(id);
    });
    addBalance(total);
    updateBalanceDisplay();
    const stats = getStats();
    updateStats({ totalSold: stats.totalSold + total });
    audioWin.currentTime = 0;
    audioWin.play();
    selectedIds.clear();
    renderFullInventory();
}

function renderFullInventory() {
    const container = document.getElementById('inventory-grid');
    if (!container) return;
    searchQuery = (document.getElementById('inv-search')?.value || '').toLowerCase();
    sortMode = document.getElementById('inv-sort')?.value || 'newest';

    let items = getInventory();

    if (rarityFilter !== 'all') items = items.filter(i => i.rarity === rarityFilter);
    if (searchQuery) items = items.filter(i => i.name.toLowerCase().includes(searchQuery));

    const sortMap = {
        'newest': () => items.reverse(),
        'price-desc': () => items.sort((a, b) => b.price - a.price),
        'price-asc': () => items.sort((a, b) => a.price - b.price),
        'name': () => items.sort((a, b) => a.name.localeCompare(b.name)),
        'rarity': () => items.sort((a, b) => RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity) || b.price - a.price)
    };
    (sortMap[sortMode] || sortMap['newest'])();

    container.innerHTML = '';
    const countEl = document.getElementById('item-count');
    if (countEl) countEl.innerText = items.length;
    if (items.length === 0) {
        container.innerHTML = '<div class="inventory-empty">Ничего не найдено. <a href="index.html">Откройте кейсы</a></div>';
        return;
    }
    items.forEach(item => {
        let card = document.createElement('div');
        card.className = `skin-card ${item.rarity}`;
        if (selectedIds.has(item.id)) card.classList.add('selected');
        card.innerHTML = createSkinCardHTML(item);
        if (selectMode) {
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                if (selectedIds.has(item.id)) {
                    selectedIds.delete(item.id);
                    card.classList.remove('selected');
                } else {
                    selectedIds.add(item.id);
                    card.classList.add('selected');
                }
                updateMassBar();
            });
        } else {
            let sellBtn = document.createElement('button');
            sellBtn.className = 'sell-btn';
            sellBtn.innerText = `Продать за ${item.price}$`;
            sellBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                sellInventoryItem(item);
            });
            card.appendChild(sellBtn);
        }
        container.appendChild(card);
    });
    updateMassBar();
    renderStats();
}

function sellInventoryItem(item) {
    removeFromInventory(item.id);
    addBalance(item.price);
    updateBalanceDisplay();
    const stats = getStats();
    updateStats({ totalSold: stats.totalSold + item.price });
    audioWin.currentTime = 0;
    audioWin.play();
    renderFullInventory();
}

document.querySelectorAll('.rf-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.rf-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        rarityFilter = this.dataset.rarity;
        renderFullInventory();
    });
});

document.addEventListener('DOMContentLoaded', renderFullInventory);
