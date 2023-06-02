import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const windowHeight = Dimensions.get('window').height;

const InputFieldModal = ({animType, visibility, closeModal, children}) => {
  return (
    <Modal animationType={animType} transparent={true} visible={visibility}>
      <View style={styles.modalView}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <MaterialCommunityIcons name="close" size={26} style={styles.close} />
        </TouchableWithoutFeedback>
        {children}
      </View>
    </Modal>
  );
};

export default InputFieldModal;

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    top: 14,
    right: 24,
  },
  modalView: {
    margin: 20,
    height: windowHeight * 0.25,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
});

// ===================================

{
  /* <InputFieldModal
animType={'slide'}
visibility={modalVisible}
closeModal={() => setModalVisible(false)}
children={
  <>
    <View style={styles.contentWrapper}>
      <Text>Enter the LiveStream ID you received from the Host</Text>
      <TextInput
        style={styles.input}
        onChangeText={setJoinChannel}
        value={joinChannel}
        placeholder="XXX-XXXX-XXXX"
        placeholderTextColor={'#948b8b'}
      />
      <Pressable
        disabled={joinChannel.length < 5}
        onPress={() => {
          setMode('VIEWER');
          getStreamToken(joinChannel);
        }}
        style={[
          styles.joinPresser,
          {
            backgroundColor:
              joinChannel.length < 5 ? '#e7e4e4' : 'orange',
          },
        ]}>
        <MaterialCommunityIcons name="video-outline" size={24} />
        <Text style={{fontSize: 18, paddingLeft: 6}}>
          Join as Guest
        </Text>
      </Pressable>

      <Pressable
        disabled={joinChannel.length < 5}
        onPress={() => {
          setMode('VIEWER');
          getStreamToken(joinChannel);
        }}
        style={[
          styles.joinPresser,
          {
            backgroundColor:
              joinChannel.length < 5 ? '#e7e4e4' : 'orange',
            marginTop: 8,
          },
        ]}>
        <MaterialCommunityIcons name="video-outline" size={24} />
        <Text style={{fontSize: 18, paddingLeft: 6}}>
          Join as Host
        </Text>
      </Pressable>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 18,
          marginVertical: 16,
          fontStyle: 'italic',
          color: 'grey',
        }}>
        ---------- OR ----------
      </Text>
      <View style={styles.linkContainer}>
        <MaterialCommunityIcons
          name="video-wireless-outline"
          size={24}
        />
        <Pressable onPress={twoButtonAlert}>
          <Text style={[styles.infoSubText, {right: 14, top: 4}]}>
            Start a premium stream
          </Text>
        </Pressable>
      </View>
    </View>
  </>
}
/> */
}
