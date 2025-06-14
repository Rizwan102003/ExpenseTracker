const express = require('express');
const router = express.Router();
const auth = require('./middleware');
const {
  register,
  login,
  getTransactions,
  addTransaction,
  addBudget,
  getBudgets
} = require('./controllers');

router.post('/api/auth/register', register);
router.post('/api/auth/login', login);
router.get('/api/transactions', auth, getTransactions);
router.post('/api/transactions', auth, addTransaction);
router.get('/api/budgets', auth, getBudgets);
router.post('/api/budgets', auth, addBudget);

module.exports = router;
