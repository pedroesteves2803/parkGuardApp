import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

type AuthStackParamList = {
  Login: undefined;
  ResetPassword: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}

export default AuthStack;
