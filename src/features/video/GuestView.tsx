import {
  Alert,
  Clipboard,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import {useMeeting} from '@videosdk.live/react-native-sdk';
import LinearGradient from 'react-native-linear-gradient';
//import Video from 'react-native-video';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import MessageInputComponent from '../../components/MessageInputComponent';

const windowHeight = Dimensions.get('window').height;

const GuestView = ({castId, name}) => {
  const [comment, setComment] = useState('');
  // const {hlsState, hlsUrls, meetingId, leave} = useMeeting();
  const [valid, setValid] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#f0decc', '#f0b271', '#dd7508']}
        style={{
          flex: 1,
          width: '100%',
        }}>
        {valid ? (
          <>
            {/** Render video player */}
            <View
              style={{
                width: '100%',
                height: windowHeight - 24,
                // top: 16,
                //  backgroundColor: 'pink',
              }}>
              {/** Screen floating header for streamID and Leave icon */}
              <View style={styles.floatingHeader}>
                <Text style={{fontSize: 18}}>ID: {castId ?? 'Meeting ID'}</Text>
                <Text style={{fontSize: 21, fontWeight: 'bold'}}>
                  Hi, {name ?? 'Unknown'}
                </Text>
                <TouchableWithoutFeedback onPress={() => setValid(false)}>
                  <MaterialCommunityIcons name="exit-to-app" size={28} />
                </TouchableWithoutFeedback>
              </View>
              <View style={{position: 'absolute', bottom: 28, left: 14}}>
                <MessageInputComponent
                  value={comment}
                  onChangeText={setComment}
                />
              </View>
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingHeader: {
    top: 36,
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  noStreamContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
