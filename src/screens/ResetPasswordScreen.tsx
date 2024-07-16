import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import ButtonComponent from '../components/ResetPassword/Forms/ButtonComponent';
import LoginInputComponent from '../components/Login/Forms/LoginInputComponent';
import { useAuth } from '../contexts/AuthContext';
import AlertErrorModal from '../components/Shared/Modals/AlertErrorModal';
import AlertSuccessModal from '../components/Shared/Modals/AlertSuccessModal';

interface ResetPasswordScreenProps {
  navigation: any;
}

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ navigation }) => {
  const { resetPassword, errorMessage, setErrorMessage } = useAuth();
  const [email, setEmail] = useState('');
  const [inputEmpty, setInputEmpty] = useState('');
  const [success, setSuccess] = useState(false);
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    if (email === '') {
      setInputEmpty('Preencha o campo para continuar.');
      return;
    }

    if (!validateEmail(email)) {
        setInputEmpty('Por favor, insira um email válido.');
        return;
    }

    const response = await resetPassword(email);

    if (response !== false) {
      setSuccess(true);
      navigation.navigate('VerifyTokenPassword');
    }
  };

  return (
    <View style={styles.resetPasswordContainer}>

    <AlertErrorModal visible={!!errorMessage} onClose={() => setErrorMessage('')} title="Algo deu errado!" message={errorMessage} />
    <AlertErrorModal visible={!!inputEmpty} onClose={() => setInputEmpty('')}  message={inputEmpty} />
    <AlertSuccessModal visible={success} onClose={() => setSuccess(false)}  message='Token enviado!' />

      <Image
        style={styles.logoIcon}
        contentFit="cover"
        source={require("../../assets/logotipo.png")}
      />
      <Text style={styles.parkguardText}>ParkGuard</Text>

      <View style={styles.textContainer}>
        <Text style={styles.textHeading}>Recuperar senha</Text>
        <Text style={[styles.textHeading, styles.text]}>Esqueceu sua senha? Não se preocupe, digite seu e-mail para redefinir sua senha atual.</Text>
      </View>

      <View style={styles.inputContainer}>
        <LoginInputComponent label="E-mail" placeholder="email@gmail.com" onValueChange={setEmail} />
      </View>

      <ButtonComponent label="ENVIAR" onPress={handleResetPassword} />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backButtonLabel}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  resetPasswordContainer: {
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
  textContainer: {
    top: 267,
    width: 296,
    left: 47,
    position: "absolute",
  },
  textHeading: {
    fontSize: 25,
    letterSpacing: 2,
    lineHeight: 29,
    fontFamily: "Roboto-Flex",
    textAlign: "left",
    alignSelf: "stretch",
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.87)",
  },
  text: {
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
    justifyContent: 'center',
    alignItems: 'center',
    top: Platform.OS === 'ios' ? 390 : 390,
  },
  backButton: {
    top: 480,
    alignItems: 'center',
  },
  backButtonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});

export default ResetPasswordScreen;
