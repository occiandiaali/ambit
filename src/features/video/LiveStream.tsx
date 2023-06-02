import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import GuestView from './GuestView';
import HostView from './HostView';

const LiveStream = ({route}) => {
  // const token = route.params.token;
  const streamId = route.params.streamId;
  const name = route.params.username ? route.params.username : 'Anonymous';
  const mode = route.params.role;

  return (
    <SafeAreaView style={styles.container}>
      {mode === 'guest' ? (
        <GuestView castId={streamId} name={name} />
      ) : (
        <HostView castId={streamId} name={name} />
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
