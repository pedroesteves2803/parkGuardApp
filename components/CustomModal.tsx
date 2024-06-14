import React from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

const CustomModal: React.FC<ModalProps> = ({ visible, onClose, title, message }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Image source={require('../assets/alert.png')} style={styles.alertIcon} /> 
          {title ? (
            <View>
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    paddingTop: 50,
    width: '100%',
    alignItems: 'center',
  },
  modalView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%', 
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
    fontSize: 18, 
    color: "#fff", 
    marginLeft: 5, 
    fontWeight: "bold",
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
    fontSize: 12, 
    color: "#fff", 
  }
});

export default CustomModal;
