import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import HeaderComponent from '../components/Header/HeaderComponent';
import TableItem from '../components/Table/TableItem';
import TableComponent from '../components/Table/TableComponent';
import useFetchVehicles from '../hooks/useFetchVehicles';
import { LoadingComponent, ErrorComponent } from '../components/LoadingErrorComponents';
import NavBarComponent from '../components/Navbar/NavbarComponent';
import { AppStackParamList } from '../stacks/AppStack';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import ListVehicleStatusSegmentedControl from '../components/Control/ListVehicleStatusSegmentedControl';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();
  const { signOut, authData } = useAuth();
  const { vehicles, loading, error } = useFetchVehicles(authData?.token || '');
  const [currentSegment, setCurrentSegment] = useState<'Atuais' | 'Histórico'>('Atuais');

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent message={error} />;
  }

  const handleSegmentChange = (segment: 'Atuais' | 'Histórico') => {
    setCurrentSegment(segment);
  };

  const filteredVehicles = currentSegment === 'Atuais'
    ? vehicles.filter(vehicle => vehicle.departureTimes === null)
    : vehicles;

  const tableData = filteredVehicles.map(vehicle => ([
    <TableItem
      key={vehicle.id}
      plate={vehicle.licensePlate}
      date={vehicle.entryTimes}
      status={vehicle.departureTimes == null ? "ESTACIONADO" : "LIBERADO"}
    />
  ]));

  return (
    <View style={styles.container}>
      <HeaderComponent name={authData?.name} onPress={signOut} />

      <View style={styles.body}>
        <NavBarComponent navigation={navigation}/>

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Status de veículos estacionados</Text>
          <Text style={styles.subtitleText}>Acompanhe em tempo real os veículos estacionados, liberados e com pendência de pagamento</Text>
        </View>

        <ListVehicleStatusSegmentedControl initialSegment={currentSegment} onSegmentChange={handleSegmentChange} />

        <TableComponent tableData={tableData} />
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
    fontWeight: '400',
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
  }
});

export default HomeScreen;
