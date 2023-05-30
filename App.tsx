import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MenuProvider} from 'react-native-popup-menu';

import BottomNav from './src/components/BottomNav';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <MenuProvider>
          <BottomNav />
          <StatusBar hidden={true} />
        </MenuProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
