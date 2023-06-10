import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  avatarWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  gradientWrapper: {
    flex: 1,
  },
  newsContainer: {
    width: 350,
    height: 250,
    borderRadius: 12,
    backgroundColor: '#999999',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 6,
    marginBottom: 8,
    // bottom: 48,
  },
  profileContainer: {
    width: '100%',

    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    // bottom: 8,
    marginTop: 18,
    marginBottom: 8,
    backgroundColor: '#999999',
  },
  profileTitleText: {
    fontSize: 24,
    color: '#fff',
  },
  profileTitleView: {
    margin: 12,
  },
  profileUnwrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '64%',
    height: 40,
    borderRadius: 24,
    //top: 24,
    padding: 6,
    backgroundColor: 'orange',
  },
  settingsContainer: {
    width: 350,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#5b5b5b',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    // marginTop: 6,
    marginBottom: 6,
  },
});

const DATA = [
  {
    id: 1,
    text: 'Blocked Accounts',
  },
  {
    id: 2,
    text: 'Notifications',
  },
  {
    id: 3,
    text: 'Privacy Policy',
  },
  {
    id: 4,
    text: 'Log Out',
  },
];

const AccountHome = () => {
  const [showFullProfile, setShowFullProfile] = useState(false);
  const toggleFullProfile = () => setShowFullProfile(prev => !prev);

  return (
    <LinearGradient
      colors={['#f0decc', '#f0b271', '#dd7508']}
      style={styles.gradientWrapper}>
      <View style={styles.container}>
        <View
          style={[
            styles.profileContainer,
            {
              height: showFullProfile ? '90%' : 300,
              top: showFullProfile ? 18 : undefined,
            },
          ]}>
          <View
            style={[
              styles.avatarWrap,
              {bottom: showFullProfile ? 2 : 4, top: showFullProfile ? 68 : 4},
            ]}>
            <MaterialCommunityIcons name="account-settings" size={48} />
          </View>
          <View
            style={[
              styles.profileTitleView,
              {bottom: showFullProfile ? 2 : 4, top: showFullProfile ? 68 : 4},
            ]}>
            <Text style={styles.profileTitleText}>Username here</Text>
          </View>
          <TouchableWithoutFeedback onPress={toggleFullProfile}>
            <View
              style={[
                styles.profileUnwrap,
                {
                  bottom: showFullProfile ? 2 : 4,
                  top: showFullProfile ? 84 : 24,
                },
              ]}>
              <MaterialCommunityIcons
                name={
                  !showFullProfile ? 'menu-down-outline' : 'menu-up-outline'
                }
                size={24}
                style={{paddingTop: 2}}
              />
              <Text style={{textAlignVertical: 'center'}}>
                {showFullProfile ? 'Hide' : 'Show'} settings
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <View style={{top: '28%'}}>
            {showFullProfile ? (
              <FlatList
                data={DATA}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <View style={styles.settingsContainer}>
                    <MaterialCommunityIcons
                      name="set-center-right"
                      color={'#fff'}
                      size={24}
                      style={{left: '15%'}}
                    />
                    <Text style={{color: '#fff', left: '28%'}}>
                      {item.text}
                    </Text>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      color={'#fff'}
                      size={24}
                      style={{position: 'absolute', right: '5%'}}
                    />
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
              />
            ) : null}
          </View>
        </View>

        {!showFullProfile ? (
          <FlatList
            data={DATA}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.newsContainer}>
                <Text>{item.text}</Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        ) : null}
      </View>
    </LinearGradient>
  );
};

export default AccountHome;
