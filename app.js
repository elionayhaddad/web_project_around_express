const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { PORT = 3000 } = process.env;

const app = express();

async function connectDataBase(req, res) {
  try {
    await mongoose.connect("mongodb://127.0.0.1.:27017/aroundb", {});
    console.log("Database connected");
  } catch {
    res.status(500).json({
      message: "Não foi possível conectar. Tente novamente mais tarde!",
    });
  }
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

app.use((req, res, next) => {
  req.user = {
    _id: "65eb9fb6a6f4066450ce45f3",
  };

  next();
});

app.use("/", logger, usersRouter, cardsRouter);

app.use("/*", isInvalidUrl);

app.listen(PORT, () => {
  console.log(`O App está escutando na porta ${PORT}`);
});
