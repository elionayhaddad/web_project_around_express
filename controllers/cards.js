const card = require("../models/card");
const CustomHttpErrors = require("../errors/CustomHttpErrors");

module.exports = {
  getCard: async () => {
    try {
      const cards = await card.find();
      return cards;
    } catch {
      throw new CustomHttpErrors(
        "Ocorreu um erro no servidor",
        "Not Available",
        500
      );
    }
  },
  createCard: async (body, owner) => {
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
      const newCard = new card({ name, link, owner });
      return await newCard.save();
    } catch (error) {
      throw new CustomHttpErrors(
        "Ocorreu um erro no servidor",
        "Not Available",
        500
      );
    }
  },
  deleteCard: async (id) => {
    try {
      return await card.deleteOne({ _id: id });
    } catch (error) {
      throw new CustomHttpErrors(
        "ID do cartão não encontrado",
        "Not Found",
        404
      );
    }
  },
  likeCard: async (id, myUser) => {
    try {
      return await card.findByIdAndUpdate(
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
  },
  dislikeCard: async (id, myUser) => {
    try {
      return await card.findByIdAndUpdate(
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
  },
};
