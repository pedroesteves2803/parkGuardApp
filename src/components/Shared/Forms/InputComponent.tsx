import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface InputComponentProps {
  label: string;
  placeholder: string;
  isPassword?: boolean;
  onValueChange: (text: string) => void;
  value?: string;
}

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  placeholder,
  isPassword = false,
  onValueChange,
  value
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput 
          style={styles.input} 
          placeholder={placeholder}
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          secureTextEntry={isPassword && !passwordVisible}
          onChangeText={onValueChange}
          value={value}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Image source={passwordVisible ? require("../../../../assets/openEye.png") : require("../../../../assets/closedEye.png")} style={styles.eyeIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: "rgba(255, 255, 255, 0.6)",
    borderWidth: 1,
    borderRadius: 5,
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
    flex: 1,
    padding: 10,
    color: "rgba(255, 255, 255, 0.6)",
    fontFamily: "Jura-Medium",
  },
  eyeIcon: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
});

export default InputComponent;
