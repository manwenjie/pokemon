// 寶可夢資料（使用真實像素精靈圖）
const pokemonData = {
  fire: [
    { name: "小火龍", id: 4, rarity: "common" },
    { name: "六尾", id: 37, rarity: "common" },
    { name: "卡蒂狗", id: 58, rarity: "common" },
    { name: "小火馬", id: 77, rarity: "common" },
    { name: "火伊布", id: 136, rarity: "uncommon" },
    { name: "噴火龍", id: 6, rarity: "rare" },
    { name: "火焰鳥", id: 146, rarity: "rare" }
  ],
  water: [
    { name: "傑尼龜", id: 7, rarity: "common" },
    { name: "可達鴨", id: 54, rarity: "common" },
    { name: "鯉魚王", id: 129, rarity: "common" },
    { name: "小鋸鱷", id: 158, rarity: "common" },
    { name: "水伊布", id: 134, rarity: "uncommon" },
    { name: "水箭龜", id: 9, rarity: "rare" },
    { name: "急凍鳥", id: 144, rarity: "rare" }
  ],
  grass: [
    { name: "妙蛙種子", id: 1, rarity: "common" },
    { name: "走路草", id: 43, rarity: "common" },
    { name: "喇叭芽", id: 69, rarity: "common" },
    { name: "菊草葉", id: 152, rarity: "common" },
    { name: "葉伊布", id: 470, rarity: "uncommon" },
    { name: "妙蛙花", id: 3, rarity: "rare" },
    { name: "閃電鳥", id: 145, rarity: "rare" }
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

// 取得精靈圖網址（使用像素風格）
function getSpriteUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

// 狀態
let playerType = null;
let playerPokemon = null;
let opponentPokemon = null;
let opponentType = null;
let wins = 0;
let losses = 0;
let draws = 0;
let streak = 0;
let collection = new Set();

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

  playerPokemon = getRandomPokemon(playerType);

  const types = ["fire", "water", "grass"];
  opponentType = types[Math.floor(Math.random() * 3)];
  opponentPokemon = getRandomPokemon(opponentType);

  drawArea.classList.add("hidden");
  battleArea.classList.remove("hidden");

  updatePokemonCard("player", playerPokemon, playerType);
  updatePokemonCard("opponent", opponentPokemon, opponentType);

  setTimeout(() => {
    const outcome = decideWinner(playerType, opponentType);
    showResult(outcome);
  }, 600);
});

// 下一局
nextRoundBtn.addEventListener("click", () => {
  resetRound();
});

function getRandomPokemon(type) {
  const list = pokemonData[type];
  const weighted = [];
  list.forEach(p => {
    const weight = p.rarity === "rare" ? 1 : p.rarity === "uncommon" ? 3 : 6;
    for (let i = 0; i < weight; i++) weighted.push(p);
  });
  return weighted[Math.floor(Math.random() * weighted.length)];
}

function updatePokemonCard(who, poke, type) {
  const imgHtml = `<img src="\( {getSpriteUrl(poke.id)}" alt=" \){poke.name}" style="width:80px; height:80px; image-rendering: pixelated;">`;

  if (who === "player") {
    playerSprite.innerHTML = imgHtml;
    playerSprite.classList.add("bounce");
    playerName.textContent = poke.name;
    playerTypeBadge.textContent = typeNames[type];
    playerTypeBadge.className = "pokemon-type " + type;
  } else {
    opponentSprite.innerHTML = imgHtml;
    opponentSprite.classList.add("bounce");
    opponentName.textContent = poke.name;
    opponentTypeBadge.textContent = typeNames[type];
    opponentTypeBadge.className = "pokemon-type " + type;
  }

  setTimeout(() => {
    playerSprite.classList.remove("bounce");
    opponentSprite.classList.remove("bounce");
  }, 400);
}

function decideWinner(pType, oType) {
  if (pType === oType) return "draw";
  if (typeBeats[pType] === oType) return "win";
  return "lose";
}

function showResult(outcome) {
  resultArea.classList.remove("hidden", "win", "lose", "draw");
  resultArea.classList.add(outcome);

  if (outcome === "win") {
    wins++;
    streak++;
    resultText.textContent = `🎉 勝利！你的 ${playerPokemon.name} 贏了！`;
    if (!collection.has(playerPokemon.name)) {
      collection.add(playerPokemon.name);
      addToCollection(playerPokemon);
    }
  } else if (outcome === "lose") {
    losses++;
    streak = 0;
    resultText.textContent = `😢 失敗…對手的 ${opponentPokemon.name} 比較強`;
  } else {
    draws++;
    resultText.textContent = `🤝 平手！屬性相同`;
  }

  updateScore();
}

function addToCollection(poke) {
  const empty = collectionList.querySelector(".empty");
  if (empty) empty.remove();

  const item = document.createElement("div");
  item.className = "collection-item";
  item.innerHTML = `
    <img src="\( {getSpriteUrl(poke.id)}" alt=" \){poke.name}" style="width:32px; height:32px; image-rendering: pixelated;">
    <span>${poke.name}</span>
  `;
  collectionList.appendChild(item);
  collectionCount.textContent = `(${collection.size})`;
}

function updateScore() {
  winsEl.textContent = wins;
  lossesEl.textContent = losses;
  drawsEl.textContent = draws;
  streakEl.textContent = streak;
}

function resetRound() {
  playerType = null;
  playerPokemon = null;
  opponentPokemon = null;
  opponentType = null;

  typeSelect.classList.remove("hidden");
  drawArea.classList.add("hidden");
  battleArea.classList.add("hidden");
  resultArea.classList.add("hidden");
  drawBtn.disabled = false;

  playerSprite.innerHTML = "❓";
  playerName.textContent = "---";
  playerTypeBadge.textContent = "";
  playerTypeBadge.className = "pokemon-type";
  opponentSprite.innerHTML = "❓";
  opponentName.textContent = "---";
  opponentTypeBadge.textContent = "";
  opponentTypeBadge.className = "pokemon-type";
}

// 初始化
updateScore();
