import React, { useEffect, useState } from 'react';
import { addTransaction, getTransactions } from '../api/transactions.js';
import { addBudget, getBudgets } from '../api/budgets.js';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [form, setForm] = useState({ type: 'expense', category: '', amount: '', isRecurring: false });
  const [budgetForm, setBudgetForm] = useState({ category: '', amount: '' });

  const token = localStorage.getItem('token');

  const loadTransactions = async () => {
    try {
      const data = await getTransactions(token);
      setTransactions(data);
    } catch (error) {
      console.error("Error loading transactions:", error);
    }
  };

  const loadBudgets = async () => {
    try {
      const data = await getBudgets(token);
      setBudgets(data);
    } catch (error) {
      console.error("Error loading budgets:", error);
    }
  };

  useEffect(() => {
    loadTransactions();
    loadBudgets();
  }, []);

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTransaction(form, token);
      setForm({ type: 'expense', category: '', amount: '', isRecurring: false });
      loadTransactions();
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleBudgetSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBudget(budgetForm, token);
      setBudgetForm({ category: '', amount: '' });
      loadBudgets();
    } catch (error) {
      console.error("Error adding budget:", error);
    }
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
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {/* Transaction Form */}
      <form onSubmit={handleTransactionSubmit} className="form-section">
        <h2>Add Transaction</h2>
        <div className="form-group">
          <select className="input-field" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="form-group">
          <input className="input-field" placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
        </div>
        <div className="form-group">
          <input className="input-field" placeholder="Amount" type="number" value={form.amount} onChange={e => setForm({...form, amount: Number(e.target.value)})} />
        </div>
        <div className="form-group-checkbox">
          <input id="isRecurring" className="input-field" type="checkbox" checked={form.isRecurring} onChange={e => setForm({...form, isRecurring: e.target.checked})} />
          <label htmlFor="isRecurring">Recurring</label>
        </div>
        <button type="submit" className="btn">Add Transaction</button>
      </form>

      {/* Budget Form */}
      <form onSubmit={handleBudgetSubmit} className="form-section">
        <h2>Set Budget</h2>
        <div className="form-group">
          <input className="input-field" placeholder="Category" value={budgetForm.category} onChange={e => setBudgetForm({...budgetForm, category: e.target.value})} />
        </div>
        <div className="form-group">
          <input className="input-field" placeholder="Amount" type="number" value={budgetForm.amount} onChange={e => setBudgetForm({...budgetForm, amount: Number(e.target.value)})} />
        </div>
        <button type="submit" className="btn">Set Budget</button>
      </form>

      {/* Display Budgets */}
      <div className="list-section">
        <h3>Budgets</h3>
        <ul>
          {budgets.map(b => (
            <li key={b._id} className="list-item">{b.category} - ₹{b.amount}</li>
          ))}
        </ul>
      </div>

      {/* Display Transactions */}
      <div className="list-section">
        <h3>Transactions</h3>
        <ul>
          {transactions.map(t => (
            <li key={t._id} className="list-item">{t.type} - {t.category} - ₹{t.amount} {t.isRecurring ? "(Recurring)" : ""}</li>
          ))}
        </ul>
      </div>

      {/* Pie Chart */}
      <div className="list-section">
        <h3>Expense Distribution</h3>
        <div className="chart-container">
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
