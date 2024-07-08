import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { useAuth } from '../contexts/AuthContext';
import AlertErrorModal from '../components/Shared/Modals/AlertErrorModal';
import LoginInputComponent from '../components/Login/Forms/LoginInputComponent';
import ButtonComponent from '../components/Shared/Forms/ButtonComponent';
import LoginWavesComponent from '../components/Login/Footer/LoginWavesComponent';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { signIn, errorMessage, setErrorMessage } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputEmpty, setInputEmpty] = useState('');
  
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  };

  const handleSignIn = async () => {
    if (email === '' || password === '') {
      setInputEmpty('Preencha os campos para continuar.');
      return;
    }    

    if (!validateEmail(email)) {
        setInputEmpty('Por favor, insira um email válido.');
        return;
    }

    await signIn(email, password);
  };

  return (
    <View style={styles.loginContainer} >
     <AlertErrorModal visible={!!errorMessage} onClose={() => setErrorMessage('')} title="Algo deu errado!" message={errorMessage} />
     <AlertErrorModal visible={!!inputEmpty} onClose={() => setInputEmpty('')}  message={inputEmpty} />
      
      <Image
        style={styles.logoIcon}
        contentFit="cover"
        source={require("../../assets/logotipo.png")}
      />
      <Text style={styles.parkguardText}>ParkGuard</Text>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeHeading}>Bem-vindo</Text>
        <Text style={[styles.welcomeHeading, styles.welcomeText]}>Insira suas credenciais para continuar</Text>
      </View>

      <View style={styles.inputContainer}>
        <LoginInputComponent label="E-mail" placeholder="email@gmail.com" onValueChange={setEmail} />
        <LoginInputComponent 
          label="Senha" 
          placeholder="Insira sua senha" 
          isPassword={true} 
          onValueChange={setPassword} 
          onForgotPassword={() => navigation.navigate('ResetPassword')}
        />            
      </View>

      <ButtonComponent label="LOGIN" onPress={handleSignIn} />
      <LoginWavesComponent />
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
    width: 160,
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
    top: Platform.OS === 'ios' ? 0 : 50,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LoginScreen;
