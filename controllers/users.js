const user = require("../models/user");

module.exports = {
  createUser: () => {},
  getUser: async (req, res) => {
    try {
      const users = await user.find();
      return users;
    } catch (error) {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  },
  getUserById: async (req, res) => {
    try {
      const users = await user.findById(req.params.id);
      return users;
    } catch (error) {
      res.status(404).json({ message: "ID do usuário não encontrado" });
    }
  },
};
