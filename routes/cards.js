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
    res.status(500).send(cards);
  }
  return res.send(cards);
});

router.get("/cards/:id", (req, res) => {
  const { id } = req.params;
  const card = cards.find((card) => card._id === id);

  if (!card) {
    res.status(404).send({ message: "ID do cartão não encontrado" });
    return;
  }
  res.send(card);
});

module.exports = router;
