import axios from 'axios';

export const addBook = async data => {
  try {
    return await axios.post(`${process.env.REACT_APP_HOST}/api/books/new`, data, {
      withCredentials: true
    });
  } catch(err) {
    return err;
  }
}

export const getBooks = async () => {
  try {
    return await axios.get(`${process.env.REACT_APP_HOST}/api/books`, {
      withCredentials: true
    });
  } catch(err) {
    return err;
  }
}
