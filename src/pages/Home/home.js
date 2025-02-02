import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeContent from './HomeContent';
import HomeContentPsi from './homeContentPsi';

export default function Home({ user }){
  const navigation = useNavigation();

  console.log('Role do usuário atual (Home):', user?.role);

  return (
    user?.role === 'PSICOLOGO' 
      ? <HomeContentPsi navigation={navigation} /> 
      : <HomeContent navigation={navigation} />
  );
}
//7673FF

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