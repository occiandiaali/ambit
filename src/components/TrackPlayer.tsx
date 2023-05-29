import React, {useEffect} from 'react';
import {View, Text, Modal, Image, StyleSheet, Pressable} from 'react-native';
import Slider from '@react-native-community/slider';
// import ShuffleIcon from '../assets/icons/shuffle.png';
// import PrevIcon from '../assets/icons/prev.png';
// import NextIcon from '../assets/icons/next.png';
// import LoopIcon from '../assets/icons/loop.png';
// import PlayIcon from '../assets/icons/play.png';
// import PauseIcon from '../assets/icons/pause.png';
// import MenuIcon from '../assets/icons/down.png';
import {secsToTimestamp} from '../functions/formatTime';
import {useProgress} from 'react-native-track-player';
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

  const Shuffle = () => <MaterialIcons name="shuffle" size={24} />;
  const Prev = () => <MaterialIcons name="skip-previous" size={24} />;
  const Next = () => <MaterialIcons name="skip-next" size={24} />;
  const Play = () => <MaterialIcons name="play-arrow" size={24} />;
  const Pause = () => <MaterialIcons name="pause" size={24} />;
  const Loop = () => <MaterialIcons name="loop" size={24} />;
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
      <Text style={styles.mainText}>Playing from My Playlist</Text>
      <Text style={[styles.mainText, {fontWeight: 'bold'}]}>
        {selectedMusic?.album}
      </Text>
      <Image
        style={{width: 350, height: 350, marginVertical: 75}}
        source={{uri: selectedMusic?.artwork}}
      />
      <View style={{justifyContent: 'space-between', width: '100%'}}>
        <View>
          <Text style={styles.boldMainText}>{selectedMusic?.title}</Text>
          <Text style={styles.mainText}>{selectedMusic?.artist}</Text>
        </View>
        <Text>Like</Text>
      </View>

      <Slider
        tapToSeek={true}
        minimumTrackTintColor="#fff"
        onValueChange={e => {
          onSeekTrack(Math.floor(e * selectedMusic?.duration));
        }}
        style={{width: '100%', paddingHorizontal: 10}}
        value={timestamp / selectedMusic?.duration}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Text style={styles.mainText}>{secsToTimestamp(timestamp)}</Text>
        <Text style={styles.mainText}>
          {secsToTimestamp(selectedMusic?.duration - timestamp)}
        </Text>
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
    color: '#fff',
    fontWeight: '500',
    marginTop: 12,
    marginHorizontal: 20,
    marginBottom: 1,
  },
  mainText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginHorizontal: 20,
    // marginBottom: 12,
    // marginTop: 1,
  },
  //   linearGradient: {
  //     width: '100%',
  //     height: 250,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
  iconWidth: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  timeStampHolder: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  playButtonHolder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
