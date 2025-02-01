import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import AuthService from '../../api/services/authServices';
import { AuthContext } from '../../contexts/AuthContext';

export default function Profile() {
  const { setIsAuthenticated, setUser, user } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      // Chama o método de logout do AuthService
      await AuthService.logout();
      
      // Atualiza o contexto para refletir que o usuário não está autenticado
      setIsAuthenticated(false);
      setUser(null);
      
    } catch (error) {
      Alert.alert('Erro', `Não foi possível fazer logout ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: `https://ui-avatars.com/api/?name=${user?.nome || 'Usuário'}` }} 
          style={styles.avatar} 
        />
        <Text style={styles.userName}>{user?.nome || 'Usuário'}</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Feather name="mail" size={20} color="#333" />
          <Text style={styles.infoText}>{user?.email || 'Email não disponível'}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Feather name="phone" size={20} color="#333" />
          <Text style={styles.infoText}>{user?.telefone || 'Telefone não disponível'}</Text>
        </View>
        
        {user?.role === 'PSICOLOGO' ? (
          <View style={styles.infoRow}>
            <Feather name="award" size={20} color="#333" />
            <Text style={styles.infoText}>CRM: {user?.psicologo?.crm || 'Não informado'}</Text>
          </View>
        ) : (
          <View style={styles.infoRow}>
            <Feather name="user" size={20} color="#333" />
            <Text style={styles.infoText}>Psicólogo: {user?.paciente.psicologo.usuario.nome || 'Não atribuído'}</Text>
          </View>
        )}
      </View>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogout}
      >
        <Feather name="log-out" size={22} color="#FFF" />
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  infoContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#c62c36',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: 8,
    fontWeight: 'bold',
  }
});
