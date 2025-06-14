import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const register = async (data) => {
  const res = await axios.post(`${API}/auth/register`, data);
  return res.data;
};

export const login = async (data) => {
  const res = await axios.post(`${API}/auth/login`, data);
  return res.data;
};
