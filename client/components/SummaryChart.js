import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale);

function SummaryChart() {
  const [summary, setSummary] = useState({});
  const token = localStorage.getItem('token');
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API}/summary`, {
      headers: { Authorization: token }
    }).then(res => setSummary(res.data));
  }, []);

  const months = Object.keys(summary);
  const expenses = months.map(m => summary[m].expense);
  const incomes = months.map(m => summary[m].income);

  const barData = {
    labels: months.map(m => `Month ${m}`),
    datasets: [
      { label: 'Income', data: incomes, backgroundColor: 'green' },
      { label: 'Expense', data: expenses, backgroundColor: 'red' }
    ]
  };

  const pieData = {
    labels: ['Income Total', 'Expense Total'],
    datasets: [{
      data: [incomes.reduce((a,b) => a+b, 0), expenses.reduce((a,b) => a+b, 0)],
      backgroundColor: ['green', 'red']
    }]
  };

  return (
    <div>
      <h2>Monthly Summary</h2>
      <Bar data={barData} />
      <Pie data={pieData} />
    </div>
  );
}

export default SummaryChart;
