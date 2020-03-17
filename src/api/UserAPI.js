import axios from 'axios';

export default async function loginUser(data) {
  try {
    return await axios.post(`${process.env.REACT_APP_HOST}/api/users/login`, data);
  } catch(err) {
    throw err;
  }
}
