const router = require("express").Router();

const { login, register, allUser } = require("../controllers/userController");

// Registration Route
router.post('/register', register);

// Login Route
router.post('/login', login);

// get all user
router.get('/all', allUser);

module.exports = router;