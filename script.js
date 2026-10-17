// 寶可夢資料（使用 emoji 模擬像素風格圖示，之後可換成真實像素圖）
const pokemonData = {
  fire: [
    { name: "小火龍", sprite: "🔥🦎", rarity: "common" },
    { name: "六尾", sprite: "🦊🔥", rarity: "common" },
    { name: "卡蒂狗", sprite: "🐕🔥", rarity: "common" },
    { name: "小火馬", sprite: "🐴🔥", rarity: "common" },
    { name: "火伊布", sprite: "🔥🦊", rarity: "uncommon" },
    { name: "噴火龍", sprite: "🐲🔥", rarity: "rare" },
    { name: "火焰鳥", sprite: "🐦‍🔥", rarity: "rare" }
  ],
  water: [
    { name: "傑尼龜", sprite: "🐢💧", rarity: "common" },
    { name: "可達鴨", sprite: "🦆💧", rarity: "common" },
    { name: "鯉魚王", sprite: "🐟💧", rarity: "common" },
    { name: "小鋸鱷", sprite: "🐊💧", rarity: "common" },
    { name: "水伊布", sprite: "💧🦊", rarity: "uncommon" },
    { name: "水箭龜", sprite: "🐢💦", rarity: "rare" },
    { name: "急凍鳥", sprite: "🐦❄️", rarity: "rare" }
  ],
  grass: [
    { name: "妙蛙種子", sprite: "🌱🐸", rarity: "common" },
    { name: "走路草", sprite: "🌿", rarity: "common" },
    { name: "喇叭芽", sprite: "🪴", rarity: "common" },
    { name: "菊草葉", sprite: "🍃", rarity: "common" },
    { name: "葉伊布", sprite: "🌿🦊", rarity: "uncommon" },
    { name: "妙蛙花", sprite: "🌺🐸", rarity: "rare" },
    { name: "閃電鳥", sprite: "🐦⚡", rarity: "rare" } // 雖然是電，但放這當彩蛋
  ]
};

const typeNames = {
  fire: "🔥 火",
  water: "💧 水",
  grass: "🌿 草"
};

const typeBeats = {
  fire: "grass",
  grass: "water",
  water: "fire"
};

// 狀態
let playerType = null;
let playerPokemon = null;
let opponentPokemon = null;
let opponentType = null;
let wins = 0;
let losses = 0;
let draws = 0;
let streak = 0;
let collection = new Set(); // 用名字當 key

// DOM
const typeSelect = document.getElementById("typeSelect");
const drawArea = document.getElementById("drawArea");
const battleArea = document.getElementById("battleArea");
const resultArea = document.getElementById("resultArea");
const playerTypeText = document.getElementById("playerTypeText");
const drawBtn = document.getElementById("drawBtn");
const nextRoundBtn = document.getElementById("nextRoundBtn");

const playerSprite = document.getElementById("playerSprite");
const playerName = document.getElementById("playerName");
const playerTypeBadge = document.getElementById("playerTypeBadge");
const opponentSprite = document.getElementById("opponentSprite");
const opponentName = document.getElementById("opponentName");
const opponentTypeBadge = document.getElementById("opponentTypeBadge");
const resultText = document.getElementById("resultText");

const winsEl = document.getElementById("wins");
const lossesEl = document.getElementById("losses");
const drawsEl = document.getElementById("draws");
const streakEl = document.getElementById("streak");
const collectionList = document.getElementById("collectionList");
const collectionCount = document.getElementById("collectionCount");

// 事件：選擇屬性
document.querySelectorAll(".type-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    playerType = btn.dataset.type;
    playerTypeText.textContent = typeNames[playerType];
    typeSelect.classList.add("hidden");
    drawArea.classList.remove("hidden");
  });
});

// 抽寶可夢
drawBtn.addEventListener("click", () => {
  drawBtn.disabled = true;

  // 玩家抽
  playerPokemon = getRandomPokemon(playerType);

  // 電腦隨機屬性 + 抽
  const types = ["fire", "water", "grass"];
  opponentType = types[Math.floor(Math.random() * 3)];
  opponentPokemon = getRandomPokemon(opponentType);

  // 顯示對戰區
  drawArea.classList.add("hidden");
  battleArea.classList.remove("hidden");

  // 更新畫面
  updatePokemonCard("player", playerPokemon, playerType);
  updatePokemonCard("opponent", opponentPokemon, opponentType);

  // 稍微延遲再顯示結果（增加感覺）
  setTimeout(() => {
    const outc
... 
