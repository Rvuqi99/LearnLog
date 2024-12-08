import {View, Text} from 'react-native';
import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

const MainMore = () => {
  
  React.useEffect(() => {
    logout();
  }, []);

  const logout = async () => {
    try {
      EncryptedStorage.clear();
    } catch (error) {
      console.log(error);
    }
    navigation.popToTop();
  };

  return (
    <View>
      <Text>More</Text>
    </View>
  );
};

export default MainMore;
