import {Platform, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import GuestView from './GuestView';
import HostView from './HostView';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcConnection,
} from 'react-native-agora';
import requestCameraAndAudioPermission from './Permission';
import LoadingWait from '../../components/LoadingWait';
import {useNavigation} from '@react-navigation/native';

const LiveStream = ({route}) => {
  // const token = route.params.token;
  const navigation = useNavigation();
  const streamId = route.params.streamId;
  const name = route.params.username ? route.params.username : 'Anonymous';
  const mode = route.params.role;
  const engineRef = useRef<IRtcEngine>();
  const [joined, setJoined] = useState(false);

  const isStreamer = mode === 'host';

  const leave = () => {
    try {
      engineRef.current?.leaveChannel();
      setJoined(false);
      navigation.navigate('video');
    } catch (e) {
      console.log('Leave error: ', e);
    }
  };

  const init = useCallback(async () => {
    if (Platform.OS === 'android') {
      await requestCameraAndAudioPermission();
    }
    engineRef.current = createAgoraRtcEngine();
    engineRef.current.initialize({appId: '65aca7415bf74b70a0a4981c71c69581'});
    engineRef.current.enableVideo();
    engineRef.current.setChannelProfile(
      ChannelProfileType.ChannelProfileLiveBroadcasting,
    );
    if (isStreamer) {
      engineRef.current?.startPreview();
      engineRef.current?.setClientRole(ClientRoleType.ClientRoleBroadcaster);
    }
  }, [isStreamer]);

  useEffect(() => {
    const uid = isStreamer ? 1 : 0;
    init().then(() => {
      engineRef.current?.joinChannel('', streamId, uid, {});
      engineRef.current?.addListener(
        'onJoinChannelSuccess',
        (connection: RtcConnection, elapsed: number) => {
          console.log('Joined channel: ', connection, uid, elapsed);
          setJoined(true);
        },
      );
    });
    return () => {
      engineRef.current?.release();
    };
  }, [isStreamer, init, streamId]);

  return (
    <SafeAreaView style={styles.container}>
      {!joined ? (
        <LoadingWait />
      ) : mode === 'guest' ? (
        <GuestView castId={streamId} name={name} onLeave={leave} />
      ) : (
        <HostView castId={streamId} name={name} onLeave={leave} />
      )}
    </SafeAreaView>
  );
};

export default LiveStream;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
