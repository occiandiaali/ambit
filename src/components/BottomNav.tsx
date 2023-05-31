import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {createStackNavigator} from '@react-navigation/stack';
import AudioHome from '../features/audio/AudioHome';
import VideoHome from '../features/video/VideoHome';
import AccountHome from '../features/account/AccountHome';
import JoinStreamForm from '../features/video/JoinStreamForm';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AudioStack() {
  return (
    <Stack.Navigator initialRouteName="audio">
      <Stack.Screen
        name="Audio"
        options={{headerShown: false}}
        component={AudioHome}
      />
    </Stack.Navigator>
  );
}

function VideoStack() {
  return (
    <Stack.Navigator initialRouteName="video">
      <Stack.Screen
        name="Video"
        options={{headerShown: false}}
        component={VideoHome}
      />
      <Stack.Screen name="Join Stream" component={JoinStreamForm} />
    </Stack.Navigator>
  );
}

function AccountStack() {
  return (
    <Stack.Navigator initialRouteName="account">
      <Stack.Screen
        name="Account"
        options={{headerShown: false}}
        component={AccountHome}
      />
    </Stack.Navigator>
  );
}

// const SetTabIcons = ({focused, route, size}) => {
//   let iconName = '';
//   if (route.name === 'audio') {
//     iconName = 'google-podcast';
//   } else if (route.name === 'video') {
//     iconName = 'broadcast';
//   } else if (route.name === 'account') {
//     iconName = 'account-settings';
//   }
//   return <MaterialCommunityIcons name={iconName} size={size} color={focused ? 'tomato' : 'gray'}/>;
// };

const BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        headerBackgroundContainerStyle: {
          backgroundColor: 'red',
        },
        tabBarStyle: {
          height: 72,
          paddingTop: 8,
          paddingBottom: 12,
          margin: 18,
          elevation: 2,
          position: 'absolute',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        },
        tabBarLabelStyle: {fontSize: 12},
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'audio') {
            iconName = 'google-podcast';
          } else if (route.name === 'video') {
            iconName = 'broadcast';
          } else if (route.name === 'account') {
            iconName = 'account-settings';
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="audio" component={AudioStack} />
      <Tab.Screen name="video" component={VideoStack} />
      <Tab.Screen name="account" component={AccountStack} />
    </Tab.Navigator>
  );
};

export default BottomNav;
