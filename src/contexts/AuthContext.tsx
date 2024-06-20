import React, { useEffect } from 'react';
import { createContext, useState, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/authService';

export interface AuthData {
  token: string;
  email: string;
  name: string;
  tipo: number;
}

interface AuthContextData {
  authData?: AuthData;
  signIn: (email: string, password: string) => Promise<AuthData | undefined>;
  signOut: () => void;
  loading: boolean;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuth] = useState<AuthData | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadFromStorage();
  }, []) 

  async function loadFromStorage(){
    const auth = await AsyncStorage.getItem("@AuthData")

    if(auth) {
      setAuth(JSON.parse(auth) as AuthData);
    }

    setLoading(false)
  }

  async function signIn(email: string, password: string) {
    try {
      const auth = await authService.signIn(email, password);
      setAuth(auth);
      AsyncStorage.setItem('@AuthData', JSON.stringify(auth));
      return auth;
    } catch (error) {
      setErrorMessage('Verifique os campos e tente novamente.');
    }
  }

  function signOut(): void {
    setAuth(undefined);
    AsyncStorage.removeItem('@AuthData');
  }

  return (
    <AuthContext.Provider value={{ loading, authData, signIn, signOut, errorMessage, setErrorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
