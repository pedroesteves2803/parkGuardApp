import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import { useAuth } from '../contexts/AuthContext';

const HomeScreen: React.FC = () => {
  const { signOut, authData } = useAuth();
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text>{ authData?.name }</Text>

      <ButtonComponent label="SAIR" onPress={() => signOut()} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
