const router = require("express").Router();
const { getUser, getUserById, createUser } = require("../controllers/users");
let users = [];

router.get("/users", async (req, res) => {
  try {
    const users = await getUser();
    return res.json(users);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const users = await getUserById(id);
    return res.json(users);
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
});

router.post("/users", async (req, res) => {
  const { body } = req;
  try {
    const newUser = await createUser(body);
    return res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
});

module.exports = router;
