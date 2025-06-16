// src/routes/index.js
import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

function Routes() {
  const { isAuthenticated } = useContext(AuthContext);

  // Enquanto o checkAuth não terminar, isAuthenticated será null
  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#7673FF" />
      </View>
    );
  }

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
