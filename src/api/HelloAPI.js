import axios from 'axios';
import { API_URL } from '../Constants';

export default async function getHelloWorldMessage() {
  try {
    return await axios.get(`${API_URL}/api/hello`);
  } catch(err) {
    throw err;
  }
}
