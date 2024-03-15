const router = require("express").Router();
const { getUser, getUserById } = require("../controllers/users");
let users = [];

router.get("/users", async (req, res) => {
  try {
    const users = await getUser();
    return res.json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const users = await getUserById(req, res);
    return res.json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
