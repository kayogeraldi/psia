import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

import Home from '../pages/Home/home';
import Registros from '../pages/Registros/registros';
import SettingsRoutes from './settings.routes';
import Pergunta1 from '../pages/RPD/Pergunta1/rpd1';
import Pergunta2 from '../pages/RPD/Pergunta2/rdp2';
import Pergunta3 from '../pages/RPD/Pergunta3/rpd3';
import Pergunta4 from '../pages/RPD/Pergunta4/rpd4';
import Pergunta5 from '../pages/RPD/Pergunta5/rpd5';
import Pergunta6 from '../pages/RPD/Pergunta6/rpd6';
import Finalizacao from '../pages/RPD/finalizacao/finalizacao';
import { QuizProvider } from '../contexts/QuizContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
      <Stack.Screen 
        name="Pergunta6" 
        component={Pergunta6}
        options={{
          headerShown: false,
          title: 'Pergunta 6'
        }}
      />
      <Stack.Screen 
        name="Finalizacao" 
        component={Finalizacao}
        options={{
          headerShown: false,
          title: 'Finalização'
        }}
      />
    </Stack.Navigator>
  );
}

function CustomTabBarIcon({ name, color, size, label }) {
  return (
    <View style={styles.tabBarItemContainer}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Ionicons name={name} size={size} color="#FFF" />
      </View>
      <Text style={styles.tabBarLabel}>{label}</Text>
    </View>
  );
}

function AppRoutes(){
  return(
    <QuizProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          tabBarStyle: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            height: 90,
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
            height: 70,
          },
          tabBarActiveTintColor: '#4B0082',
          tabBarInactiveTintColor: '#7673FF',
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen 
          name="Registros" 
          component={Registros}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <CustomTabBarIcon 
                name="document-text-outline" 
                color={color} 
                size={size} 
                label="Registros"
              />
            ),
          }}
        />
        
        <Tab.Screen 
          name="Home" 
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <CustomTabBarIcon 
                name="home-outline" 
                color={color} 
                size={size} 
                label="Início"
              />
            ),
          }}
        />

        <Tab.Screen 
          name="Ajustes" 
          component={SettingsRoutes}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <CustomTabBarIcon 
                name="settings-outline" 
                color={color} 
                size={size} 
                label="Ajustes"
              />
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
    </QuizProvider>
  )
}

const styles = StyleSheet.create({
  tabBarItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  tabBarLabel: {
    color: '#4B0082',
    fontSize: 12,
  }
});

export default AppRoutes;
