const express = require("express");
const app = express();
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { PORT = 3000 } = process.env;

function logger(req, res, next) {
  console.log(`[${req.method}] = ${req.url}`);
  next();
}

function isInvalidUrl(req, res) {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
}
app.use(express.json());
app.use("/", logger, usersRouter, cardsRouter);
app.use("*", isInvalidUrl);

app.listen(PORT, () => {
  console.log(`O App está escutando na porta ${PORT}`);
});

/*CRUD
create - post
read - get
update - put/patch
delete
*/
