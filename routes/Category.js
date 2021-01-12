const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/Category');
const passport = require('passport');

const authentication = passport.authenticate('jwt', { session: false });

router.get('/expense/statistic', authentication, categoryControllers.getExpenseCategoryBetween);
router.get('/income/statistic', authentication, categoryControllers.getIncomeCategoryBetween);
router.get('/', authentication, categoryControllers.getAllCategory);
router.post('/', authentication, categoryControllers.addCategory);
router.put('/:id', authentication, categoryControllers.updateCategoryById);
router.delete('/:id', authentication, categoryControllers.deleteCategoryById);

module.exports = router;