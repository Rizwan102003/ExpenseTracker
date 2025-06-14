import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const addBudget = async (data, token) => {
  const res = await axios.post(`${API}/budgets`, data, {
    headers: { Authorization: token }
  });
  return res.data;
};

export const getBudgets = async (token) => {
  const res = await axios.get(`${API}/budgets`, {
    headers: { Authorization: token }
  });
  return res.data;
};
