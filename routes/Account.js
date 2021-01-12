const express = require('express');
const router = express.Router();
const accountControllers = require('../controllers/Account');
const passport = require('passport');

const authentication = passport.authenticate('jwt', { session: false });

router.get('/', authentication, accountControllers.getAllAccount);
router.post('/', authentication, accountControllers.addAccount);
router.put('/:id', authentication, accountControllers.updateAccountById);
router.put('/balance/:id', authentication, accountControllers.updateAccountBalance);
router.delete('/:id', authentication, accountControllers.deleteAccountById);

module.exports = router;