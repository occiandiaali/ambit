import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import MessageInputComponent from '../../components/MessageInputComponent';
import {RtcSurfaceView} from 'react-native-agora';

const windowHeight = Dimensions.get('window').height;

const GuestView = ({castId, remoteUId, name, onLeave}) => {
  const [comment, setComment] = useState('');
  const [isAuxVisible, setIsAuxVisible] = useState(true);

  const toggleAuxVisibility = () => setIsAuxVisible(prev => !prev);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#f0decc', '#f0b271', '#dd7508']}
        style={styles.gradientWrap}>
        {castId ? (
          <>
            <TouchableWithoutFeedback onPress={() => toggleAuxVisibility()}>
              <React.Fragment key={remoteUId}>
                <RtcSurfaceView
                  canvas={{uid: remoteUId}}
                  style={styles.videoView}
                  zOrderOnTop={false}
                />
              </React.Fragment>
            </TouchableWithoutFeedback>

            {isAuxVisible ? (
              <View style={styles.floatingHeader}>
                <Text style={styles.channelIdText}>
                  channel: {castId ?? 'Channel ID'}
                </Text>

                <TouchableWithoutFeedback onPress={onLeave}>
                  <MaterialCommunityIcons
                    name="exit-to-app"
                    size={28}
                    color="#fff"
                  />
                </TouchableWithoutFeedback>
              </View>
            ) : null}

            {/* <View style={styles.usernameTextWrap}>
              <Text style={styles.usernameText}>
                Hi, {name ?? 'Anonymous'} - `(${remoteUId})`
              </Text>
            </View> */}
            {isAuxVisible ? (
              <View style={styles.colIconsView}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    isAuxVisible ? console.log('Liked..') : null;
                  }}>
                  <SimpleLineIcons
                    name="like"
                    size={36}
                    color="#fff"
                    style={styles.colIcons}
                  />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => null}
                  disabled={isAuxVisible}>
                  <MaterialCommunityIcons
                    name="chat-processing-outline"
                    size={36}
                    color="#fff"
                    style={styles.colIcons}
                  />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => null}
                  disabled={isAuxVisible}>
                  <MaterialCommunityIcons
                    name="gift-outline"
                    size={36}
                    color="#fff"
                    style={styles.colIcons}
                  />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => null}
                  disabled={isAuxVisible}>
                  <SimpleLineIcons
                    name="globe"
                    size={36}
                    color="#fff"
                    style={styles.colIcons}
                  />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => null}
                  disabled={isAuxVisible}>
                  <MaterialCommunityIcons
                    name="content-save-cog-outline"
                    size={32}
                    color="#fff"
                  />
                </TouchableWithoutFeedback>
              </View>
            ) : null}

            {isAuxVisible ? (
              <View style={styles.commentInput}>
                <MessageInputComponent
                  isEnabled={isAuxVisible}
                  user={name}
                  value={comment}
                  onChangeText={setComment}
                />
              </View>
            ) : null}
          </>
        ) : (
          <SafeAreaView style={styles.noStreamContainer}>
            <MaterialCommunityIcons name="alert-octagon" size={150} />
            <Text>Stream not yet started, or is stopped</Text>
          </SafeAreaView>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default GuestView;

const styles = StyleSheet.create({
  channelIdText: {fontSize: 16, color: '#fff', right: '25%'},
  colIcons: {
    zIndex: 99,
    marginBottom: 32,
  },
  colIconsView: {
    position: 'absolute',
    right: 16,
    top: '32%',
  },
  commentInput: {
    position: 'absolute',
    bottom: 14,
    left: 14,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingHeader: {
    position: 'absolute',
    top: '16%',
    bottom: 8,
    right: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
  },
  gradientWrap: {
    width: '100%',
    height: windowHeight,
  },
  noStreamContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameText: {fontSize: 18, fontWeight: 'bold', color: '#fff'},
  usernameTextWrap: {top: '14%', paddingLeft: 12},
  videoView: {
    width: '100%',
    height: windowHeight,
    alignSelf: 'center',
  },
});
