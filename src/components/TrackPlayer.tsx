import React from 'react';
import {View, Text, Modal, Image, StyleSheet, Pressable} from 'react-native';
import Slider from '@react-native-community/slider';

import {secsToTimestamp} from '../functions/formatTime';
//import {useProgress} from 'react-native-track-player';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function TrackPlayerComponent({
  isVisible,
  onCloseModal,
  selectedMusic,
  isPlaying,
  playOrPause,
  onSeekTrack,
  timestamp,
  onPressNext,
  onPressPrev,
  playbackMode,
  onClickShuffle,
  onClickLoop,
}) {
  // const {position, buffered, duration} = useProgress();

  const Shuffle = () => (
    <MaterialIcons name="shuffle" size={24} color="orange" />
  );
  const Prev = () => (
    <MaterialIcons name="skip-previous" size={24} color="orange" />
  );
  const Next = () => (
    <MaterialIcons name="skip-next" size={24} color="orange" />
  );
  const Play = () => <MaterialIcons name="play-arrow" size={24} color="#fff" />;
  const Pause = () => <MaterialIcons name="pause" size={24} color="#fff" />;
  const Loop = () => <MaterialIcons name="loop" size={24} color="orange" />;
  const MusicMenu = () => <MaterialIcons name="queue-music" size={24} />;

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      presentationStyle="fullScreen">
      <Pressable
        onPress={onCloseModal}
        style={{
          position: 'absolute',
          top: 45,
          left: 30,
        }}>
        <MusicMenu />
      </Pressable>

      <View
        style={{
          width: 250,
          height: 250,
          borderRadius: 24,
          marginTop: 100,
          alignSelf: 'center',
          backgroundColor: 'pink',
        }}>
        <Image
          source={{uri: selectedMusic?.artwork}}
          style={{
            width: 250,
            height: 250,
          }}
        />
      </View>
      <View
        style={{
          // left: '10%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '16%',
          width: '100%',
        }}>
        <Text style={[styles.boldMainText, {color: 'orange'}]}>
          {selectedMusic?.title}
        </Text>
        <Text style={[styles.mainText, {color: 'blue'}]}>
          {selectedMusic?.artist}
        </Text>

        <Text>Like</Text>
      </View>

      <View style={styles.sliderWrap}>
        <Slider
          tapToSeek={true}
          minimumTrackTintColor="red"
          onValueChange={e => {
            onSeekTrack(Math.floor(e * selectedMusic?.duration));
          }}
          style={{width: '100%', paddingHorizontal: 20}}
          value={timestamp / selectedMusic?.duration}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text style={{marginHorizontal: 40}}>
            {secsToTimestamp(timestamp)}
          </Text>
          <Text style={{marginHorizontal: 40}}>
            {secsToTimestamp(selectedMusic?.duration - timestamp)}
          </Text>
        </View>
      </View>
      <View style={styles.timeStampHolder}>
        <Pressable onPress={onClickShuffle}>
          <Shuffle />
        </Pressable>
        <Pressable onPress={onPressPrev}>
          <Prev />
        </Pressable>

        <Pressable onPress={playOrPause} style={styles.playButtonHolder}>
          {isPlaying ? <Pause /> : <Play />}
        </Pressable>
        <Pressable onPress={onPressNext}>
          <Next />
        </Pressable>
        <Pressable onPress={onClickLoop}>
          <Loop />
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191414',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 20,
  },
  boldMainText: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 1,
  },
  mainText: {
    fontSize: 16,
    color: 'orange',
    opacity: 0.8,
  },

  iconWidth: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  sliderWrap: {
    paddingTop: 40,
  },
  timeStampHolder: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 18,
    paddingHorizontal: 24,
  },
  playButtonHolder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
