import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/bfhl';

export const getOperationCode = () => {
  return axios.get(API_BASE_URL);
};

export const processData = (data) => {
  return axios.post(API_BASE_URL, { data });
};
