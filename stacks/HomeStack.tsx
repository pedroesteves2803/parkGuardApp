import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

type HomeStackParamList = {
  Home: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
