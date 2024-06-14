import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface InputComponentProps {
  label: string;
  placeholder: string;
  isPassword?: boolean;
  onValueChange: (text: string) => void;
  onForgotPassword?: () => void;
}

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  placeholder,
  isPassword = false,
  onValueChange,
  onForgotPassword
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput 
        style={styles.input} 
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        secureTextEntry={isPassword}
        onChangeText={onValueChange}
      />
      {isPassword && onForgotPassword && (
        <TouchableOpacity onPress={onForgotPassword}>
          <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  label: {
    fontFamily: "Roboto-Regular",
    position: 'absolute',
    top: -10,
    left: 10,
    color: "rgba(255, 255, 255, 0.6)",
    paddingHorizontal: 5,
  },
  input: {
    padding: 10,
    borderColor: "rgba(255, 255, 255, 0.6)",
    borderWidth: 1,
    borderRadius: 5, 
    color: "rgba(255, 255, 255, 0.6)",
    fontFamily: "Jura-Medium",
  },
  forgotPassword: {
    fontFamily: "Roboto-Regular",
    color: "rgba(255, 255, 255, 0.6)",
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    marginTop: 5,
  }
});

export default InputComponent;
