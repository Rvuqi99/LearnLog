import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainHome from './Home/MainHome';
import {Icon} from 'react-native-elements';
import MainNotes from './Notes/MainNotes';
import MainTrack from './Track/MainTrack';
import MainMore from './More/MainMore';

const Tab = createBottomTabNavigator();
const MainMenu = ({navigation}) => {
  const home = 'MainHome';
  const notes = 'MainNotes';
  const track = 'MainTrack';
  const more = 'MainMore';

  return (
    <Tab.Navigator
      initialRouteName={home}
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: (Dimensions.get('window').height * 12) / 100,
          minHeight: 80,
          maxHeight: 150,
          backgroundColor: '#078EC6',
        },
        tabBarActiveTintColor: '#024E9C',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarIcon: ({color, focused}) => {
          let icon;
          let rn = route.name;
          let iconType = 'material';

          if (rn === home) {
            icon = 'home-outline';
            iconType = 'ionicon';
          } else if (rn === notes) {
            icon = 'notebook-outline';
            iconType = 'material-community';
          } else if (rn === track) {
            icon = 'search';
            iconType = 'ionicon';
          } else if (rn === more) {
            icon = 'menu';
            iconType = 'ionicon';
          }

          return (
            <View
              style={{
                paddingHorizontal: 15,
                justifyContent: 'center',
              }}>
              <View style={{width: 50}}>
                <Icon name={icon} type={iconType} size={30} color={color} />
              </View>
            </View>
          );
        },
        //Resetting other screen to default when change tab
        unmountOnBlur: true,
      })}>
      <Tab.Screen
        name={home}
        component={MainHome}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarLabelStyle: {
            paddingBottom: 20,
            fontSize: 13,
          },
        }}
      />
      <Tab.Screen
        name={notes}
        component={MainNotes}
        options={{
          title: 'Notes',
          headerShown: false,
          tabBarLabelStyle: {
            paddingBottom: 20,
            fontSize: 13,
          },
        }}
      />
      <Tab.Screen
        name={track}
        component={MainTrack}
        options={{
          title: 'Track',
          headerShown: false,
          tabBarLabelStyle: {
            paddingBottom: 20,
            fontSize: 13,
          },
        }}
      />
      <Tab.Screen
        name={more}
        component={MainMore}
        options={{
          title: 'More',
          headerShown: false,
          tabBarLabelStyle: {
            paddingBottom: 20,
            fontSize: 13,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainMenu;
