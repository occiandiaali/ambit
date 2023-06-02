import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {createStackNavigator} from '@react-navigation/stack';
import AudioHome from '../features/audio/AudioHome';
import VideoHome from '../features/video/VideoHome';
import AccountHome from '../features/account/AccountHome';
import JoinStreamForm from '../features/video/JoinStreamForm';
import GuestView from '../features/video/GuestView';
import HostView from '../features/video/HostView';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AudioStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AudioHome"
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
        name="VideoHome"
        options={{headerShown: false}}
        component={VideoHome}
      />
    </Stack.Navigator>
  );
}

function AccountStack() {
  return (
    <Stack.Navigator initialRouteName="account">
      <Stack.Screen
        name="AccountHome"
        options={{headerShown: false}}
        component={AccountHome}
      />
    </Stack.Navigator>
  );
}

function AppTabs() {
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
      <Tab.Screen
        name="audio"
        options={{headerShown: false}}
        component={AudioStack}
      />
      <Tab.Screen
        name="video"
        options={{headerShown: false}}
        component={VideoStack}
      />
      <Tab.Screen
        name="account"
        options={{headerShown: false}}
        component={AccountStack}
      />
    </Tab.Navigator>
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
    <Stack.Navigator>
      <Stack.Screen
        name="audio"
        options={{headerShown: false}}
        component={AppTabs}
      />
      <Stack.Screen name="Join Stream" component={JoinStreamForm} />
      <Stack.Screen name="welcome, Guest" component={GuestView} />
      <Stack.Screen name="welcome, Host" component={HostView} />
    </Stack.Navigator>
  );
};

export default BottomNav;
