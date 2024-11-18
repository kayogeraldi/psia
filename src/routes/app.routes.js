import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import Home from '../pages/Home';
import Registros from '../pages/Registros';
import SettingsRoutes from './settings.routes';
import Pergunta1 from '../pages/RPD/Pergunta1';
import Pergunta2 from '../pages/RPD/Pergunta2';
import Pergunta3 from '../pages/RPD/Pergunta3';
import Pergunta4 from '../pages/RPD/Pergunta4';
import Pergunta5 from '../pages/RPD/Pergunta5';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Função para criar o stack de perguntas (sem tab)
function QuizStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Pergunta1" 
        component={Pergunta1}
        options={{
          headerShown: false,
          title: 'Pergunta 1'
        }}
      />
      <Stack.Screen 
        name="Pergunta2" 
        component={Pergunta2}
        options={{
          headerShown: false,
          title: 'Pergunta 2'
        }}
      />
      <Stack.Screen 
        name="Pergunta3" 
        component={Pergunta3}
        options={{
          headerShown: false,
          title: 'Pergunta 3'
        }}
      />
      <Stack.Screen 
        name="Pergunta4" 
        component={Pergunta4}
        options={{
          headerShown: false,
          title: 'Pergunta 4'
        }}
      />
      <Stack.Screen 
        name="Pergunta5" 
        component={Pergunta5}
        options={{
          headerShown: false,
          title: 'Pergunta 5'
        }}
      />
    </Stack.Navigator>
  );
}

function AppRoutes(){
  return(
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          height: 70,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          elevation: 0,
          shadowColor: 'transparent',
        },
        tabBarItemStyle: {
          margin: 6,
          borderRadius: 24,
          height: 50,
        },
        tabBarActiveTintColor: '#FFF',
        tabBarInactiveTintColor: '#FFF',
        tabBarActiveBackgroundColor: '#4B0082',
        tabBarInactiveBackgroundColor: '#8B008B',
      }}
    >
      <Tab.Screen 
        name="Registros" 
        component={Registros}
        options={{
          tabBarLabel: 'Registros',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen 
        name="Ajustes" 
        component={SettingsRoutes}
        options={{
          headerShown: false,
          tabBarLabel: 'Ajustes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen 
        name="Quiz"
        component={QuizStack}
        options={{
          headerShown: false,
          tabBarButton: () => null, 
          tabBarStyle: { display: 'none' }  
        }}
      />
    </Tab.Navigator>
  )
}

export default AppRoutes;
