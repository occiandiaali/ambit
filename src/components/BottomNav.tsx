import React, {useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import SoundScreen from '../features/sound';
import StreamScreen from '../features/stream';
import SettingScreen from '../features/settings';
import {createStackNavigator} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function SoundStack() {
  return (
    <Stack.Navigator initialRouteName="sounds">
      <Stack.Screen
        name="Sounds"
        options={{headerShown: false}}
        component={SoundScreen}
      />
    </Stack.Navigator>
  );
}

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
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'sounds') {
            iconName = 'multitrack-audio';
          } else if (route.name === 'streams') {
            iconName = 'stream';
          } else if (route.name === 'settings') {
            iconName = 'account-box';
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="sounds" component={SoundStack} />
      <Tab.Screen name="streams" component={StreamScreen} />
      <Tab.Screen name="settings" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default BottomNav;
