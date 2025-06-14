import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const register = async (data) => {
  const res = await axios.post(`${API}/api/auth/register`, data);
  return res.data;
};

export const login = async (data) => {
  const res = await axios.post(`${API}/api/auth/login`, data);
  return res.data;
};
