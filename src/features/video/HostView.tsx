import {
  Alert,
  Dimensions,
  Share,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Clipboard from '@react-native-community/clipboard';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {RtcSurfaceView} from 'react-native-agora';
import LinearGradient from 'react-native-linear-gradient';

const windowHeight = Dimensions.get('window').height;

const HostView = ({castId, name, onLeave}) => {
  const [cam, setCam] = useState(true);
  const [mic, setMic] = useState(false);
  const [cast, setCast] = useState(false);

  const onShare = async () => {
    try {
      await Share.share({message: castId});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <LinearGradient
        colors={['#f0decc', '#f0b271', '#dd7508']}
        style={styles.gradientWrap}>
        {castId ? (
          <>
            <View style={styles.videoViewWrapper}>
              <React.Fragment key={0}>
                <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView} />
              </React.Fragment>
            </View>
            <View style={styles.floatingHeader}>
              <TouchableWithoutFeedback
                onPress={() => {
                  Clipboard.setString(castId);
                  Alert.alert('Copied Stream ID', `${castId}`);
                  onShare();
                }}>
                <View style={styles.idAndIconRow}>
                  <Text style={styles.channelIdText}>
                    {castId ?? 'Meeting ID'}
                  </Text>
                  <MaterialCommunityIcons
                    name="share-outline"
                    size={24}
                    color="white"
                  />
                </View>
              </TouchableWithoutFeedback>
              <Text style={styles.usernameText}>Hi, {name ?? 'Anonymous'}</Text>
              <TouchableWithoutFeedback onPress={onLeave}>
                <MaterialCommunityIcons
                  name="exit-to-app"
                  size={24}
                  color="white"
                />
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.controlsWrapper}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setMic(prev => !prev);
                }}>
                <MaterialCommunityIcons
                  style={styles.iconPadding}
                  name={mic === false ? 'microphone-off' : 'microphone'}
                  size={48}
                  color="orange"
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  setCam(prev => !prev);
                }}>
                <MaterialCommunityIcons
                  style={styles.iconPadding}
                  name={cam !== false ? 'webcam' : 'webcam-off'}
                  size={48}
                  color="orange"
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  setCast(prev => !prev);
                }}>
                <MaterialCommunityIcons
                  style={styles.iconPadding}
                  name={cast === false ? 'broadcast-off' : 'broadcast'}
                  size={48}
                  color="orange"
                />
              </TouchableWithoutFeedback>
            </View>
          </>
        ) : (
          <View style={styles.container}>
            <Text>NO MEDIUM</Text>
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HostView;

const styles = StyleSheet.create({
  channelIdText: {fontSize: 16, fontWeight: '400', color: 'white'},
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsWrapper: {
    position: 'absolute',
    flexDirection: 'row',
    left: 10,
    bottom: -12,
  },
  floatingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    bottom: windowHeight - 80,
  },
  gradientWrap: {
    width: '100%',
    height: windowHeight,
  },
  iconPadding: {padding: 34},
  idAndIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  usernameText: {fontSize: 18, fontWeight: '700', color: 'white'},
  videoView: {
    width: '100%',
    height: windowHeight,
    alignSelf: 'center',
  },
  videoViewWrapper: {},
});
