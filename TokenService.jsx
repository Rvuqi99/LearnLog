import EncryptedStorage from 'react-native-encrypted-storage';

export const setTToken = async token => {
  try {
    await EncryptedStorage.setItem('token', token);
    console.log('Set Pref Token Success');
  } catch (e) {
    // saving error
    console.log('Set Pref Token Error' + e);
  }
};

export const getTToken = async () => {
  try {
    const value = await EncryptedStorage.getItem('token');
    console.log('Get Pref Token Success');

    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
    console.log('Get Pref Token Error ' + e);
  }
};

export const removeToken = async () => {
  try {
    await EncryptedStorage.removeItem('token');
  } catch (e) {
    // remove error
    console.log('Remove Pref Token Error ' + e);
  }

  console.log('Remove Pref Token Success');
};
