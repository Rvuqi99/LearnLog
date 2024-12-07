import {API_ORIGIN} from './api';

export const loginApi = async (email, password) => {
  try {
    const dataRequests = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    };
    const data = await fetch(`${API_ORIGIN}/login`, dataRequests);
    const result = await data.json();

    console.log(data);
    console.log(result);
    return [data, result];
  } catch (error) {
    console.log('Error when fetching login API' + error);
  }
};
