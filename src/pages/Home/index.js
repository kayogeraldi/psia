import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home(){
  const navigation = useNavigation();

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Quiz!</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Quiz', { screen: 'Pergunta1' })}
      >
        <Text style={styles.buttonText}>Começar Quiz</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30
  },
  button: {
    backgroundColor: '#3b3dbf',
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