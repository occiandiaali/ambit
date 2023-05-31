import React, {useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createBtn: {
    width: '45%',
    height: 40,
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
    fontSize: 16,
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
    height: 40,
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
    padding: 8,
  },
  modalView: {
    margin: 20,
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

const VideoHome = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [link, setLink] = useState('');

  const twoButtonAlert = () => {
    // generate random string
    const id = Math.random().toString(36).substring(2, 16);
    setLink(id);
    Alert.alert('Copy Link to Share', `${link}`, [
      {
        text: 'Cancel',
        onPress: () => setModalVisible(false),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          setModalVisible(false);
        },
      },
    ]);
  };

  const createLive = () => {
    // navigation.navigate('LiveScreen', {type: 'create', channel: link});
  };

  return (
    <LinearGradient
      colors={['#f0decc', '#f0b271', '#dd7508']}
      style={{
        flex: 1,
      }}>
      <View style={styles.container}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
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
              <Pressable onPress={createLive}>
                <Text style={[styles.infoSubText, {right: 52}]}>
                  Start a stream
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={styles.topScreenCTABtnContainer}>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={styles.createBtn}>
            <Text style={styles.createText}>New streaming</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.push('Join Stream')}
            style={styles.joinBtn}>
            <Text style={styles.joinText}>Join with a code</Text>
          </Pressable>
        </View>
        <View>
          <Image
            style={styles.landingImage}
            source={require('./../../assets/images/slide-1.png')}
          />
        </View>
        <Text style={styles.infoText}>Get a link you can share</Text>
        <Text style={styles.infoSubText}>
          Tap New streaming to get a link you can send to people you wish to
          allow viewing
        </Text>
      </View>
    </LinearGradient>
  );
};

export default VideoHome;
