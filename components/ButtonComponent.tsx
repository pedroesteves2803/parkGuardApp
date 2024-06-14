import React from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';

interface ButtonComponentProps {
  label: string;
  onPress: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ label, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    top: 565,
    shadowColor: "rgba(0, 0, 0, 0.12)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 1,
    backgroundColor: "#0393AE",
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 4,
    width: '80%',
    left: 47,
    position: "absolute",
    overflow: "hidden",
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
});

export default ButtonComponent;
