import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import RegisterVehicleScreen from '../screens/Vehicle/RegisterVehicleScreen';
import UpdateVehicleScreen from '../screens/Vehicle/UpdateVehicleScreen';
import RegisterPaymentScreen from '../screens/Payment/RegisterPaymentScreen';
import ReleasePaymentScreen from '../screens/Payment/ReleasePaymentScreen';
import { PaymentData } from '../services/paymentService';
import ListEmployeesScreen from '../screens/Employee/ListEmployeesScreen';

export type AppStackParamList = {
  Home: undefined;
  RegisterVehicle: undefined;
  UpdateVehicle: { id: number };
  RegisterPayment: { id: number, licensePlate: string};
  ReleasePayment: { paymentData: PaymentData, licensePlate: string };
  ListEmployees: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="RegisterVehicle" component={RegisterVehicleScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="UpdateVehicle" component={UpdateVehicleScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="RegisterPayment" component={RegisterPaymentScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ReleasePayment" component={ReleasePaymentScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ListEmployees" component={ListEmployeesScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default MainStack;
