import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InputFieldModal from '../../components/InputFieldModal';

const windowHeight = Dimensions.get('window').height;

const HostInput = ({
  username,
  setUsername,
  link,
  setLink,
  modalVisible,
  setModalVisible,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.contentWrapper}>
      <InputFieldModal
        animType={'slide'}
        visibility={modalVisible}
        closeModal={() => {
          setModalVisible(false);
          setLink('');
          setUsername('');
        }}
        children={
          <>
            <Text
              style={{
                fontSize: 21,
                top: 18,
                fontWeight: '700',
                textAlign: 'center',
              }}>
              Let's start a new LiveStream
            </Text>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                bottom: 64,
              }}>
              <Text>Stream ID: {link}</Text>
              <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="Enter your username"
                placeholderTextColor={'#948b8b'}
              />
              <Pressable
                disabled={username.length < 3}
                onPress={() => {
                  navigation.navigate('livestream', {
                    streamId: link,
                    role: 'host',
                    username: username,
                  });
                  setModalVisible(false);
                  setUsername('');
                  //   setLink('');
                }}
                style={[
                  styles.joinPresser,
                  {
                    backgroundColor: username.length < 3 ? '#e7e4e4' : 'orange',
                  },
                ]}>
                <MaterialCommunityIcons name="video-outline" size={24} />
                <Text style={{fontSize: 18, right: 12}}>Create a Session</Text>
              </Pressable>
            </View>
          </>
        }
      />
    </View>
  );
};

export default HostInput;

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    width: '110%',
    height: windowHeight * 0.58,
    backgroundColor: '#fff',
    // padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    top: 2,
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
