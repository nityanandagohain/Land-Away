const router = require("express").Router();
const { getAll, create, update, getSingleTransaction, remove } = require("../controllers/propertyController");
const authenticate = require("../authenticate");

// Everyone can see the properties available
router.get('/', getAll);

router.post('/', authenticate, create);

router.get('/:transactionId', authenticate, getSingleTransaction);

router.put('/:transactionId', authenticate, update);

router.delete('/:transactionId', authenticate, remove);

module.exports = router;