import React from 'react';
import RegistrosContent from '../../components/RegistrosContent/RegistrosContent';
import PacientesContent from '../../components/PacientesContent/PacientesContent';
import { useNavigation } from '@react-navigation/native';

export default function Registros({ user }) {
  const navigation = useNavigation();
  
  console.log('Role do usuário atual:', user?.role);
  
  return (
    user?.role === 'PSICOLOGO' 
      ? <PacientesContent navigation={navigation} user={user} /> 
      : <RegistrosContent navigation={navigation} user={user} />
  );
}
//7673FF