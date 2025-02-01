import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQuiz } from '../../contexts/QuizContext';
import { useNavigation } from '@react-navigation/native';
import RegistroDetailModal from '../../components/RegistroDetailModal';
import RegistroFiltro from '../../components/RegistroFiltro';

export default function Registros() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchQuizRegistros } = useQuiz();
  const navigation = useNavigation();
  const [registrosFiltrados, setRegistrosFiltrados] = useState([]);
  const [selectedRegistro, setSelectedRegistro] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [filtros, setFiltros] = useState({
    searchText: '',
    filtroData: null
  });

  useEffect(() => {
    loadRegistros();
  }, []);

  const loadRegistros = async () => {
    try {
      setLoading(true);
      const fetchedRegistros = await fetchQuizRegistros();
      setRegistros(fetchedRegistros);
      aplicarFiltros(fetchedRegistros);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os registros');
    } finally {
      setLoading(false);
    }
  };

  const aplicarFiltros = (todosRegistros) => {
    let filtrados = todosRegistros;

    if (filtros.searchText) {
      filtrados = filtrados.filter(registro => 
        registro.titulo.toLowerCase().includes(filtros.searchText.toLowerCase())
      );
    }

    if (filtros.filtroData) {
      filtrados = filtrados.filter(registro => {
        const registroData = new Date(registro.data);
        const filtroDataObj = new Date(filtros.filtroData);
        return (
          registroData.getDate() === filtroDataObj.getDate() &&
          registroData.getMonth() === filtroDataObj.getMonth() &&
          registroData.getFullYear() === filtroDataObj.getFullYear()
        );
      });
    }

    filtrados.sort((a, b) => new Date(b.data) - new Date(a.data));
    
    setRegistrosFiltrados(filtrados);
  };

  const handleFiltroChange = (novosFiltros) => {
    setFiltros(novosFiltros);
  };

  const handleRegistroPress = (registro) => {
    setSelectedRegistro(registro);
    setModalVisible(true);
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const handleDeleteRegistro = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este registro?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedRegistros = registros.filter(registro => registro.id !== id);
              setRegistros(updatedRegistros);
              await loadRegistros();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o registro');
            }
          }
        }
      ]
    );
  };

  const renderRegistroItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.registroItem}
      onPress={() => {
        navigation.navigate('RegistroDetalhes', { registro: item });
      }}
    >
      <View style={styles.registroContent}>
        <Text style={styles.registroTitulo}>
          {item.titulo || 'Registro sem título'}
        </Text>
        <Text style={styles.registroData}>
          {formatarData(item.data)}
        </Text>
      </View>
      <TouchableOpacity 
        onPress={() => handleDeleteRegistro(item.id)}
        style={styles.deleteButton}
      >
        <Ionicons name="trash-outline" size={24} color="#FF6347" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando registros...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RegistroFiltro 
        onFiltroChange={handleFiltroChange}
        initialSearchText={filtros.searchText}
        initialFiltroData={filtros.filtroData}
      />

      {registros.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum registro encontrado</Text>
          <TouchableOpacity 
            style={styles.novoRegistroButton}
            onPress={() => navigation.navigate('Quiz', { screen: 'Pergunta1' })}
          >
            <Text style={styles.novoRegistroButtonText}>Criar Novo Registro</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={registrosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRegistroItem}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <RegistroDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        registro={selectedRegistro}
        onDelete={handleDeleteRegistro}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  registroItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  registroContent: {
    flex: 1,
    marginRight: 16,
  },
  registroTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  registroData: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  novoRegistroButton: {
    backgroundColor: '#4B0082',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  novoRegistroButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});