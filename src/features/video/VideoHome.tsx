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

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createBtn: {
    width: '45%',
    height: 50,
    borderRadius: 16,
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
  infoSubText: {
    fontSize: 18,
    width: 280,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 24,
    fontWeight: '600',
    bottom: 14,
    textAlign: 'center',
  },
  joinBtn: {
    width: '45%',
    height: 50,
    borderRadius: 16,
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
    marginTop: 14,
    bottom: 38,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: 8,
    left: 16,
    padding: 8,
  },
  modalView: {
    margin: 20,
    height: windowHeight * 0.75,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  topScreenCTABtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 84,
  },
});

const VideoHome = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [link, setLink] = useState('');
  // const [joinChannel, setJoinChannel] = useState('');
  const [streamId, setStreamId] = useState(null);

  const setUpStreamAndToken = async () => {
    // generate random string
    const id = Math.random().toString(36).substring(2, 16);
    const genId = id === null ? await createMeeting({token: authToken}) : id;
    setStreamId(genId);
  };

  // const {join} = useMeeting({
  //   onError: error => {
  //     console.log(error.message);
  //   },
  // });

  const twoButtonAlert = () => {
    // generate random string
    const id = Math.random().toString(36).substring(2, 16);
    setLink(id);
    Alert.alert('Copy Link to Share', `${link}`, [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {},
      },
    ]);
  };

  const createLive = () => {
    setUpStreamAndToken()
      .then(() => {
        Alert.alert('Stream ID', `${streamId}`);
        navigation.navigate('welcome, Host');
      })
      .catch(e => console.log(e));
  };

  return (
    <LinearGradient
      colors={['#f0decc', '#f0b271', '#dd7508']}
      style={{
        flex: 1,
      }}>
      <View style={styles.container}>
        {/* <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalView}>
            <View style={styles.linkContainer}>
              <MaterialCommunityIcons name="link" size={24} />
              <Pressable onPress={twoButtonAlert}>
                <Text style={styles.infoSubText}>
                  Get a streaming link to share
                </Text>
              </Pressable>
            </View>

            <View style={styles.linkContainer}>
              <MaterialCommunityIcons name="video-wireless-outline" size={24} />
              <Pressable onPress={twoButtonAlert}>
                <Text style={[styles.infoSubText, {right: 52}]}>
                  Start a stream
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal> */}
        <InputFieldModal
          animType={'slide'}
          visibility={modalVisible}
          closeModal={() => setModalVisible(false)}
          children={
            <>
              <View style={styles.linkContainer}>
                <MaterialCommunityIcons name="link" size={28} />
                <Pressable onPress={twoButtonAlert}>
                  <Text style={styles.infoSubText}>
                    Streaming link to share
                  </Text>
                </Pressable>
              </View>
              <View style={styles.linkContainer}>
                <MaterialCommunityIcons
                  name="video-wireless-outline"
                  size={28}
                />
                <Pressable onPress={createLive}>
                  <Text style={[styles.infoSubText, {top: 6}]}>
                    Start a premium stream
                  </Text>
                </Pressable>
              </View>
            </>
          }
        />
        <View style={styles.topScreenCTABtnContainer}>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={styles.createBtn}>
            <Text style={styles.createText}>SetUp Stream</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Join Stream')}
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
        <Text style={styles.infoText}>Start a Stream you can share</Text>
        <Text style={styles.infoSubText}>
          Tap SetUp Stream to set-up a new stream, and get a link you can send
          to people you wish to allow viewing
        </Text>
      </View>
    </LinearGradient>
  );
};

export default VideoHome;
