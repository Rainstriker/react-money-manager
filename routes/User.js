const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/User');
const passport = require('passport');

const authentication = passport.authenticate('jwt', { session: false });

router.get('/info', authentication, userControllers.getUserById);
router.post('/register', userControllers.registerUser);
router.post('/login', userControllers.loginUser);
router.put('/update/info', authentication, userControllers.updateUserInfo);
router.put('/update/password', authentication, userControllers.updateUserPassword);
router.delete('/delete', authentication, userControllers.deleteUser);

module.exports = router;