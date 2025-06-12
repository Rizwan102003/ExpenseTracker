import React, { useEffect, useState } from 'react';
import { addTransaction, getTransactions } from '../api/transactions';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ type: 'expense', category: '', amount: '' });
  const token = localStorage.getItem('token');

  const loadTransactions = async () => {
    const data = await getTransactions(token);
    setTransactions(data);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTransaction(form, token);
    setForm({ type: 'expense', category: '', amount: '' });
    loadTransactions();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input placeholder="Category" onChange={e => setForm({...form, category: e.target.value})} />
        <input placeholder="Amount" onChange={e => setForm({...form, amount: e.target.value})} />
        <button type="submit">Add</button>
      </form>

      <ul>
        {transactions.map(t => (
          <li key={t._id}>{t.type} - {t.category} - {t.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
