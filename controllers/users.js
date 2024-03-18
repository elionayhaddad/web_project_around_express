const user = require("../models/user");
const CustomHttpErrors = require("../errors/CustomHttpErrors");
const linkRegex = /^https?:\/\//;

module.exports = {
  createUser: async (body) => {
    const { name, about, avatar } = body;
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
  updateProfileUser: async (body, myUser, req, res) => {
    const { name, about } = body;
    try {
      const updatedUser = await user.findByIdAndUpdate(
        myUser,
        { name, about },
        {
          new: true,
          runValidators: true,
        }
      );
      return updatedUser.save();
    } catch (error) {
      throw new CustomHttpErrors(
        "Falha na validação de dados ou ocorreu outro erro.",
        "Validation Error or Server Not Available",
        500
      );
    }
  },
  updateAvatarUser: async (body, myUser, req, res) => {
    const { avatar } = body;
    const isAvatarUrlValid = avatar.match(linkRegex);
    if (!isAvatarUrlValid) {
      throw new CustomHttpErrors(
        "A inválida url não contem http(s)://",
        "Invalid Link",
        400
      );
    }
    try {
      const updatedAvatarUser = await user.findByIdAndUpdate(
        myUser,
        { avatar },
        {
          new: true,
          runValidators: true,
        }
      );
      return updatedAvatarUser.save();
    } catch (error) {
      throw new CustomHttpErrors(
        "Falha na validação de dados ou ocorreu outro erro.",
        "Validation Error or Server Not Available",
        500
      );
    }
  },
};
