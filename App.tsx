import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import BottomNav from './src/components/BottomNav';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <BottomNav />
        <StatusBar hidden={true} />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
