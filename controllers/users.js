const user = require("../models/user");
const CustomHttpErrors = require("../errors/CustomHttpErrors");

module.exports = {
  createUser: async (body) => {
    const { name, about, avatar } = body;
    const linkRegex = /^https?:\/\//;
    const isAvatarUrlValid = avatar.match(linkRegex);
    if (!isAvatarUrlValid) {
      throw new CustomHttpErrors(
        "A inválida url não contem http(s)://",
        "Invalid Link",
        400
      );
    }
    try {
      const newUser = new user({ name, about, avatar });
      return await newUser.save();
    } catch (error) {
      throw new CustomHttpErrors(
        "Ocorreu um erro no servidor",
        "Not Available",
        500
      );
    }
  },
  getUser: async (req, res) => {
    try {
      const users = await user.find();
      return users;
    } catch (error) {
      throw new CustomHttpErrors(
        "Ocorreu um erro no servidor",
        "Error internal",
        500
      );
    }
  },
  getUserById: async (id, req, res) => {
    try {
      const users = await user.findById(id);
      return users;
    } catch (error) {
      throw new CustomHttpErrors(
        "ID de usuário não encontrado",
        "Not Found",
        404
      );
    }
  },
};
