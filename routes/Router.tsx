import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "../stacks/HomeStack";
import AuthStack from "../stacks/AuthStack";
import { useContext } from "react";
import { AuthContext, useAuth } from "../contexts/AuthContext";

export function Router() {
    const { authData, loading } = useAuth();

    return (
      <NavigationContainer>
        {authData ? <HomeStack /> : <AuthStack />}
      </NavigationContainer>
    );
}