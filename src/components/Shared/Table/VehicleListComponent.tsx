import React from 'react';
import { StyleSheet, FlatList, ViewStyle, Text, TouchableOpacity } from 'react-native';
import ItemComponent from './ItemComponent';

interface Vehicle {
  id: number;
  licensePlate: string;
  entryTimes: string;
  departureTimes: string | null;
}

interface VehicleListProps {
  vehicles: Vehicle[];
  navigation: any;
}

const VehicleListComponent: React.FC<VehicleListProps> = ({ vehicles, navigation }) => {

  const handleGetVehicleById = (id: number) => {
    navigation.navigate('UpdateVehicle');
  };

  const renderItem = ({ item }: { item: Vehicle }) => (
    <TouchableOpacity onPress={() => handleGetVehicleById(item.id)}>
      <ItemComponent
        key={item.id}
        plate={item.licensePlate}
        date={item.entryTimes}
        status={item.departureTimes == null ? "ESTACIONADO" : "LIBERADO"}
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={vehicles}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.flatListContentContainer}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
    />
  );
};

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingBottom: 550,
  } as ViewStyle,
});

export default VehicleListComponent;
