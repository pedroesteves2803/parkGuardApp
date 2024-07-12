import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import RegisterVehicleScreen from '../screens/Vehicle/RegisterVehicleScreen';
import UpdateVehicleScreen from '../screens/Vehicle/VehicleUpdateScreen';

export type AppStackParamList = {
  Home: undefined;
  RegisterVehicle: undefined;
  UpdateVehicle: { id: number };
};

const Stack = createStackNavigator<AppStackParamList>();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="RegisterVehicle" component={RegisterVehicleScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="UpdateVehicle" component={UpdateVehicleScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default MainStack;
