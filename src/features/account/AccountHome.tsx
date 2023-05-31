import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AccountHome = () => {
  return (
    <LinearGradient
      colors={['#f0decc', '#f0b271', '#dd7508']}
      style={{
        flex: 1,
      }}>
      <View style={styles.container}>
        <Text>Profile Screen</Text>
        <MaterialCommunityIcons name="account-settings" size={120} />
      </View>
    </LinearGradient>
  );
};

export default AccountHome;
