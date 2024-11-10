import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../pages/Home';
import Registros from '../pages/Registros';
import Settings from '../pages/Ajustes';

const Tab = createBottomTabNavigator();

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
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen 
        name="Ajustes" 
        component={Settings}
        options={{
          tabBarLabel: 'Ajustes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default AppRoutes;
