const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const usersPath = path.join(__dirname, "..", "data", "users.json");
let users = [];
fs.readFile(usersPath, (err, data) => {
  if (err) {
    users = { message: "Não foi possível ler o arquivo" };
    return;
  }
  users = JSON.parse(data);
});

router.get("/users", (req, res) => {
  if (users.error) {
    res.status(500).send(users);
  }
  return res.send(users);
});

router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user._id === id);
  if (!user) {
    res.status(404).send({ message: "ID do usuário não encontrado" });
    return;
  }
  res.send(user);
});

module.exports = router;
