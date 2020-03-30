import axios from 'axios';

export const addBook = data => {
  return axios.post(`${process.env.REACT_APP_HOST}/api/books/new`, data, {
    withCredentials: true
  });
}

export const getBooks = () => {
  return axios.get(`${process.env.REACT_APP_HOST}/api/books`, {
    withCredentials: true
  });
}

export const showBook = bookId => {
  return axios.get(`${process.env.REACT_APP_HOST}/api/books/${bookId}`, {
    withCredentials: true
  });
}

export const borrowBook = bookId => {
  return axios.patch(`${process.env.REACT_APP_HOST}/api/books/${bookId}/borrow`, null, {
    withCredentials: true
  });
}

export const returnBook = bookId => {
  return axios.patch(`${process.env.REACT_APP_HOST}/api/books/${bookId}/return`, null, {
    withCredentials: true
  });
}
