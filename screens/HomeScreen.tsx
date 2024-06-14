import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import HeaderComponent from '../components/HeaderComponent';
import NavBarComponent from '../components/Navbar/NavbarComponent';
import TableComponent from '../components/TableComponent';
import TableItem from '../components/Table/TableItem';

const HomeScreen: React.FC = () => {
  const { signOut, authData } = useAuth();

  const tableData = [
    [
      <TableItem plate="EPW-6768" date="10-06-2024" status='ESTACIONADO'/>
    ],
    [
      <TableItem plate="GGT-5395" date="10-06-2024" status='LIBERADO'/>
    ],
    [
      <TableItem plate="CXY-0220" date="10-06-2024" status='PENDENTE'/>
    ],
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

          <TableComponent 
            tableData={tableData}
          />

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
    marginTop: 16,
    marginBottom: 16,
  },
  status: { 
    display: 'flex',
    width: 71,
    height: 22,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: 4,
  },  
  statusText: { 
    fontFamily: 'Roboto-Medium',
    fontSize: 8,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 26,
    letterSpacing: 0.46,
    textTransform: 'uppercase',
    color: "#FFF"
  },  
  statusParked: { 
    backgroundColor: 'rgba(33, 150, 243, 1)',
  },
  statusReleased: { 
    backgroundColor: 'rgba(46, 125, 50, 1)',
  },
  statusPending: { 
    backgroundColor: 'rgba(211, 47, 47, 1)',
  },
  item: {
    padding: 16,
    color: "#FFF"
  }

});



export default HomeScreen;