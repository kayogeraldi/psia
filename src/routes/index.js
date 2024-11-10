import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { AuthContext } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
function Routes(){
  const { signed } = useContext(AuthContext);
  const loading = false;
  

  return(
    signed ? <AppRoutes/> : <AuthRoutes/>
  )
}

export default Routes;