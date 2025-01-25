import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import { AuthContext } from '../../contexts/auth';

export default function Profile() {
  const { signOut, user } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>Tela de Perfil</Text> 
      <Text> Nome: {user.name}</Text>
      <Text> Email: {user.email}</Text>
      <Text> Telefone: {user.phone}</Text>
      <Text> Psicólogo: {user.psicologo}</Text>
      <TouchableOpacity style={styles.button} onPress={() => signOut()}>
        <Feather name="log-out" size={22} color="#FFF" />
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#c62c36',
    width: '90%',
    height: 45,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: 8,
    fontWeight: 'bold',
  }
}); 