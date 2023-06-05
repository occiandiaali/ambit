import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const MessageInputComponent = ({onChangeText, value, user, isEnabled}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        editable={isEnabled}
        onChangeText={onChangeText}
        value={value}
        placeholder={` comment as ${user}...`}
        placeholderTextColor={'#fff'}
      />
      <TouchableWithoutFeedback
        onPress={() => null}
        style={styles.sendIconWrap}>
        <MaterialCommunityIcons name="send-outline" size={42} color="#fff" />
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
    color: '#FFF',
    borderColor: '#fff',
    marginBottom: 12,
    marginLeft: 14,
    padding: 10,
    borderWidth: 1,
    borderRadius: 16,
  },
  sendIconWrap: {top: 4, left: 18},
});
