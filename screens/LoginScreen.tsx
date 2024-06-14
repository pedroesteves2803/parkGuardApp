import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import InputComponent from '../components/InputComponent';
import WavesComponent from '../components/WavesComponent';
import ButtonComponent from '../components/ButtonComponent';
import { useAuth } from '../contexts/AuthContext';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.loginContainer}>
      <Image
        style={styles.logoIcon}
        contentFit="cover"
        source={require("../assets/logotipo.png")}
      />
      <Text style={styles.parkguardText}>ParkGuard</Text>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeHeading}>Bem-vindo</Text>
        <Text style={[styles.welcomeHeading, styles.welcomeText]}>Insira suas credenciais para continuar</Text>
      </View>

      <View style={styles.inputContainer}>
        <InputComponent label="E-mail" placeholder="email@gmail.com" onValueChange={setEmail} />
        <InputComponent 
          label="Senha" 
          placeholder="Insira sua senha" 
          isPassword={true} 
          onValueChange={setPassword} 
          onForgotPassword={() => navigation.navigate('ResetPassword')}
        />            
      </View>

      <ButtonComponent label="LOGIN" onPress={() => signIn(email, password)} />
      <WavesComponent />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: "#1E1E1E",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    flex: 1,
  },
  logoIcon: {
    top: 171,
    left: 83,
    width: 61,
    height: 60,
    position: "absolute",
  },
  parkguardText: {
    top: 184,
    left: 152,
    textAlign: "center",
    width: 151,
    height: 35,
    position: "absolute",
    color: "#fff",
    fontWeight: "500",
    fontSize: 30,
    fontFamily: "Jura-Medium",
  },
  welcomeContainer: {
    top: 267,
    width: 296,
    left: 47,
    position: "absolute",
  },
  welcomeHeading: {
    fontSize: 25,
    letterSpacing: 2,
    lineHeight: 29,
    fontFamily: "Roboto-Flex",
    textAlign: "left",
    alignSelf: "stretch",
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.87)",
  },
  welcomeText: {
    marginTop: 16,
    textAlign: "left",
    alignSelf: "stretch",
    lineHeight: 20,
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    fontFamily: "Roboto-Regular",
    letterSpacing: 0,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LoginScreen;
