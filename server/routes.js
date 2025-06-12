const express = require('express');
const router = express.Router();
const auth = require('./middleware');
const { register, login, getTransactions, addTransaction } = require('./controllers');

router.post('/api/auth/register', register);
router.post('/api/auth/login', login);
router.get('/api/transactions', auth, getTransactions);
router.post('/api/transactions', auth, addTransaction);

module.exports = router;
