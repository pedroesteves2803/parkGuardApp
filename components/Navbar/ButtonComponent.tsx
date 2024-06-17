import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

interface ButtonComponentProps {
    image: any;
    label: string;
  }

const ButtonComponent: React.FC<ButtonComponentProps> = ({image, label}) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Image
        source={image}
        style={styles.image}
      />
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 0.3,
    backgroundColor: 'rgba(100, 100, 100, 0.23)',
    borderRadius: 10,
    borderColor: '#5A5A5A',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 107,
    height: 92,
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 55,
  },
  buttonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 17.16,
    color: '#C6C6C6', 
    marginTop: 10,
    marginLeft: -5,
  },
});

export default ButtonComponent;
