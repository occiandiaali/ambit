import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const StreamScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Stream Screen</Text>
    </View>
  );
};

export default StreamScreen;
