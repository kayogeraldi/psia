import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Settings from '../pages/Ajustes';
import Profile from '../pages/Profile';
import Notifications from '../pages/Notificações';
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
    </SettingsStack.Navigator>
  );
}

export default SettingsRoutes; 