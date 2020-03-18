import axios from 'axios';

export const loginUser = async data => {
  try {
    return await axios.post(`${process.env.REACT_APP_HOST}/api/users/login`, data, {
      withCredentials: true
    });
  } catch(err) {
    return err;
  }
}

export const currentUser = async () => {
  try {
    return await axios.get(`${process.env.REACT_APP_HOST}/api/users/current`, {
      withCredentials: true
    });
  } catch(err) {
    return err;
  }
}
