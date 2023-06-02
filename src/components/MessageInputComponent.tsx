import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MessageInputComponent = ({onChangeText, value}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder="Type message..."
        placeholderTextColor={'#948b8b'}
      />
      <MaterialCommunityIcons name="send-outline" size={24} />
    </View>
  );
};

export default MessageInputComponent;

const styles = StyleSheet.create({
  container: {
    width: '84%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    height: 56,
    width: '84%',
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 28,
  },
});
