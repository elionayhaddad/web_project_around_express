import Card from "../models/card.js";
import CustomHttpErrors from "../errors/CustomHttpErrors.js";

const controllerCards = {
  getCard: async () => {
    try {
      const cards = await Card.find();
      if (cards.length === 0) {
        const noLength = { message: "Não há cartões existentes" };
        return noLength;
      }
      return cards;
    } catch (error) {
      console.log(error);
      throw new CustomHttpErrors(
        "Não foi possível completar sua solicitação. Tente novamente mais tarde!",
        "Not Available",
        500 || 503 || 504
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
      const newCard = new Card({ name, link, owner });
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
      return await Card.deleteOne({ _id: id });
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
  },
  dislikeCard: async (id, myUser) => {
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
  },
};

export default controllerCards;
