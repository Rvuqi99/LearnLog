import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Notes from './Notes';
import ViewResult from './ViewResult';
import GenerateQuiz from './GenerateQuiz';
import ViewQuizResult from '../Home/ViewQuizResult';

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
      <Stack.Screen
        name="GenerateQuiz"
        component={GenerateQuiz}
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

export default MainNotes;
