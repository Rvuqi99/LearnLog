import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import ViewQuizResult from './ViewQuizResult';

const Stack = createNativeStackNavigator();
const MainHome = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewQuizResult"
        component={ViewQuizResult}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainHome;
