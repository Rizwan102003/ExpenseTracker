import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const addBudget = async (data, token) => {
  const res = await axios.post(`${API}/api/budgets`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getBudgets = async (token) => {
  const res = await axios.get(`${API}/api/budgets`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
