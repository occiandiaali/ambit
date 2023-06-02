import {
  Alert,
  Clipboard,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const windowHeight = Dimensions.get('window').height;

const HostView = ({castId, name}) => {
  // const {toggleWebcam, toggleMic, startHls, stopHls, hlsState} = useMeeting({});
  // const {webcamOn, webcamStream} = useParticipant(participantId);
  // const mStream = new MediaStream([webcamStream.track]).toURL();

  const [cam, setCam] = useState(false);
  const [mic, setMic] = useState(false);
  const [cast, setCast] = useState(false);
  const [valid, setValid] = useState(true);

  return (
    <SafeAreaView>
      {valid ? (
        <View
          style={{
            width: '100%',
            height: windowHeight - 24,
            backgroundColor: 'pink',
          }}>
          <View style={styles.floatingHeader}>
            <TouchableWithoutFeedback
              onPress={() => {
                Clipboard.setString(castId);
                Alert.alert('Copied Stream ID', `${castId}`);
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Text style={{fontSize: 16, fontWeight: '400'}}>
                  {castId ?? 'Meeting ID'}
                </Text>
                <MaterialCommunityIcons name="share-outline" size={24} />
              </View>
            </TouchableWithoutFeedback>
            <Text style={{fontSize: 18, fontWeight: '700'}}>
              Hi, {name ?? 'Unknown'}
            </Text>
            <TouchableWithoutFeedback onPress={() => null}>
              <MaterialCommunityIcons name="exit-to-app" size={24} />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.controlsWrapper}>
            <TouchableWithoutFeedback
              onPress={() => {
                setMic(prev => !prev);
              }}>
              <MaterialCommunityIcons
                style={{padding: 34}}
                name={mic === false ? 'microphone-off' : 'microphone'}
                size={48}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setCam(prev => !prev);
              }}>
              <MaterialCommunityIcons
                style={{padding: 34}}
                name={cam === false ? 'webcam-off' : 'webcam'}
                size={48}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setCast(prev => !prev);
              }}>
              <MaterialCommunityIcons
                style={{padding: 34}}
                name={cast === false ? 'broadcast-off' : 'broadcast'}
                size={48}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <Text>NO MEDIUM</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HostView;

const styles = StyleSheet.create({
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
    bottom: 32,
  },
  floatingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    top: '10%',
  },
});