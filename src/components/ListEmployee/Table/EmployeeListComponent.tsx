import React from 'react';
import { StyleSheet, FlatList, ViewStyle, TouchableOpacity } from 'react-native';
import ItemComponent from './ItemComponent';

interface Employee {
  id: number;
  name: string;
  email: string;
  type: number;
}

interface EmployeeListProps {
  employees: Employee[];
  navigation: any;
}

const EmployeeListComponent: React.FC<EmployeeListProps> = ({ employees, navigation }) => {

  const handleGetEmployeeById = (id: number) => {
    console.log(id)
  };

  const renderItem = ({ item }: { item: Employee }) => (
    <TouchableOpacity onPress={() => handleGetEmployeeById(item.id)}>
      <ItemComponent
        key={item.id}
        name={item.name}
        email={item.email}
        type={item.type == 1 ? "ADMINISTRADOR" : "NORMAL"}
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={employees}
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

export default EmployeeListComponent;
