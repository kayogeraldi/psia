import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeContentPsi({ navigation }){
  return(
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.profileIcon} 
        onPress={() => navigation.navigate('Profile')}
      >
        <Icon name="person-circle" size={40} color="#7673FF" />
      </TouchableOpacity>

      <Text style={styles.title}>Bem-vindo, Psicólogo!</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('PsicologoDashboard')}
      >
        <Text style={styles.buttonText}>Ver Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  profileIcon: {
    position: 'absolute',
    top: 50,
    right: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30
  },
  button: {
    backgroundColor: '#7673FF',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  }
}); 