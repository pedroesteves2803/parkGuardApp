import React from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

const AlertErrorModal: React.FC<ModalProps> = ({ visible, onClose, title, message }) => {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.modalBackground}
        onPress={onClose}
      >

      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Image source={require("../../../../assets/alert.png")} style={styles.alertIcon} /> 
          {title ? (
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.modalText}>{message}</Text>
            </View>
          ) : (
            <Text style={styles.modalText}>{message}</Text>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeTextStyle}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableOpacity>

    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    // paddingTop: 80,
    width: '100%',
    alignItems: 'center',
  },
  modalView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%', 
    padding: 20,
    backgroundColor: "#D32F2F",
    borderRadius: 10, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  alertIcon: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 15, 
    color: "#fff", 
    marginLeft: 5, 
    fontWeight: "bold",
    width: "90%"
  },
  closeButton: {
    top: -20,
    marginLeft: 'auto',
  },
  textStyle: {
    color: "#fff",
    fontSize: 20,
  },
  closeTextStyle: {
    color: "#fff",
    fontSize: 18,
  },
  modalText: {
    marginLeft: 5, 
    fontSize: 15, 
    color: "#fff", 
    width: "75%"
  },
  textContainer: {
    width: "90%"
  }
});

export default AlertErrorModal;
