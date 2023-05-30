import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AccountHome = () => {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <MaterialCommunityIcons name="account-settings" size={120} />
    </View>
  );
};

export default AccountHome;
