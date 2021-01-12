const express = require('express');
const router = express.Router();
const transactionControllers = require('../controllers/Transaction');
const passport = require('passport');

const authentication = passport.authenticate('jwt', { session: false });

// router.get('/:id', authentication, transactionControllers.getTransactionById);
router.get('/', authentication, transactionControllers.getTransactionBetween);
router.get('/sort/category/:id', authentication, transactionControllers.getTransactionBetweenByCategory);
router.get('/sort/account/:id', authentication, transactionControllers.getTransactionBetweenByAccount);

router.post('/add/expense', authentication, transactionControllers.addExpense);
router.post('/add/income', authentication, transactionControllers.addIncome);
router.post('/add/transfer', authentication, transactionControllers.addTransfer);

router.put('/date/:id', authentication, transactionControllers.updateDateSummarizeByDate);
router.put('/update/expense/:id', authentication, transactionControllers.updateExpenseById);
router.put('/update/income/:id', authentication, transactionControllers.updateIncomeById);
router.put('/update/transfer/:id', authentication, transactionControllers.updateTransferById);

router.delete('/:id', authentication, transactionControllers.deleteRecordById);
router.delete('/date/:id', authentication, transactionControllers.deleteDateById);

module.exports = router;