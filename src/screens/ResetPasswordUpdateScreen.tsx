import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import ButtonComponent from '../components/ResetPasswordUpdate/Forms/ButtonComponent';
import LoginInputComponent from '../components/Login/Forms/LoginInputComponent';
import { useAuth } from '../contexts/AuthContext';
import AlertErrorModal from '../components/Shared/Modals/AlertErrorModal';
import AlertSuccessModal from '../components/Shared/Modals/AlertSuccessModal';

interface ResetPasswordUpdateScreenProps {
  navigation: any;
}

const ResetPasswordUpdateScreen: React.FC<ResetPasswordUpdateScreenProps> = ({ navigation }) => {
  const { resetPasswordUpdate, errorMessage, setErrorMessage } = useAuth();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [inputEmpty, setInputEmpty] = useState('');
  const [success, setSuccess] = useState(false);

  const handleUpdatePassword = async () => {
    if (password === '' || passwordConfirmation === '') {
      setInputEmpty('Preencha o campo para continuar.');
      return;
    }

    if (password !== passwordConfirmation) {
      setInputEmpty('Senhas não identicas!');
      return;
    }

    const response = await resetPasswordUpdate(password);

    if(response === true) {
      setSuccess(true);
      navigation.navigate('Login');
    }

    if(response === false) {
      navigation.navigate('Login');
    }
  };

  return (
    
    <View style={styles.resetPasswordUpdateContainer}>
      <AlertErrorModal visible={!!errorMessage} onClose={() => setErrorMessage('')} title="Algo deu errado!" message={errorMessage} />
      <AlertErrorModal visible={!!inputEmpty} onClose={() => setInputEmpty('')}  message={inputEmpty} />
      <AlertSuccessModal visible={success} onClose={() => setSuccess(false)}  message='Senha alterada!' />
        
      <Image
        style={styles.logoIcon}
        contentFit="cover"
        source={require("../../assets/logotipo.png")}
      />
      <Text style={styles.parkguardText}>ParkGuard</Text>

      <View style={styles.textContainer}>
        <Text style={styles.textHeading}>Alterar a senha</Text>
        <Text style={[styles.textHeading, styles.text]}>Crie uma senha nova e forte que você nunca usou antes</Text>
      </View>

      <View style={styles.inputContainer}>
        <LoginInputComponent 
          label="Criar senha" 
          placeholder="Insira a nova senha" 
          isPassword={true} 
          onValueChange={setPassword} 
        />            
        <LoginInputComponent 
          label="Confirmar senha" 
          placeholder="Confirme sua senha" 
          isPassword={true} 
          onValueChange={setPasswordConfirmation} 
        />            
      </View>

      <ButtonComponent label="ALTERAR" onPress={handleUpdatePassword} />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backButtonLabel}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
resetPasswordUpdateContainer: {
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
    top: 460,
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

export default ResetPasswordUpdateScreen;
