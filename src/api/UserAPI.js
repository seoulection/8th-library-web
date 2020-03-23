import axios from 'axios';

export function currentUser() {
  return axios.get(`${process.env.REACT_APP_HOST}/api/users/current`, {
    withCredentials: true
  });
}

export function loginUser(data) {
  return axios.post(`${process.env.REACT_APP_HOST}/api/users/login`, data, {
    withCredentials: true
  });
}
