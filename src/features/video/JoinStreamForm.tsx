import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const JoinStreamForm = () => {
  const navigation = useNavigation();
  const [joinChannel, setJoinChannel] = useState('');

  const joinLive = () => {
    navigation.navigate('LiveScreen', {type: 'join', channel: joinChannel});
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text>Enter the LiveStream ID you received from the Host</Text>
        <TextInput
          style={styles.input}
          onChangeText={setJoinChannel}
          value={joinChannel}
          placeholder="Example: xyz-123-kkk"
          placeholderTextColor={'#948b8b'}
        />
        <Pressable
          disabled={joinChannel === ''}
          onPress={joinLive}
          style={[
            styles.joinPresser,
            {backgroundColor: joinChannel === '' ? '#e7e4e4' : 'orange'},
          ]}>
          <MaterialCommunityIcons name="video-outline" size={24} />
          <Text style={{fontSize: 18, paddingLeft: 6}}>Join</Text>
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
    //  justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingLeft: 42,
    flexDirection: 'row',
    backgroundColor: 'orange',
  },
});
