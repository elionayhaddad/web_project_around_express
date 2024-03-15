const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { PORT = 3000 } = process.env;

const app = express();

async function connectDataBase() {
  await mongoose.connect("mongodb://127.0.0.1.:27017/aroundb", {});
  console.log("Database connected");
}

connectDataBase();

function logger(req, res, next) {
  console.log(`[${req.method}] = ${req.url}`);
  next();
}
function isInvalidUrl(req, res) {
  res.status(404).json({ message: "A solicitação não foi encontrada" });
}

app.use(express.json());
app.use("/", logger, usersRouter, cardsRouter);
app.use("/*", isInvalidUrl);

app.listen(PORT, () => {
  console.log(`O App está escutando na porta ${PORT}`);
});
