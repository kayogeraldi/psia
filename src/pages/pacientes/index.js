import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export default function Pacientes({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [pacientes, setPacientes] = useState([
    // Exemplo de lista de pacientes - você deve substituir por sua lógica de dados real
    { id: '1', nome: 'João Silva' },
    { id: '2', nome: 'Maria Souza' },
    { id: '3', nome: 'Pedro Santos' },
  ]);

  const filteredPacientes = pacientes.filter(paciente => 
    paciente.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderPaciente = ({ item }) => (
    <TouchableOpacity style={styles.pacienteItem}>
      <Text style={styles.pacienteNome}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar pacientes"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      <FlatList
        data={filteredPacientes}
        renderItem={renderPaciente}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>Nenhum paciente encontrado</Text>
        }
      />

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('AdicionarPaciente')}
      >
        <Feather name="plus" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  pacienteItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  pacienteNome: {
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#c62c36',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  }
}); 