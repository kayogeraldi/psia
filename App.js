import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes/index';
import AuthProvider from './src/contexts/auth';
import { QuizProvider } from './src/contexts/QuizContext';

export default function App(){
  return(
    <NavigationContainer>
      <AuthProvider>
        <QuizProvider>
          <StatusBar backgroundColor="#F0F4FF" barStyle="dark-content" />
          <Routes/>
        </QuizProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}