import React, {useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Menu, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {musiclibrary, podcastLib} from '../../../data';
import TrackPlayerComponent from '../../components/TrackPlayer';
import SlidingUpPanel from 'rn-sliding-up-panel';
import LinearGradient from 'react-native-linear-gradient';

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
  moreVertMenuOptionContainer: {padding: 12},
  musiPodDisRowText: {color: '#fff', textAlign: 'center'},
  popularPlayIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'gray',

    position: 'absolute',
    alignSelf: 'center',
    top: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popularRowArtistText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  popularRowBgImage: {
    width: 168,
    height: 168,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popularRowTextsContainer: {
    height: 100,
    width: 124,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'black',
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  popularRowTitleText: {
    fontSize: 18,
    color: 'yellow',
    fontWeight: 'bold',
    paddingTop: 24,
  },
  recommendRowArtistText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  recommendRowBgImage: {
    width: 168,
    height: 168,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendRowPlayIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    top: 6,
    backgroundColor: 'gray',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendRowTextsContainer: {
    height: 80,
    width: 120,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'black',
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendRowTitleText: {
    fontSize: 18,
    color: 'yellow',
    fontWeight: 'bold',
  },
  row1: {
    width: 168,
    height: 168,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 28,
    marginRight: 6,
    backgroundColor: 'grey',
    borderRadius: 14,
  },
  rowRecommended: {
    marginTop: 8,
  },
  rowHeaderContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  sectionLabel: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingLeft: 16,
  },
  seeAllText: {right: 16, top: 24, fontSize: 14},
  slidingPanelAvatar: {width: 80, height: 80},
  slidingPanelTextContainer: {right: 54},
  topRow: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 28,
    marginRight: 6,
    backgroundColor: 'grey',
    // opacity: 0.4,
    borderRadius: 14,
  },
  topRowBgImage: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
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
    img: 'https://www.bensound.com/bensound-img/happyrock.jpg',
  },
  {
    id: 2,
    label: 'TWO',
    img: 'https://www.bensound.com/bensound-img/punky.jpg',
  },
  {
    id: 3,
    label: 'THREE',
    img: 'https://www.bensound.com/bensound-img/happyrock.jpg',
  },
  {
    id: 4,
    label: 'FOUR',
    img: 'https://www.bensound.com/bensound-img/punky.jpg',
  },
  {
    id: 5,
    label: 'FIVE',
    img: 'https://www.bensound.com/bensound-img/punky.jpg',
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
  const snapPoints = useMemo(() => [200, 400, windowHeight], []);

  const openUp = () => {
    slideUpRef.current?.show({toValue: snapPoints[0], velocity: 0.2});
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

  const onSeekTrack = (newTimeStamp: React.SetStateAction<number>) =>
    setTimestamp(newTimeStamp);

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
    <LinearGradient
      colors={['#f0decc', '#f0b271', '#dd7508']}
      style={{
        flex: 1,
      }}>
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
          onClickLoop={() =>
            mode === 'loop' ? setMode('loop') : setMode('off')
          }
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={DATA}
            renderItem={({item}) => (
              <View style={styles.topRow}>
                <ImageBackground
                  resizeMode={'cover'}
                  style={styles.topRowBgImage}
                  source={{uri: item.img}}>
                  <Text>{item.label}</Text>
                </ImageBackground>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
          <View style={styles.catRow}>
            <View style={styles.catext}>
              <Text style={styles.musiPodDisRowText}>Music</Text>
            </View>
            <View
              style={[styles.catext, {backgroundColor: 'grey', opacity: 0.4}]}>
              <Text style={styles.musiPodDisRowText}>Podcasts</Text>
            </View>
            <View
              style={[styles.catext, {backgroundColor: 'grey', opacity: 0.4}]}>
              <Text style={styles.musiPodDisRowText}>Discover</Text>
            </View>
            <View style={{top: 6, left: 18}}>
              <Menu>
                <MenuTrigger>
                  <MaterialIcons name="more-vert" size={24} />
                </MenuTrigger>
                <MenuOptions>
                  <View style={styles.moreVertMenuOptionContainer}>
                    <Text>Option One</Text>
                  </View>
                  <View style={styles.moreVertMenuOptionContainer}>
                    <Text>Option Two</Text>
                  </View>
                  <View style={styles.moreVertMenuOptionContainer}>
                    <Text>Option Three</Text>
                  </View>
                </MenuOptions>
              </Menu>
            </View>
          </View>
          <View style={styles.rowRecommended}>
            <View style={styles.rowHeaderContainer}>
              <Text style={styles.sectionLabel}>Popular</Text>
              <Text style={styles.seeAllText}>see all</Text>
            </View>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={musiclibrary}
              renderItem={({item}) => (
                <Pressable onPress={() => onSelectTrack(item, item.url)}>
                  <View style={styles.row1}>
                    <ImageBackground
                      source={{uri: item.artwork.trim()}}
                      resizeMode="cover"
                      style={styles.popularRowBgImage}>
                      <View style={styles.popularRowTextsContainer}>
                        <Text style={styles.popularRowTitleText}>
                          {item.title}
                        </Text>
                        <Text style={styles.popularRowArtistText}>
                          {item.artist}
                        </Text>
                      </View>
                      <View style={styles.popularPlayIconContainer}>
                        <MaterialIcons
                          name="play-arrow"
                          size={24}
                          color="#fff"
                        />
                      </View>
                    </ImageBackground>
                  </View>
                </Pressable>
              )}
              keyExtractor={item => item.url}
            />
          </View>
          <View style={styles.rowRecommended}>
            <View style={styles.rowHeaderContainer}>
              <Text style={styles.sectionLabel}>Recommended</Text>
              <Text style={styles.seeAllText}>see all</Text>
            </View>

            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={podcastLib}
              renderItem={({item}) => (
                <Pressable onPress={() => onSelectTrack(item, item.url)}>
                  <View style={[styles.row1, {marginBottom: 120}]}>
                    <ImageBackground
                      source={{uri: item.artwork.trim()}}
                      resizeMode="cover"
                      style={styles.recommendRowBgImage}>
                      <View style={styles.recommendRowTextsContainer}>
                        <Text style={styles.recommendRowTitleText}>
                          {item.title}
                        </Text>
                        <Text style={styles.recommendRowArtistText}>
                          {item.artist}
                        </Text>
                      </View>
                      <View style={styles.recommendRowPlayIconContainer}>
                        <MaterialIcons
                          name="play-arrow"
                          size={24}
                          color="#fff"
                        />
                      </View>
                    </ImageBackground>
                  </View>
                </Pressable>
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
          showBackdrop={false}>
          <>
            {selectedMusic ? (
              <Pressable onPress={() => setIsPlayerModalVisible(true)}>
                <View style={[styles.widgetContainer, {}]}>
                  <Image
                    style={styles.slidingPanelAvatar}
                    source={{uri: selectedMusic?.artwork}}
                  />
                  <View style={styles.slidingPanelTextContainer}>
                    <Text style={styles.widgetMusicTitle}>
                      {selectedMusic?.title}
                    </Text>
                    <Text style={styles.widgetArtisteTitle}>
                      {selectedMusic?.artist}
                    </Text>
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
    </LinearGradient>
  );
};

export default AudioHome;
