const router = require("express").Router();

const fs = require("fs");

const path = require("path");

const cardsPath = path.join(__dirname, "..", "data", "cards.json");
let cards = [];
fs.readFile(cardsPath, (err, data) => {
  if (err) {
    cards = { message: "Não foi possível ler o aquivo" };
    return;
  }
  cards = JSON.parse(data);
});

router.get("/cards", (req, res) => {
  if (cards.error) {
    res.status(500).json(cards);
  }
  return res.json(cards);
});

router.get("/cards/:id", (req, res) => {
  const { id } = req.params;
  const card = cards.find((item) => item._id === id);

  if (!card) {
    res.status(404).json({ message: "ID do cartão não encontrado" });
    return;
  }
  res.json(card);
});

module.exports = router;
