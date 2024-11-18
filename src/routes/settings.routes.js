import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Settings from '../pages/Ajustes';
import Profile from '../pages/Profile';
import Notifications from '../pages/Notificações';
import Pergunta1 from '../pages/RPD/Pergunta1';
import Pergunta2 from '../pages/RPD/Pergunta2';
import Pergunta3 from '../pages/RPD/Pergunta3';
import Pergunta4 from '../pages/RPD/Pergunta4';
import Pergunta5 from '../pages/RPD/Pergunta5';
import Pergunta6 from '../pages/RPD/Pergunta6';

const SettingsStack = createNativeStackNavigator();

function SettingsRoutes() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen 
        name="SettingsMain"
        component={Settings}
        options={{
          title: 'Ajustes'
        }}
      />
      <SettingsStack.Screen 
        name="Profile"
        component={Profile}
        options={{
          title: 'Perfil'
        }}
      />
      <SettingsStack.Screen 
        name="Notifications"
        component={Notifications}
        options={{
          title: 'Notificações'
        }}
      />
      <SettingsStack.Screen 
        name="Pergunta1"
        component={Pergunta1}
        options={{
          title: 'Pergunta 1'
        }}
      />
      <SettingsStack.Screen 
        name="Pergunta2"
        component={Pergunta2}
        options={{
          title: 'Pergunta 2'
        }}
      />
      <SettingsStack.Screen 
        name="Pergunta3"
        component={Pergunta3}
        options={{
          title: 'Pergunta 3'
        }}
      />  
      <SettingsStack.Screen 
        name="Pergunta4"
        component={Pergunta4}
        options={{
          title: 'Pergunta 4'
        }}
      />
      <SettingsStack.Screen 
        name="Pergunta5"
        component={Pergunta5}
        options={{
          title: 'Pergunta 5'
        }}
      />
      <SettingsStack.Screen 
        name="Pergunta6"
        component={Pergunta6}
        options={{
          title: 'Pergunta 6'
        }}
      />


    </SettingsStack.Navigator>
  );
}

export default SettingsRoutes; 