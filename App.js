import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes/index';
import { QuizProvider } from './src/contexts/QuizContext';

export default function App(){
  return(
    <NavigationContainer>
      <QuizProvider>
        <StatusBar backgroundColor="#F0F4FF" barStyle="dark-content" />
        <Routes/>
      </QuizProvider>
    </NavigationContainer>
  )
}