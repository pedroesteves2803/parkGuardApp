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
export interface tokenReset {
  token: string;
  email: string;
  expirationTime: string;
}

interface AuthContextData {
  authData?: AuthData;
  signIn: (email: string, password: string) => Promise<AuthData | undefined>;
  signOut: () => Promise<void>;
  resetPassword: (mail: string) => Promise<boolean>;
  verifyTokenResetPassword: (code: string) => Promise<tokenReset | boolean>;
  resetPasswordUpdate: (password: string) => Promise<boolean>;
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
      setErrorMessage('Verifique os campos e tente novamente!');
    }
  }

  async function signOut(): Promise<void> {
    try {
      await authService.signOut(authData?.token || '');
      setAuth(undefined);
      AsyncStorage.removeItem('@AuthData');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Ocorreu um erro desconhecido.');
      }
    }
  }

  async function resetPassword(email: string) {
    try {
      await authService.resetPassword(email);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Ocorreu um erro desconhecido.');
      }
      return false;
    }
  }

  async function verifyTokenResetPassword(code: string) {
    try {
      const response = await authService.verifyTokenResetPassword(code);
      AsyncStorage.setItem('codeReset', code);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Ocorreu um erro desconhecido.');
      }
      return false;
    }
  }

  async function resetPasswordUpdate(password: string)  {
    try {
      let storedCode = await AsyncStorage.getItem('codeReset');

      if (storedCode === null) {
        throw new Error('Código de redefinição não encontrado');
      }

      const response = await authService.resetPasswordUpdate(storedCode, password);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Ocorreu um erro desconhecido.');
      }
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{ loading, authData, signIn, signOut, resetPassword, verifyTokenResetPassword, resetPasswordUpdate,  errorMessage, setErrorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
