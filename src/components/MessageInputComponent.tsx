import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const MessageInputComponent = ({onChangeText, value}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder="Type message..."
        // placeholderTextColor={'#948b8b'}
        placeholderTextColor={'#fff'}
      />
      <TouchableWithoutFeedback onPress={() => null} style={{top: 4, left: 18}}>
        <MaterialCommunityIcons name="send-outline" size={46} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MessageInputComponent;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    right: 8,
  },
  input: {
    height: 56,
    width: '90%',
    marginBottom: 12,
    marginLeft: 14,
    padding: 10,
    borderWidth: 1,
    borderRadius: 16,
  },
});
