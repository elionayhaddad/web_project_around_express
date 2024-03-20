const router = require("express").Router();
import Controller from "../controllers/Users.js";

router.get("/users", async (req, res) => {
  try {
    const users = await Controller.getUser();
    return res.json(users);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const users = await Controller.getUserById(id);
    return res.json(users);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
});

router.post("/users", async (req, res) => {
  const { body } = req;
  try {
    const newUser = await Controller.createUser(body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
});

router.patch("/users/me", async (req, res) => {
  const { body } = req;
  const myUser = req.user._id;
  try {
    const updatedUser = await Controller.updateProfileUser(body, myUser);
    return res.json(updatedUser);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
});

router.patch("/users/me/avatar", async (req, res) => {
  const { body } = req;
  const myUser = req.user._id;
  try {
    const newAvatarUser = await Controller.updateAvatarUser(body, myUser);
    return res.json(newAvatarUser);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
});

export default router;
