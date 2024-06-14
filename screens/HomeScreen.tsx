import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import HeaderComponent from '../components/HeaderComponent';
import NavBarComponent from '../components/Navbar/NavbarComponent';

const HomeScreen: React.FC = () => {
  const { signOut, authData } = useAuth();

  const parkedVehicles = [
    { plate: 'FGK-4592', date: '10-06-2024', status: 'ESTACIONADO' },
  ];

  return (
    <View style={styles.container}>
        <HeaderComponent name={ authData?.name } />

        <View style={styles.body}>
          <NavBarComponent/>

          <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Status de veículos estacionados</Text>
              <Text style={styles.subtitleText}>Acompanhe em tempo real os veículos estacionados, liberados e com pendência de pagamento</Text>
          </View>          

          
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    flex: 1,
  },
  body: {
    padding: 25
  },
  titleText: {
    fontWeight: 'bold',
    color: '#C6C6C6',
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    fontStyle: 'normal',
    lineHeight: 23.34,
  },
  subtitleText: {
    fontWeight: 400,
    color: '#C6C6C6',
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    fontStyle: 'normal',
    lineHeight: 17.16,
    letterSpacing: 0.17,
  },
  titleContainer: {
    display: 'flex',
    width: 341,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    top: 25
  },
});



export default HomeScreen;