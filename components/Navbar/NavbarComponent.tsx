import React from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonComponent from './ButtonComponent';

const NavBarComponent: React.FC = () => {
  return (
    <View style={styles.navBar}>
        <ButtonComponent image={require('../../assets/cart.png')} label="Registrar Veículo"/>
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
