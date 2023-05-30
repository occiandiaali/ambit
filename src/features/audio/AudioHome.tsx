import React, {useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {musiclibrary} from '../../../data';
import TrackPlayerComponent from '../../components/TrackPlayer';
import SlidingUpPanel from 'rn-sliding-up-panel';

const styles = StyleSheet.create({
  catext: {
    width: 100,
    height: 40,
    marginLeft: 4,
    backgroundColor: 'orange',
    padding: 8,
    borderRadius: 21,
  },
  container: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
  },
  row1: {
    width: 168,
    height: 168,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 28,
    marginRight: 6,
    backgroundColor: 'orange',
    borderRadius: 14,
  },
  rowRecommended: {
    marginTop: 8,
  },
  sectionLabel: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingLeft: 16,
  },
  topRow: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 28,
    marginRight: 6,
    backgroundColor: 'green',
    borderRadius: 14,
  },
  widgetArtisteTitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginHorizontal: 10,
    marginBottom: 12,
    marginTop: 1,
  },
  widgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 100,
    width: '100%',
    backgroundColor: '#5E5A5A',
  },
  widgetImageStyle: {
    width: 55,
    height: 60,
    marginTop: 3,
  },
  widgetMusicTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
    marginTop: 12,
    marginHorizontal: 10,
    marginBottom: 1,
  },
});

const DATA = [
  {
    id: 1,
    label: 'ONE',
  },
  {
    id: 2,
    label: 'TWO',
  },
  {
    id: 3,
    label: 'THREE',
  },
  {
    id: 4,
    label: 'FOUR',
  },
  {
    id: 5,
    label: 'FIVE',
  },
];

const Play = () => <MaterialIcons name="play-arrow" size={24} />;
const Pause = () => <MaterialIcons name="pause" size={24} />;

const windowHeight = Dimensions.get('window').height;

const AudioHome = () => {
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [selectedMusicIndex, setSelectedMusicIndex] = useState(0);
  const [isPlayerModalVisible, setIsPlayerModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeStamp, setTimestamp] = useState(0);
  const [mode, setMode] = useState('shuffle');

  const slideUpRef = useRef<SlidingUpPanel>(null);
  const snapPoints = useMemo(() => [200, 400, 650], []);

  const openUp = () => {
    // slideUpRef.current?.show(snapPoints[0]);
    slideUpRef.current?.show({toValue: snapPoints[0], velocity: 0.2});
    //  slideUpRef.current?.scrollIntoView(snapPoints[0]);
  };

  const onSelectTrack = async (selectedTrack, index) => {
    openUp();
    setSelectedMusic(selectedTrack);
    setTimestamp(0);
    setSelectedMusicIndex(index);
    console.log(`SelectedIndex: ${selectedMusicIndex}`);
    console.log(`SelectedMusic: ${selectedTrack}`);
  };

  const playOrPause = async () => setIsPlaying(!isPlaying);

  const onSeekTrack = newTimeStamp => setTimestamp(newTimeStamp);

  const onPressNext = () => {
    setTimestamp(0);
    setSelectedMusic(
      musiclibrary[(selectedMusicIndex + 1) % musiclibrary.length],
    );
    setSelectedMusicIndex(selectedMusicIndex + 1);
  };

  const onPressPrev = () => {
    if (selectedMusicIndex === 0) {
      return;
    }
    setTimestamp(0);
    setSelectedMusic(
      musiclibrary[(selectedMusicIndex - 1) % musiclibrary.length],
    );
    setSelectedMusicIndex(selectedMusicIndex - 1);
  };

  // const renderSingleItem = ({item, index}) => {
  //   return (
  //     <>
  //     <Pressable onPress={() => onSelectTrack(item, index)}>
  //       <View>
  //         <Text style={styles.musicTitle}>{item.title}</Text>
  //         <Text style={styles.artisteTitle}>{item.artist}</Text>
  //       </View>
  //     </Pressable>
  //     </>
  //   )
  // }

  return (
    <View style={styles.container}>
      <TrackPlayerComponent
        onCloseModal={() => setIsPlayerModalVisible(false)}
        isVisible={isPlayerModalVisible}
        isPlaying={isPlaying}
        playOrPause={playOrPause}
        selectedMusic={selectedMusic}
        onSeekTrack={onSeekTrack}
        timestamp={timeStamp}
        onPressNext={onPressNext}
        onPressPrev={onPressPrev}
        playbackMode={mode}
        onClickShuffle={null}
        onClickLoop={() => (mode === 'loop' ? setMode('loop') : setMode('off'))}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={DATA}
          renderItem={({item}) => (
            <View style={styles.topRow}>
              <Text>{item.label}</Text>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
        <View style={styles.catRow}>
          <View style={styles.catext}>
            <Text style={{color: '#fff', textAlign: 'center'}}>Music</Text>
          </View>
          <View style={styles.catext}>
            <Text style={{color: '#fff', textAlign: 'center'}}>Podcasts</Text>
          </View>
          <View style={styles.catext}>
            <Text style={{color: '#fff', textAlign: 'center'}}>Discover</Text>
          </View>
          <View style={{top: 6, left: 18}}>
            <MaterialIcons name="more-vert" size={24} />
          </View>
        </View>
        <View style={styles.rowRecommended}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.sectionLabel}>Popular</Text>
            <Text style={{right: 16, top: 24, fontSize: 14}}>see all</Text>
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={musiclibrary}
            renderItem={({item}) => (
              <Pressable onPress={() => onSelectTrack(item, item.url)}>
                <View style={styles.row1}>
                  <Text>{item.title}</Text>
                  <Text>{item.artist}</Text>
                </View>
              </Pressable>
            )}
            keyExtractor={item => item.url}
          />
        </View>
        <View style={styles.rowRecommended}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.sectionLabel}>Recommended</Text>
            <Text style={{right: 16, top: 24, fontSize: 14}}>see all</Text>
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={musiclibrary}
            renderItem={({item}) => (
              <View style={[styles.row1, {marginBottom: 120}]}>
                <Text>{item.artist}</Text>
                <Text>{item.title}</Text>
              </View>
            )}
            keyExtractor={item => item.url}
          />
        </View>
      </ScrollView>

      <SlidingUpPanel
        ref={slideUpRef}
        draggableRange={{top: windowHeight * 0.8, bottom: 0}}
        snappingPoints={snapPoints}
        height={windowHeight * 0.8}
        showBackdrop={false}
        containerStyle={{
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
        }}>
        <>
          {selectedMusic ? (
            <Pressable onPress={() => setIsPlayerModalVisible(true)}>
              <View style={[styles.widgetContainer, {}]}>
                <View style={{flexDirection: 'row'}}>
                  {/* <View
                    style={{width: 80, height: 80, backgroundColor: 'gray'}}
                  /> */}
                  <Image
                    style={{width: 80, height: 80}}
                    source={require('../../assets/images/black-woman-face.jpeg')}
                  />
                  <View>
                    <Text style={styles.widgetMusicTitle}>
                      {selectedMusic?.title}
                    </Text>
                    <Text style={styles.widgetArtisteTitle}>
                      {selectedMusic?.artist}
                    </Text>
                  </View>
                </View>
                <Pressable onPress={() => playOrPause()}>
                  {isPlaying ? <Pause /> : <Play />}
                </Pressable>
              </View>
            </Pressable>
          ) : null}
        </>
      </SlidingUpPanel>
    </View>
  );
};

export default AudioHome;
