import React from 'react';
import { useFonts } from 'expo-font';
import { AuthProvider } from './contexts/AuthContext';
import { Router } from './routes/Router';

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
      <Router />
    </AuthProvider>
  );
}

export default App;
