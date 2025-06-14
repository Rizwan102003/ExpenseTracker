import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const addTransaction = async (data, token) => {
  const res = await axios.post(`${API}/api/transactions`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getTransactions = async (token) => {
  const res = await axios.get(`${API}/api/transactions`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
