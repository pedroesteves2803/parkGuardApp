// RegisterVehicleHeader.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

interface RegisterVehicleHeaderProps {
  title?: string;
  subtitle?: string;
  onPress: () => void;
}

const RegisterVehicleHeaderComponent: React.FC<RegisterVehicleHeaderProps> = ({ title, subtitle, onPress }) => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onPress}>
          <Image source={require("../../../../assets/back.png")} style={styles.backButton} />
        </Pressable>
        <Image source={require("../../../../assets/logotipo.png")} style={styles.logo} />
      </View>
      <Text style={styles.greeting}>{title}</Text>
      {subtitle && subtitle.length > 0 && (
        <Text style={styles.info}>{subtitle}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 60,
    paddingHorizontal: 40,
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
  backButton: {
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

export default RegisterVehicleHeaderComponent;
