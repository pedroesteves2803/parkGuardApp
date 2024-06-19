import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "../stacks/AuthStack";
import { useAuth } from "../contexts/AuthContext";
import React from "react";
import AppStack from "../stacks/AppStack";

export function Router() {
    const { authData } = useAuth();

    return (
      <NavigationContainer>
        {authData ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    );
}