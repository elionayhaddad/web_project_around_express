const router = require("express").Router();
const {
  createUser,
  getUser,
  getUserById,
  updateProfileUser,
  updateAvatarUser,
} = require("../controllers/users.js");

router.get("/users", async (req, res) => {
  try {
    const users = await getUser();
    return res.json(users);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const users = await getUserById(id);
    return res.json(users);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
});

router.post("/users", async (req, res) => {
  const { body } = req;
  try {
    const newUser = await createUser(body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
});

router.patch("/users/me", async (req, res) => {
  const { body } = req;
  const myUser = req.user._id;
  try {
    const updatedUser = await updateProfileUser(body, myUser);
    return res.json(updatedUser);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
});

router.patch("/users/me/avatar", async (req, res) => {
  const { body } = req;
  const myUser = req.user._id;
  try {
    const newAvatarUser = await updateAvatarUser(body, myUser);
    return res.json(newAvatarUser);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
});

module.exports = router;
