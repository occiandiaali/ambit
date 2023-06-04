import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
//import Video from 'react-native-video';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import MessageInputComponent from '../../components/MessageInputComponent';
//import RtcSurfaceView from 'react-native-agora'

const windowHeight = Dimensions.get('window').height;

const GuestView = ({castId, name, onLeave}) => {
  const [comment, setComment] = useState('');

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
                height: windowHeight,
                // top: 16,
                //  backgroundColor: 'pink',
              }}>
              {/** Screen floating header for streamID and Leave icon */}
              <View style={styles.floatingHeader}>
                <Text style={{fontSize: 18, paddingLeft: 6}}>
                  ID: {castId ?? 'Meeting ID'}
                </Text>

                <TouchableWithoutFeedback
                  onPress={() => {
                    onLeave;
                    setValid(false);
                  }}>
                  <MaterialCommunityIcons name="exit-to-app" size={28} />
                </TouchableWithoutFeedback>
              </View>
              <View style={{top: '14%', paddingLeft: 12}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>
                  Hi, {name ?? 'Unknown'}
                </Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  right: 16,
                  top: '48%',
                }}>
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
              </View>
              <View
                style={{
                  position: 'absolute',
                  bottom: 2, //-8,
                  left: 14,
                }}>
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
  colIcons: {
    marginBottom: 32,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingHeader: {
    top: '16%', //36,
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  noStreamContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
