import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const JoinStreamForm = ({getStreamToken, setMode}) => {
  const navigation = useNavigation();
  const [joinChannel, setJoinChannel] = useState('');
  //const [btnAction, setBtnAction] = useState('');

  // const joinLive = () => {
  //   navigation.navigate('LiveScreen', {type: 'join', channel: joinChannel});
  // };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text>Enter the LiveStream ID</Text>
        <TextInput
          style={styles.input}
          onChangeText={setJoinChannel}
          value={joinChannel}
          placeholder="XXX-XXXX-XXXX"
          placeholderTextColor={'#948b8b'}
        />
        <Pressable
          disabled={joinChannel.length < 5}
          onPress={() => {
            getStreamToken(joinChannel);
            navigation.navigate('welcome, Guest');
          }}
          style={[
            styles.joinPresser,
            {
              backgroundColor: joinChannel.length < 5 ? '#e7e4e4' : 'orange',
            },
          ]}>
          <MaterialCommunityIcons name="video-outline" size={24} />
          <Text style={{fontSize: 18, right: 12}}>Join as Guest</Text>
        </Pressable>

        <Pressable
          disabled={joinChannel.length < 5}
          onPress={() => {
            getStreamToken(joinChannel);
            navigation.navigate('welcome, Host');
          }}
          style={[
            styles.joinPresser,
            {
              backgroundColor: joinChannel.length < 5 ? '#e7e4e4' : 'orange',
            },
          ]}>
          <MaterialCommunityIcons name="video-outline" size={24} />
          <Text style={{fontSize: 18, right: 12}}>Join as Host</Text>
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
    width: '100%',
    margin: 12,
    padding: 10,
    borderColor: 'orange',
    borderBottomWidth: 1,
    backgroundColor: '#e7e4e4',
  },
  joinPresser: {
    width: 200,
    height: 50,
    borderRadius: 20,
    marginTop: 12,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // paddingLeft: 42,
    flexDirection: 'row',
    backgroundColor: 'orange',
  },
});
