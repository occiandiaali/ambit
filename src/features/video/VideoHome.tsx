import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import {useMeeting} from '@videosdk.live/react-native-sdk';
import InputFieldModal from '../../components/InputFieldModal';
import {useNavigation} from '@react-navigation/native';
import {authToken, createMeeting} from '../../api/video_sdk/api';
import GuestInput from './GuestInput';
import HostInput from './HostInput';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '32%',
  },
  createBtn: {
    width: '45%',
    height: 50,
    borderRadius: 24,
    backgroundColor: 'orange',
    margin: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // contentWrapper: {
  //   width: '110%',
  //   height: windowHeight * 0.58,
  //   backgroundColor: '#fff',
  //   // padding: 6,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   top: 2,
  //   bottom: 160,
  // },
  // input: {
  //   height: 56,
  //   width: '100%',
  //   margin: 12,
  //   padding: 10,
  //   borderColor: 'orange',
  //   borderBottomWidth: 1,
  //   backgroundColor: '#e7e4e4',
  // },
  // joinPresser: {
  //   width: 200,
  //   height: 50,
  //   borderRadius: 20,
  //   marginTop: 12,
  //   justifyContent: 'space-evenly',
  //   alignItems: 'center',
  //   // paddingLeft: 42,
  //   flexDirection: 'row',
  //   backgroundColor: 'orange',
  // },
  infoSubText: {
    fontSize: 18,
    width: 280,
    textAlign: 'center',
    top: 64,
  },
  infoText: {
    fontSize: 24,
    fontWeight: '600',
    bottom: 24,
    top: 64,
    textAlign: 'center',
  },
  joinBtn: {
    width: '45%',
    height: 50,
    borderRadius: 24,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    margin: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinText: {
    color: 'orange',
    fontSize: 16,
    fontWeight: 'bold',
  },
  landingImage: {
    width: 220,
    height: 220,
    borderRadius: 40,
    marginTop: 36, //14,
    top: 32,
    bottom: 28,
  },
  // linkContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   top: 8,
  //   left: 16,
  //   padding: 8,
  // },
  topScreenCTABtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 32,
    bottom: 48, //84,
  },
});

const VideoHome = () => {
  // const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [link, setLink] = useState('');
  const [guestLink, setGuestLink] = useState('');
  // const [joinChannel, setJoinChannel] = useState('');
  // const [streamId, setStreamId] = useState(null);
  const [role, setRole] = useState('host');
  const [username, setUsername] = useState('');

  // const setUpStreamAndToken = async () => {
  //   // generate random string
  //   const id = Math.random().toString(36).substring(2, 16);
  //   const genId = id === null ? await createMeeting({token: authToken}) : id;
  //   setStreamId(genId);
  // };

  // const {join} = useMeeting({
  //   onError: error => {
  //     console.log(error.message);
  //   },
  // });

  // const twoButtonAlert = () => {
  //   // generate random string
  //   const id = Math.random().toString(36).substring(2, 16);
  //   setLink(id);
  //   Alert.alert('Copy Link to Share', `${link}`, [
  //     {
  //       text: 'Cancel',
  //       onPress: () => {},
  //       style: 'cancel',
  //     },
  //     {
  //       text: 'OK',
  //       onPress: () => {},
  //     },
  //   ]);
  // };

  // const createLive = () => {
  //   setUpStreamAndToken()
  //     .then(() => {
  //       Alert.alert('Stream ID', `${streamId}`);
  //       navigation.navigate('welcome, Host');
  //     })
  //     .catch(e => console.log(e));
  // };

  const setUpHostOrGuest = (userRole: string) => {
    setModalVisible(true);
    setRole(userRole);
    if (userRole === 'host') {
      // generate random string
      const id = Math.random().toString(36).substring(2, 16);
      setLink(id);
    }
  };

  return (
    <LinearGradient
      colors={['#f0decc', '#f0b271', '#dd7508']}
      style={{
        flex: 1,
      }}>
      <View style={styles.container}>
        {role !== 'host' ? (
          <GuestInput
            guestLink={guestLink}
            setGuestLink={setGuestLink}
            link={link}
            username={username}
            setUsername={setUsername}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        ) : (
          <HostInput
            username={username}
            setUsername={setUsername}
            link={link}
            setLink={setLink}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        )}

        <View style={styles.topScreenCTABtnContainer}>
          <Pressable
            onPress={() => setUpHostOrGuest('host')}
            style={styles.createBtn}>
            <Text style={styles.createText}>Start a Stream</Text>
          </Pressable>
          <Pressable
            onPress={() => setUpHostOrGuest('guest')}
            style={styles.joinBtn}>
            <Text style={styles.joinText}>Join a Stream</Text>
          </Pressable>
        </View>
        <View>
          <Image
            style={styles.landingImage}
            source={require('./../../assets/images/slide-1.png')}
          />
        </View>
        <Text style={styles.infoText}>Start or join a Stream</Text>
        <Text style={styles.infoSubText}>
          Tap Create a new Stream to set-up a new stream, and get a link you can
          send to people to view, or Join a Stream to enter a link you received
          and begin viewing
        </Text>
      </View>
    </LinearGradient>
  );
};

export default VideoHome;
