import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useFetchVehicles from '../hooks/useFetchVehicles';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../navigation/MainStack';
import { useAuth } from '../contexts/AuthContext';
import { ErrorComponent, LoadingComponent } from '../components/Shared/Loading/LoadingErrorComponents';
import TableComponent from '../components/Shared/Table/TableComponent';
import TableItem from '../components/Shared/Table/TableItem';
import HomeHeaderComponent from '../components/Home/Headers/HomeHeaderComponent';
import HomeNavbarComponent from '../components/Home/Navbars/HomeNavbarComponent';
import VehicleStatusSegmentedControl from '../components/Home/Controls/VehicleStatusSegmentedControl';
import AlertErrorModal from '../components/Shared/Modals/AlertErrorModal';
const HomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();
  const { signOut, authData } = useAuth();
  const { vehicles, loading, error, refetch } = useFetchVehicles(authData?.token || '');
  const [currentSegment, setCurrentSegment] = useState<'Atuais' | 'Histórico'>('Atuais');
  const [refreshKey, setRefreshKey] = useState<number>(0);

  useEffect(() => {
    refetch();
  }, [refreshKey]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRefreshKey(prevKey => prevKey + 1);
    });

    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return <LoadingComponent />;
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
      <HomeHeaderComponent name={authData?.name} onPress={signOut} />

      <View style={styles.body}>
        <HomeNavbarComponent navigation={navigation}/>

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Status de veículos estacionados</Text>
          <Text style={styles.subtitleText}>Acompanhe em tempo real os veículos estacionados, liberados e com pendência de pagamento</Text>
        </View>

        <VehicleStatusSegmentedControl initialSegment={currentSegment} onSegmentChange={handleSegmentChange} />

        {!error  && (
          <TableComponent tableData={tableData} />
        )}
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
