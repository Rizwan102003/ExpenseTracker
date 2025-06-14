const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Transaction = require('./models/Transaction');
const Budget = require('./models/Budget');  // NEW: budget model

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });
    user = new User({ name, email, password: await bcrypt.hash(password, 10) });
    await user.save();
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const txns = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(txns);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.addTransaction = async (req, res) => {
  const { type, category, amount, date, isRecurring } = req.body;
  try {
    const txn = new Transaction({ userId: req.user.id, type, category, amount, date, isRecurring });
    await txn.save();
    res.json(txn);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// BUDGET CONTROLLERS (NEW PART)
exports.addBudget = async (req, res) => {
  const { category, amount } = req.body;
  try {
    const budget = new Budget({ userId: req.user.id, category, amount });
    await budget.save();
    res.json(budget);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id });
    res.json(budgets);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
