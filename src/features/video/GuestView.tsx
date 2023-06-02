import {Alert, Clipboard, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useMeeting} from '@videosdk.live/react-native-sdk';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import MessageInputComponent from '../../components/MessageInputComponent';

const GuestView = () => {
  const [comment, setComment] = useState('');
  const {hlsState, hlsUrls, meetingId, leave} = useMeeting();
  return (
    <LinearGradient
      colors={['#f0decc', '#f0b271', '#dd7508']}
      style={{
        flex: 1,
      }}>
      <SafeAreaView style={styles.container}>
        {hlsState === 'HLS_PLAYABLE' ? (
          <>
            {/** Screen floating header for streamID and Leave icon */}
            <View style={styles.floatingHeader}>
              <TouchableWithoutFeedback
                onPress={() => {
                  Clipboard.setString(meetingId ?? '');
                  Alert.alert('Copied Stream ID');
                }}>
                <Text>{meetingId ?? 'Meeting ID'}</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => leave()}>
                <MaterialCommunityIcons name="exit-to-app" size={24} />
              </TouchableWithoutFeedback>
            </View>
            {/** Render video player */}
            <Video
              controls={true}
              source={{
                uri: hlsUrls.downstreamUrl,
              }}
              resizeMode={'stretch'}
              style={{
                flex: 1,
                backgroundColor: 'black',
              }}
              onError={e => console.log('Video error..', e)}
            />
            <MessageInputComponent value={comment} onChangeText={setComment} />
          </>
        ) : (
          <SafeAreaView style={styles.noStreamContainer}>
            <MaterialCommunityIcons name="alert-octagon" size={150} />
            <Text>Stream not yet started, or is stopped</Text>
          </SafeAreaView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default GuestView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  noStreamContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
