import React from 'react';
import { useFonts } from 'expo-font';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';

const App: React.FC = () => {
  const [fontsLoaded, error] = useFonts({
    "Jura-Medium": require("./assets/fonts/Jura-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Flex": require("./assets/fonts/Roboto-Flex.ttf"),
    "Inter-Regular": require("./assets/fonts/inter/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/inter/Inter-Medium.ttf"),
  });

  if (!fontsLoaded || error) {
    return null;
  }

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

export default App;
