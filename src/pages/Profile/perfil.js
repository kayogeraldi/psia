import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import { AuthContext } from '../../contexts/auth';

export default function Profile() {
  const { signOut, user } = useContext(AuthContext);
  
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: user.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) }} 
          style={styles.avatar} 
        />
        <Text style={styles.userName}>{user.name}</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Feather name="mail" size={20} color="#333" />
          <Text style={styles.infoText}>{user.email}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Feather name="phone" size={20} color="#333" />
          <Text style={styles.infoText}>{user.phone}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Feather name="user" size={20} color="#333" />
          <Text style={styles.infoText}>Psicólogo: {user.psicologo}</Text>
        </View>
      </View>
      
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