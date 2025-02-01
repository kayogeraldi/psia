// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  if (global.HermesInternal) {
    console.log("✅ Hermes está ativado!");
  } else {
    console.log("❌ Hermes NÃO está ativado!");
  }
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}
