import {
  ActivityIndicator,
  Dimensions,
  Platform,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import 'react-native-get-random-values';
//
import RtcEngine, {
  ChannelProfile,
  ClientRole,
  // VideoRemoteState,
  RtcLocalView,
  RtcRemoteView,
  IRtcEngine,
} from 'react-native-agora';
import VideoRemoteState from 'react-native-agora';
import requestCameraAndAudioPermission from '../../../Permission';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#222',
  },
  fullscreen: {
    width: dimensions.width,
    height: dimensions.height,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    width: 150,
    backgroundColor: '#fff',
    marginBottom: 50,
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 17,
  },
  broadcasterVideoStateMessage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  broadcasterVideoStateMessageText: {
    color: '#fff',
    fontSize: 20,
  },
});

const videoStateMessage = state => {
  switch (state) {
    case VideoRemoteState?.caller().Stopped:
      return 'Video turned off by Host';

    case VideoRemoteState?.caller().Frozen:
      return 'Connection issue. Please, wait..';

    case VideoRemoteState?.caller().Failed:
      return 'An unknown error occurred.';
  }
};

export default function LiveScreen({route}) {
  const isBroadcaster = route.params.type === 'create';
  const [joined, setJoined] = useState(false);
  const [hostVideoState, setHostVideoState] = useState(
    VideoRemoteState?.caller().Decoding,
  );
  const goraEngine = useRef<IRtcEngine>();
  const init = useCallback(async () => {
    //  async () => {
    // goraEngine.current = await RtcEngine.call().createDataStream()
    goraEngine.current = await RtcEngine.caller().create({
      appId: 'c7e742d5df23478285a9dc4f4ff62407',
    });
    goraEngine.current?.enableVideo();
    goraEngine.current?.setChannelProfile(ChannelProfile.LiveBroadcasting);
    if (isBroadcaster) {
      goraEngine.current?.setClientRole(ClientRole.Broadcaster);
    }

    goraEngine.current?.addListener('RemoteVideoStateChanged', (uid, state) => {
      if (uid === 1) {
        setHostVideoState(state);
      }
    });

    goraEngine.current?.addListener(
      'JoinChannelSuccess',
      (channel, uid, elapsed) => {
        console.log('Join Channel Success', channel, uid, elapsed);
        setJoined(true);
      },
    );
    //  };
  }, [isBroadcaster]);

  const onShare = async () => {
    try {
      const result = await Share.share({message: route.params.channelName});
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSwitchCamera = () => goraEngine.current?.switchCamera();

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission();
    }
    const uid = isBroadcaster ? 1 : 0;
    init().then(() =>
      goraEngine.current?.joinChannel('', route.params.channel, -1, uid),
    );
    return () => {
      goraEngine.current?.removeAllListeners();
    };
  }, [init, isBroadcaster, route.params.channel]);

  const renderHost = () =>
    hostVideoState === VideoRemoteState?.caller().Decoding ? (
      <RtcRemoteView.SurfaceView />
    ) : (
      <View style={styles.broadcasterVideoStateMessage}>
        <Text style={styles.broadcasterVideoStateMessageText}>
          {videoStateMessage(hostVideoState)}
        </Text>
      </View>
    );

  const renderLocal = () => (
    <RtcLocalView.SurfaceView
      style={styles.fullscreen}
      channelId={route.params.channel}
    />
  );

  return (
    <View style={styles.container}>
      {!joined ? (
        <>
          <ActivityIndicator size={60} color="#222" />
          <Text style={styles.loadingText}>Joining stream. Please, wait..</Text>
        </>
      ) : (
        <>
          {isBroadcaster ? renderLocal() : renderHost()}
          <View style={styles.buttonContainer}>
            <Pressable onPress={onShare} style={styles.button}>
              <Text style={styles.buttonText}>Share</Text>
            </Pressable>
            <Pressable onPress={onSwitchCamera} style={styles.button}>
              <Text style={styles.buttonText}>Switch Camera</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}
