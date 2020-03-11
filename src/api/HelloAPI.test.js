import axios from 'axios';
import getHelloWorldMessage from './HelloAPI';

jest.mock('axios');

test('renders learn react link', async () => {
  const data = {
    status: 200,
    data: {
      message: 'Hello World!'
    }
  };

  axios.get.mockResolvedValueOnce(data);
  const response = await getHelloWorldMessage();

  expect(response.status).toEqual(200);
  expect(response.data.message).toEqual('Hello World!');
});
