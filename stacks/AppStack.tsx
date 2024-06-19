import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import RegisterVehicleScreen from '../screens/RegisterVehicleScreen';

export type AppStackParamList = {
  Home: undefined;
  RegisterVehicle: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

const AppStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="RegisterVehicle" component={RegisterVehicleScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default AppStack;
