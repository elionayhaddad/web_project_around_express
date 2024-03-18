const router = require("express").Router();
const { getCard, createCard, deleteCard } = require("../controllers/cards");

router.get("/cards", async (req, res) => {
  try {
    const cards = await getCard();
    return res.json(cards);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

router.post("/cards", async (req, res) => {
  const { body } = req;
  const owner = req.user._id;
  try {
    const newCard = await createCard(body, owner);
    return res.status(201).json(newCard);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

router.delete("/cards/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const remCard = await deleteCard(id);
    res.status(201).json({ message: "Cartão deletado com sucesso!" });
    return remCard;
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

module.exports = router;
