import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Track from './Track';

const Stack = createNativeStackNavigator();
const MainTrack = () => {
  return (
    <Stack.Navigator initialRouteName="Track">
      <Stack.Screen
        name="Track"
        component={Track}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainTrack;
