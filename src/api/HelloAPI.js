import axios from 'axios';

export default async function getHelloWorldMessage() {
  try {
    return await axios.get(`${process.env.REACT_APP_HOST}/api/hello`);
  } catch(err) {
    throw err;
  }
}
