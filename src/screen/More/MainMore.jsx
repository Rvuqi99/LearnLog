import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

const MainMore = ({navigation}) => {
  React.useEffect(() => {}, []);

  const logout = async () => {
    try {
      EncryptedStorage.clear();
    } catch (error) {
      console.log(error);
    }
    navigation.popToTop();
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={() => logout()}
        style={{
          width: '90%',
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          borderRadius: 10,
        }}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainMore;
