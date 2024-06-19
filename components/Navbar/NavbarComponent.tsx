import React from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonComponent from './ButtonComponent';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../../stacks/AppStack';

type NavBarComponentProps = {
  navigation: StackNavigationProp<AppStackParamList>;
};

const NavBarComponent: React.FC<NavBarComponentProps> = ({ navigation }) => {
  return (
    <View style={styles.navBar}>
        <ButtonComponent 
          image={require('../../assets/cart.png')} label="Registrar Veículo"
          onPress={() => navigation.navigate('RegisterVehicle')}
        />
        <ButtonComponent image={require('../../assets/file.png')} label="Relatório Mensal"/>
        <ButtonComponent image={require('../../assets/user-add.png')} label="Cadastrar Funcionário"/>
    </View>
  );
};

const styles = StyleSheet.create({
      navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
      },
});

export default NavBarComponent;
