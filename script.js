const APP_KEY = 'cs_case_data';

const audioSpin = new Audio('sounds/spin.mp3');
const audioWin = new Audio('sounds/win.mp3');
const audioLose = new Audio('sounds/lose.mp3');
audioSpin.volume = 0.4;
audioWin.volume = 0.6;
audioLose.volume = 0.5;

const WEARS = [
    { id: 'fn', label: 'FN', mult: 1.2, color: '#4ade80' },
    { id: 'mw', label: 'MW', mult: 1.0, color: '#22d3ee' },
    { id: 'ft', label: 'FT', mult: 0.8, color: '#facc15' },
    { id: 'ww', label: 'WW', mult: 0.6, color: '#fb923c' },
    { id: 'bs', label: 'BS', mult: 0.4, color: '#f87171' }
];

function randomWear() {
    const r = Math.random();
    if (r < 0.10) return WEARS[0]; // FN 10%
    if (r < 0.30) return WEARS[1]; // MW 20%
    if (r < 0.55) return WEARS[2]; // FT 25%
    if (r < 0.78) return WEARS[3]; // WW 23%
    return WEARS[4];               // BS 22%
}

const RARITY_ORDER = ['mil-spec', 'restricted', 'classified', 'covert'];

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
    { name: "Sport Gloves | Vice", price: 800, rarity: "covert", img: "images/glove1.png" },
    { name: "Driver Gloves | King Snake", price: 700, rarity: "covert", img: "images/glove2.png" },
    { name: "Moto Gloves | Spearmint", price: 550, rarity: "classified", img: "images/glove3.png" },
    { name: "Specialist Gloves | Emerald Web", price: 450, rarity: "classified", img: "images/glove4.png" },
    { name: "Hand Wraps | Leather", price: 150, rarity: "restricted", img: "images/glove5.png" },
    { name: "Bloodhound Gloves | Bronzed", price: 100, rarity: "restricted", img: "images/glove6.png" },
    { name: "Sport Gloves | Pandora", price: 900, rarity: "covert", img: "images/glove7.png" },
    { name: "AK-47 | Fire Serpent", price: 750, rarity: "covert", img: "images/skin_ak_fire.png" },
    { name: "AWP | Gungnir", price: 1300, rarity: "covert", img: "images/skin_awp_gungnir.png" },
    { name: "M4A4 | Howl", price: 500, rarity: "covert", img: "images/skin_m4_howl.png" },
    { name: "Desert Eagle | Blaze", price: 280, rarity: "classified", img: "images/skin_deagle_blaze.png" },
    { name: "USP-S | Kill Confirmed", price: 180, rarity: "classified", img: "images/skin_usp_kill.png" },
    { name: "Glock-18 | Water Elemental", price: 250, rarity: "classified", img: "images/skin_glock_twink.png" },
    { name: "MP9 | Rose", price: 60, rarity: "restricted", img: "images/skin_mp9_rose.png" },
    { name: "P250 | Whiteout", price: 40, rarity: "restricted", img: "images/skin_p250_white.png" },
    { name: "SSG 08 | Acid Fade", price: 85, rarity: "restricted", img: "images/skin_ssg_acid.png" },
    { name: "MAC-10 | Neon Rider", price: 70, rarity: "restricted", img: "images/skin_mac10_neon.png" },
    { name: "P90 | Asiimov", price: 55, rarity: "mil-spec", img: "images/skin_p90_ashes.png" },
    { name: "MP7 | Whiteout", price: 25, rarity: "mil-spec", img: "images/skin_mp7_white.png" },
    { name: "AK-47 | Redline", price: 320, rarity: "classified", img: "images/skin_ak_redline.png" },
    { name: "M4A4 | X-Ray", price: 200, rarity: "classified", img: "images/skin_m4_xray.png" },
    { name: "USP-S | Printstream", price: 300, rarity: "covert", img: "images/skin_usp_print.png" },
    { name: "AK-47 | Bloodsport", price: 400, rarity: "covert", img: "images/skin_ak_bloodsport.png" },
    { name: "AWP | BOOM", price: 180, rarity: "classified", img: "images/skin_awp_boom.png" },
    { name: "P250 | Kintsugi", price: 90, rarity: "restricted", img: "images/skin_p250_kintsugi.png" },
    { name: "FAMAS | Eye of Athena", price: 100, rarity: "classified", img: "images/skin_famas_athena.png" },
    { name: "Galil AR | Blue Titanium", price: 30, rarity: "mil-spec", img: "images/skin_galil_titanium.png" },
    { name: "MP9 | Ruby Poison Dart", price: 50, rarity: "restricted", img: "images/skin_mp9_ruby.png" },
    { name: "Desert Eagle | Cobalt Disruption", price: 140, rarity: "classified", img: "images/skin_deagle_cobalt.png" },
    { name: "M4A1-S | Mecha Industries", price: 600, rarity: "covert", img: "images/skin_m4a1s_mecha.png" }
];

function loadData() {
    const raw = localStorage.getItem(APP_KEY);
    if (raw) return JSON.parse(raw);
    return { balance: 1000, inventory: [], stats: { totalCases: 0, totalSpent: 0, totalWon: 0, bestWin: 0, bestWinName: '', totalSold: 0 } };
}

function saveData(data) { localStorage.setItem(APP_KEY, JSON.stringify(data)); }

function getBalance() { return loadData().balance; }
function setBalance(val) { const d = loadData(); d.balance = val; saveData(d); }
function addBalance(amount) { setBalance(getBalance() + amount); }
function getInventory() { return loadData().inventory; }

function addToInventory(skin) {
    const data = loadData();
    const wear = skin.wear || randomWear();
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    data.inventory.push({ id, ...skin, wear: wear.id, wearLabel: wear.label, wearMult: wear.mult, price: Math.round(skin.price * wear.mult) });
    saveData(data);
    return id;
}

function removeFromInventory(id) {
    const data = loadData();
    data.inventory = data.inventory.filter(i => i.id !== id);
    saveData(data);
}

function replaceInventoryItem(oldId, newSkin) {
    const data = loadData();
    const wear = randomWear();
    data.inventory = data.inventory.filter(i => i.id !== oldId);
    data.inventory.push({ id: Date.now() + Math.random().toString(36).substr(2, 9), ...newSkin, wear: wear.id, wearLabel: wear.label, wearMult: wear.mult, price: Math.round(newSkin.price * wear.mult) });
    saveData(data);
}

function updateBalanceDisplay() {
    const el = document.getElementById('balance-val');
    if (el) el.innerText = getBalance();
}

function createSkinCardHTML(skin) {
    const wearLabel = skin.wearLabel || '';
    const wearBadge = wearLabel ? `<span class="wear-badge wear-${wearLabel.toLowerCase()}">${wearLabel}</span>` : '';
    return `<img src="${skin.img}" alt="${skin.name}" class="skin-img"><div class="skin-info"><div class="skin-name">${skin.name} ${wearBadge}</div><div class="skin-price">${skin.price}$</div></div>`;
}

function getStats() { return loadData().stats; }

function updateStats(updates) {
    const data = loadData();
    data.stats = { ...data.stats, ...updates };
    saveData(data);
}

function getRaritySkins(rarity) {
    return skins.filter(s => s.rarity === rarity);
}

function getNextRarity(rarity) {
    const idx = RARITY_ORDER.indexOf(rarity);
    if (idx < 0 || idx >= RARITY_ORDER.length - 1) return null;
    return RARITY_ORDER[idx + 1];
}

// === BONUS REWARD (every 30 min) ===
function canClaimDaily() {
    const last = localStorage.getItem('daily_reward');
    if (!last) return true;
    return Date.now() - parseInt(last) > 1800000; // 30 min
}

function getDailyTimer() {
    const last = localStorage.getItem('daily_reward');
    if (!last) return 0;
    const remaining = 1800000 - (Date.now() - parseInt(last));
    return Math.max(0, remaining);
}

function claimDaily() {
    if (!canClaimDaily()) return;
    localStorage.setItem('daily_reward', Date.now().toString());
    addBalance(100);
    updateBalanceDisplay();
    return true;
}

// === EVENTS (rotating every hour) ===
const EVENT_ROTATION = 3600000; // 1 hour
function getEventSlot() {
    const stored = localStorage.getItem('event_slot');
    if (stored) return parseInt(stored);
    const slot = Math.floor(Math.random() * 5);
    localStorage.setItem('event_slot', slot.toString());
    return slot;
}

function getEventTimer() {
    const stored = localStorage.getItem('event_slot_time');
    if (!stored) {
        localStorage.setItem('event_slot_time', Date.now().toString());
        return EVENT_ROTATION;
    }
    const remaining = EVENT_ROTATION - (Date.now() - parseInt(stored));
    if (remaining <= 0) {
        // rotate to next slot
        const slot = (getEventSlot() + 1) % 5;
        localStorage.setItem('event_slot', slot.toString());
        localStorage.setItem('event_slot_time', Date.now().toString());
        return EVENT_ROTATION;
    }
    return remaining;
}

function isEventActive() { return true; }
function getCurrentEventSlot() { return parseInt(localStorage.getItem('event_slot') || '0') % 5; }

// === PARTICLES ===
function spawnParticles(x, y, color, count) {
    const container = document.getElementById('particle-container') || (() => {
        const c = document.createElement('div'); c.id = 'particle-container';
        document.body.appendChild(c); return c;
    })();
    for (let i = 0; i < (count || 20); i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = `left:${x}px;top:${y}px;background:${color || '#e5b042'};--dx:${(Math.random()-0.5)*200}px;--dy:${-Math.random()*200-50}px;--r:${Math.random()*360}deg;animation-delay:${Math.random()*0.3}s`;
        container.appendChild(p);
        setTimeout(() => p.remove(), 1200);
    }
}

function resetAccount() {
    if (confirm("Сбросить весь прогресс?")) {
        localStorage.removeItem(APP_KEY);
        updateBalanceDisplay();
        location.reload();
    }
}

document.addEventListener('DOMContentLoaded', updateBalanceDisplay);
