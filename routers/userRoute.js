const router = require("express").Router();

const { login, register } = require("../controllers/userController");

// Registration Route
router.post('/register', register);

// Login Route
router.post('/login', login);

module.exports = router;