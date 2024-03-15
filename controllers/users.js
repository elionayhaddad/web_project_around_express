const user = require("../models/user");
const CustomHttpErrors = require("../errors/CustomHttpErrors");

module.exports = {
  createUser: async (body) => {
    const { name, about, avatar } = body;
    const linkRegex = /^https?:\/\//;
    const isAvatarUrlValid = avatar.match(linkRegex);
    if (isAvatarUrlValid) {
      const newUser = new user({ name, about, avatar });
      return newUser.save();
    }
    throw new CustomHttpErrors(
      "Os dados passados são inválidos!",
      "Invalid",
      400
    );
  },
  getUser: async (req, res) => {
    try {
      const users = await user.find();
      return users;
    } catch (error) {
      throw new CustomHttpErrors("usuários não encontrados", "Not Found", 404);
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
