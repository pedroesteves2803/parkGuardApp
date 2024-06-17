// GradientContent.js
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../contexts/AuthContext';

const HeaderComponent: React.FC<{ name?: string, onPress: any }> = ({ name, onPress }) => {

  return (
    <LinearGradient
      colors={['#0393AE', '#013D48']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image source={require("../assets/logotipo.png")} style={styles.logo} />
        <Pressable onPress={onPress}>
          <Image source={require("../assets/logout.png")} style={styles.exitButton} />
        </Pressable>
      </View>
      <Text style={styles.greeting}>Olá, {name}!</Text>
      <Text style={styles.info}>Seu estacionamento em ordem! Gerencie e monitore suas vagas com praticidade.</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    alignSelf: 'stretch',
    height: 223,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
  },
  exitButton: {
    width: 24,
    height: 24,
  },
  greeting: {
    fontSize: 20,

    color: 'rgba(255, 255, 255, 0.87)',
    marginTop: 20,
    fontFamily: 'Inter-Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 23.34,
    letterSpacing: -1.5,
  },
  info: {
    marginTop: 20,

    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.60)',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.17,
  },
});

export default HeaderComponent;
