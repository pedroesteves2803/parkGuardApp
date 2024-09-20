import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import VerifyTokenPasswordResetScreen from '../screens/VerifyTokenPasswordResetScreen';
import ResetPasswordUpdateScreen from '../screens/ResetPasswordUpdateScreen';

export type AuthStackParamList = {
  Login: undefined;
  ResetPassword: undefined;
  VerifyTokenPassword: undefined;
  ResetPasswordUpdate: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="VerifyTokenPassword" component={VerifyTokenPasswordResetScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ResetPasswordUpdate" component={ResetPasswordUpdateScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default AuthStack;
