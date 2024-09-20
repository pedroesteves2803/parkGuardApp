import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import React from "react";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

export function AppNavigator() {
    const { authData } = useAuth();

    return (
      <NavigationContainer>
        {authData ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    );
}