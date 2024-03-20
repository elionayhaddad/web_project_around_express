const Card = require("../models/Card");
const CustomHttpErrors = require("../errors/CustomHttpErrors");

const getCard = async (res, req) => {
  try {
    const cards = await Card.find();
    if (cards.length === 0) {
      return res.status(200).json({ message: "Não há cartões existentes" });
    }
    return cards;
  } catch (error) {
    throw new CustomHttpErrors(
      "Não foi possível completar sua solicitação. Tente novamente mais tarde!",
      "Not Available",
      500 || 503 || 504
    );
  }
};
const createCard = async (body, owner) => {
  const { name, link } = body;
  const linkRegex = /^https?:\/\//;

  const isLinkValid = link.match(linkRegex);
  if (!isLinkValid) {
    throw new CustomHttpErrors(
      "A inválida url não contem http(s)://",
      "Invalid Link",
      400
    );
  }
  try {
    const newCard = new Card({ name, link, owner });
    return await newCard.save();
  } catch (error) {
    throw new CustomHttpErrors(
      "Ocorreu um erro no servidor",
      "Not Available",
      500
    );
  }
};
const deleteCard = async (id) => {
  try {
    return await Card.deleteOne({ _id: id });
  } catch (error) {
    throw new CustomHttpErrors("ID do cartão não encontrado", "Not Found", 404);
  }
};
const likeCard = async (id, myUser) => {
  try {
    return await Card.findByIdAndUpdate(
      id,
      { $addToSet: { likes: myUser } },
      { new: true }
    );
  } catch (error) {
    throw new CustomHttpErrors(
      "Ocorreu um erro no servidor",
      "Not Available",
      500
    );
  }
};
const dislikeCard = async (id, myUser) => {
  try {
    return await Card.findByIdAndUpdate(
      id,
      { $pull: { likes: myUser } },
      { new: true }
    );
  } catch (error) {
    throw new CustomHttpErrors(
      "Ocorreu um erro no servidor",
      "Not Available",
      500
    );
  }
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
