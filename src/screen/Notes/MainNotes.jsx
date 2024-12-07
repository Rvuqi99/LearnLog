import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Notes from './Notes';
import ViewResult from './ViewResult';

const Stack = createNativeStackNavigator();
const MainNotes = () => {
  return (
    <Stack.Navigator initialRouteName="Notes">
      <Stack.Screen
        name="Notes"
        component={Notes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewResult"
        component={ViewResult}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainNotes;
