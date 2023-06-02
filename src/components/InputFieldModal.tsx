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
    height: windowHeight * 0.75,
    // width: '90%',
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

// ================================
{
  /* <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalView}>
            <View style={styles.linkContainer}>
              <MaterialCommunityIcons name="link" size={24} />
              <Pressable onPress={twoButtonAlert}>
                <Text style={styles.infoSubText}>
                  Get a streaming link to share
                </Text>
              </Pressable>
            </View>

            <View style={styles.linkContainer}>
              <MaterialCommunityIcons name="video-wireless-outline" size={24} />
              <Pressable onPress={twoButtonAlert}>
                <Text style={[styles.infoSubText, {right: 52}]}>
                  Start a stream
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal> */
}
