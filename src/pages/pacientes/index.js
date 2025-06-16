import React from 'react';
import RegistrosContent from '../../components/RegistrosContent/RegistrosContent';
import PacientesContent from '../../components/PacientesContent/PacientesContent';

export default function Pacientes({ navigation, user }) {
  return (
    user?.role === 'PSICOLOGO' 
      ? <RegistrosContent navigation={navigation} /> 
      : <PacientesContent navigation={navigation} />
  );
} 