import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import ButtonImageComponent from '../../Shared/Forms/ButtonImageComponent';
import { AppStackParamList } from '../../../navigation/MainStack';

type NavBarComponentProps = {
  navigation: StackNavigationProp<AppStackParamList>;
};

const HomeNavbarComponent: React.FC<NavBarComponentProps> = ({ navigation }) => {
  return (
    <View style={styles.navBar}>
        <ButtonImageComponent 
          image={require("../../../../assets/cart.png")} 
          label="Registrar Veículo"
          onPress={() => navigation.navigate('RegisterVehicle')}
        />
        {/* <ButtonImageComponent 
          image={require("../../../../assets/file.png")} 
          label="Relatório Mensal"
        /> */}
        <ButtonImageComponent 
          image={require("../../../../assets/user-add.png")} 
          label="Lista de Funcionários"
          onPress={() => navigation.navigate('ListEmployees')}
        />
    </View>
  );
};

const styles = StyleSheet.create({
      navBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 10,
      },
});

export default HomeNavbarComponent;
