import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import RegistroDetailModal from '../../components/RegistroDetailModal'; // Ajuste o caminho conforme necessário

export default function Pacientes({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const [pacientes, setPacientes] = useState([
    { 
      id: '1', 
      nome: 'João Silva',
      ultimaAtualizacao: '2023-12-10T10:30:00Z',
      temNotificacao: true,
      registros: [
        {
          id: 'r1',
          data: new Date().toISOString(),
          situacao: 'Exemplo de situação para João',
          sentimentos: [
            { sentimento: 'Ansiedade', intensidade: 7 }
          ],
          pensamentosAutomaticos: 'Pensamentos automáticos de exemplo',
          pensamentosAdaptativos: 'Pensamentos adaptativos de exemplo',
          reavaliacao: {
            texto: 'Reavaliação de exemplo',
            reavaliacoes: [5]
          }
        }
      ]
    },
    { 
      id: '2', 
      nome: 'Maria Souza',
      registros: []
    },
    { 
      id: '3', 
      nome: 'Pedro Santos',
      registros: []
    },
  ]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const filteredPacientes = pacientes.filter(paciente => 
    paciente.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePacientePress = (paciente) => {
    // Remove a notificação quando o paciente é clicado
    const updatedPacientes = pacientes.map(p => 
      p.id === paciente.id ? { ...p, temNotificacao: false } : p
    );
    setPacientes(updatedPacientes);

    if (paciente.registros && paciente.registros.length > 0) {
      setSelectedPaciente(paciente.registros[0]);
      setIsModalVisible(true);
    } else {
      alert('Não há registros para este paciente');
    }
  };

  const renderPaciente = ({ item }) => (
    <TouchableOpacity 
      style={styles.pacienteItem}
      onPress={() => handlePacientePress(item)}
    >
      <View style={styles.pacienteNomeContainer}>
        <Text style={styles.pacienteNome}>{item.nome}</Text>
        <View style={styles.pacienteInfoContainer}>
          {item.temNotificacao && (
            <View style={styles.notificationDot} />
          )}
          <Text style={styles.ultimaAtualizacaoText}>
            {formatDate(item.ultimaAtualizacao)}
          </Text>
        </View>
      </View>
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

      {/* Modal para detalhes do registro */}
      <RegistroDetailModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        registro={selectedPaciente}
        onDelete={() => {
          // Lógica para deletar registro
          setIsModalVisible(false);
        }}
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
  pacienteNomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  pacienteInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#c62c36',
    marginRight: 8,
  },
  ultimaAtualizacaoText: {
    color: '#666',
    fontSize: 12,
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