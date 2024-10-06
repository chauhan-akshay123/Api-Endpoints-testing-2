const express = require("express");
const app = express();
app.use(express.json()); // To handle JSON request bodies

let games = [
  { id: 1, title: 'The Legend of Zelda', genre: 'Adventure', developer: 'Nintendo' },
  { id: 2, title: 'Super Mario Bros', genre: 'Platformer', developer: 'Nintendo' }
];

let developers = [
  { id: 1, name: 'Nintendo', country: 'Japan' },
  { id: 2, name: 'EA Games', country: 'USA' }
];

// Function to get all games
async function getAllGames() {
  return games;
}

// Function to get a game by Id
async function getGameById(id) {
  return games.find(game => game.id === id);
}

// Function to add a game
async function addGame(data) {
  data.id = games.length + 1;
  games.push(data);
  return data;
}

// Function to get developer by Id
async function getDeveloperById(id) {
  return developers.find(developer => developer.id === id);
}

// Function to add developer
async function addDeveloper(data) {
  data.id = developers.length + 1;
  developers.push(data);
  return data;
}

// API to get all games
app.get("/games", async (req, res) => {
  const games = await getAllGames();
  res.json(games);
});

// API to get a game by Id
app.get("/games/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  const game = await getGameById(id); // Added await
  if (!game) return res.status(404).send("Game not found");
  res.status(200).json(game);
});

// API to add a game (should be POST)
app.post("/games/new", async (req, res) => {
  const newGame = await addGame(req.body); // We expect the body to have game data
  res.status(201).json(newGame);
});

// API to get developer by Id
app.get("/developers/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  const developer = await getDeveloperById(id);
  if (!developer) return res.status(404).send("Developer not found");
  res.status(200).json(developer);
});

// API to add a developer (should be POST)
app.post("/developers/new", async (req, res) => {
  const newDeveloper = await addDeveloper(req.body);
  res.status(201).json(newDeveloper);
});

module.exports = {
  app,
  getAllGames,
  getGameById,
  addGame,
  getDeveloperById,
  addDeveloper
};
