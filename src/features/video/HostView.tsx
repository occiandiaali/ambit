import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React, {useState} from 'react';
import {
  MediaStream,
  RTCView,
  useMeeting,
  useParticipant,
} from '@videosdk.live/react-native-sdk';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HostView = ({participantId}) => {
  const {toggleWebcam, toggleMic, startHls, stopHls, hlsState} = useMeeting({});
  const {webcamOn, webcamStream} = useParticipant(participantId);
  const mStream = new MediaStream([webcamStream.track]).toURL();

  const [cam, setCam] = useState(false);
  const [mic, setMic] = useState(false);
  const [cast, setCast] = useState(false);

  const _handleHLS = async () => {
    if (!hlsState || hlsState === 'HLS_STOPPED') {
      startHls({
        layout: {
          type: 'SPOTLIGHT',
          priority: 'PIN',
          gridSize: 2,
        },
        theme: 'DARK',
        orientation: 'portrait',
      });
    } else if (hlsState === 'HLS_STARTED' || hlsState === 'HLS_PLAYABLE') {
      stopHls();
    }
  };

  return (
    <SafeAreaView>
      {webcamOn && webcamStream ? (
        <RTCView
          streamURL={mStream}
          objectFit={'cover'}
          style={{
            height: 600,
            marginVertical: 8,
            marginHorizontal: 8,
          }}
        />
      ) : (
        <View style={styles.container}>
          <Text>NO MEDIUM</Text>
        </View>
      )}
      <View style={styles.controlsWrapper}>
        <TouchableWithoutFeedback
          onPress={() => {
            setMic(prev => !prev);
            toggleMic();
          }}>
          <MaterialCommunityIcons
            name={mic === false ? 'microphone-off' : 'microphone'}
            size={24}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setCam(prev => !prev);
            toggleWebcam();
          }}>
          <MaterialCommunityIcons
            name={cam === false ? 'webcam-off' : 'webcam'}
            size={24}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setCast(prev => !prev);
            _handleHLS();
          }}>
          <MaterialCommunityIcons
            name={cast === false ? 'broadcast-off' : 'broadcast'}
            size={24}
          />
        </TouchableWithoutFeedback>
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
