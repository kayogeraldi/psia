import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import RegistroDetailModal from '../../components/RegistroDetailModal';

export default function Registros(){
  const [registros, setRegistros] = useState([]);
  const [selectedRegistro, setSelectedRegistro] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const carregarRegistros = async () => {
    try {
      const dados = await AsyncStorage.getItem('quizRegistros');
      if (dados) {
        setRegistros(JSON.parse(dados));
      }
    } catch (error) {
      console.error('Erro ao carregar registros:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarRegistros();
    }, [])
  );

  const handleRegistroPress = (registro) => {
    setSelectedRegistro(registro);
    setModalVisible(true);
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const handleDelete = async (registroId) => {
    try {
      const dados = await AsyncStorage.getItem('quizRegistros');
      if (dados) {
        const registrosAtuais = JSON.parse(dados);
        const novosRegistros = registrosAtuais.filter(reg => reg.id !== registroId);
        
        await AsyncStorage.setItem('quizRegistros', JSON.stringify(novosRegistros));
        setRegistros(novosRegistros);
      }

    } catch (error) {
      console.error('Erro ao excluir registro:', error);
      Alert.alert('Erro', 'Não foi possível excluir o registro.');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.registroCard}
      onPress={() => handleRegistroPress(item)}
    >
      <View style={styles.registroCardContent}>
        <Text style={styles.tituloText} numberOfLines={2}>
          {item.titulo}
        </Text>
        <Text style={styles.dataText}>{formatarData(item.data)}</Text>
      </View>
    </TouchableOpacity>
  );

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Meus Registros</Text>
      <FlatList
        data={registros.sort((a, b) => new Date(b.data) - new Date(a.data))}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <RegistroDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        registro={selectedRegistro}
        onDelete={handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  listContainer: {
    paddingBottom: 20
  },
  registroCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  registroCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dataText: {
    fontSize: 14,
    color: '#3b3dbf',
    textAlign: 'right'
  },
  tituloText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10
  }
});