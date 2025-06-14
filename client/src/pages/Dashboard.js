import React, { useEffect, useState } from 'react';
import { addTransaction, getTransactions } from '../api/transactions';
import { addBudget, getBudgets } from '../api/budgets';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [form, setForm] = useState({ type: 'expense', category: '', amount: '', isRecurring: false });
  const [budgetForm, setBudgetForm] = useState({ category: '', amount: '' });

  const token = localStorage.getItem('token');

  const loadTransactions = async () => {
    const data = await getTransactions(token);
    setTransactions(data);
  };

  const loadBudgets = async () => {
    const data = await getBudgets(token);
    setBudgets(data);
  };

  useEffect(() => {
    loadTransactions();
    loadBudgets();
  }, []);

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    await addTransaction(form, token);
    setForm({ type: 'expense', category: '', amount: '', isRecurring: false });
    loadTransactions();
  };

  const handleBudgetSubmit = async (e) => {
    e.preventDefault();
    await addBudget(budgetForm, token);
    setBudgetForm({ category: '', amount: '' });
    loadBudgets();
  };

  // Prepare data for Pie Chart
  const expenseData = transactions.filter(t => t.type === 'expense');
  const categoryTotals = expenseData.reduce((acc, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [{
      data: Object.values(categoryTotals),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#9CCC65', '#BA68C8', '#FFA726']
    }]
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Transaction Form */}
      <h2>Add Transaction</h2>
      <form onSubmit={handleTransactionSubmit}>
        <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
        <input placeholder="Amount" type="number" value={form.amount} onChange={e => setForm({...form, amount: Number(e.target.value)})} />
        <label>
          <input type="checkbox" checked={form.isRecurring} onChange={e => setForm({...form, isRecurring: e.target.checked})} />
          Recurring
        </label>
        <button type="submit">Add Transaction</button>
      </form>

      {/* Budget Form */}
      <h2>Set Budget</h2>
      <form onSubmit={handleBudgetSubmit}>
        <input placeholder="Category" value={budgetForm.category} onChange={e => setBudgetForm({...budgetForm, category: e.target.value})} />
        <input placeholder="Amount" type="number" value={budgetForm.amount} onChange={e => setBudgetForm({...budgetForm, amount: Number(e.target.value)})} />
        <button type="submit">Set Budget</button>
      </form>

      {/* Display Budgets */}
      <h3>Budgets</h3>
      <ul>
        {budgets.map(b => (
          <li key={b._id}>{b.category} - ₹{b.amount}</li>
        ))}
      </ul>

      {/* Display Transactions */}
      <h3>Transactions</h3>
      <ul>
        {transactions.map(t => (
          <li key={t._id}>{t.type} - {t.category} - ₹{t.amount} {t.isRecurring ? "(Recurring)" : ""}</li>
        ))}
      </ul>

      {/* Pie Chart */}
      <h3>Expense Distribution</h3>
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Pie data={pieData} />
      </div>
    </div>
  );
}

export default Dashboard;
