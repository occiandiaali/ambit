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

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#f0decc', '#f0b271', '#dd7508']}
        style={styles.gradientWrap}>
        {castId ? (
          <>
            <View>
              <React.Fragment key={remoteUId}>
                <RtcSurfaceView
                  canvas={{uid: remoteUId}}
                  style={styles.videoView}
                />
              </React.Fragment>
            </View>

            <View style={styles.floatingHeader}>
              <Text style={styles.channelIdText}>
                Channel: {castId ?? 'Channel ID'}
              </Text>

              <TouchableWithoutFeedback onPress={onLeave}>
                <MaterialCommunityIcons
                  name="exit-to-app"
                  size={28}
                  color="#fff"
                />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.usernameTextWrap}>
              <Text style={styles.usernameText}>
                Hi, {name ?? 'Anonymous'} - `(${remoteUId})`
              </Text>
            </View>
            <View style={styles.colIconsView}>
              <TouchableWithoutFeedback onPress={() => null}>
                <SimpleLineIcons
                  name="like"
                  size={36}
                  color="#fff"
                  style={styles.colIcons}
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => null}>
                <MaterialCommunityIcons
                  name="chat-processing-outline"
                  size={36}
                  color="#fff"
                  style={styles.colIcons}
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => null}>
                <MaterialCommunityIcons
                  name="gift-outline"
                  size={36}
                  color="#fff"
                  style={styles.colIcons}
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => null}>
                <SimpleLineIcons
                  name="globe"
                  size={36}
                  color="#fff"
                  style={styles.colIcons}
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={onLeave}>
                <MaterialCommunityIcons
                  name="exit-to-app"
                  size={32}
                  color="#fff"
                />
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.commentInput}>
              <MessageInputComponent
                user={name}
                value={comment}
                onChangeText={setComment}
              />
            </View>
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
  channelIdText: {fontSize: 18, paddingLeft: 6, color: '#fff'},
  colIcons: {
    marginBottom: 32,
  },
  colIconsView: {
    position: 'absolute',
    right: 16,
    top: '38%',
  },
  commentInput: {
    position: 'absolute',
    bottom: 2,
    left: 14,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingHeader: {
    top: '16%',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
