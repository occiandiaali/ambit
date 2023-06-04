import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const LoadingWait = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color="orange" />
      <Text>Please, wait while we complete the request...</Text>
    </View>
  );
};

export default LoadingWait;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
