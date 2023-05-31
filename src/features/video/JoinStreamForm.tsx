import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

const JoinStreamForm = () => {
  const [text, onChangeText] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text>Enter the code you received from the broadcaster</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Example: xyz-123-kkk"
          placeholderTextColor={'#948b8b'}
        />
        <Pressable onPress={() => null} style={styles.joinPresser}>
          <Text>Join</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default JoinStreamForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 160,
  },
  input: {
    height: 56,
    width: '85%',
    margin: 12,
    padding: 10,
    borderColor: 'orange',
    borderBottomWidth: 1,
    backgroundColor: '#e7e4e4',
  },
  joinPresser: {
    width: 150,
    height: 45,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
});
