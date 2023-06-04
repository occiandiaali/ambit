import {
  Alert,
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

const GuestInput = ({
  guestLink,
  setGuestLink,
  link,
  username,
  setUsername,
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
          setUsername('');
          setGuestLink('');
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
              Enter your code to join a LiveStream
            </Text>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                bottom: 48,
              }}>
              <TextInput
                style={styles.input}
                onChangeText={setGuestLink}
                value={guestLink}
                placeholder="Enter Channel ID"
                placeholderTextColor={'#948b8b'}
              />
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
                  if (guestLink === link) {
                    navigation.navigate('livestream', {
                      streamId: guestLink,
                      role: 'guest',
                      username: username,
                    });
                    setModalVisible(false);
                    setUsername('');
                    setGuestLink('');
                  } else {
                    Alert.alert(
                      'Warning',
                      'You need a valid link to join this LiveStream!',
                    );
                  }
                }}
                style={[
                  styles.joinPresser,
                  {
                    backgroundColor: username.length < 3 ? '#e7e4e4' : 'orange',
                  },
                ]}>
                <MaterialCommunityIcons name="video-outline" size={24} />
                <Text style={{fontSize: 18, right: 12}}>Join as Guest</Text>
              </Pressable>
            </View>
          </>
        }
      />
    </View>
  );
};

export default GuestInput;

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     width: '100%',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
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
