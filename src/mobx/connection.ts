import axios from 'axios';

const connection = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + '/api',
});

connection.interceptors.request.use(
  async config => {
    let token = ''
    const userData = JSON.parse(localStorage.getItem('user')!);
    if(userData) {
      token = userData.token
    }
    config.headers = {
      'fe-token': process.env.REACT_APP_BACKEND_TOKEN!,
      'authorization':token
    };
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

export default connection;