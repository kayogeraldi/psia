import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQuiz } from '../../contexts/QuizContext';
import { useNavigation } from '@react-navigation/native';
import RegistroDetailModal from '../../components/RegistroDetailModal';
import RegistroFiltro from '../../components/RegistroFiltro';
import UserDB from '../../db/userDB';
import RpdService from '../../api/services/rpdService';

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
    filtroData: null,
    pacienteId: null
  });

  useEffect(() => {
    loadRegistros();
  }, []);

  const loadRegistros = async () => {
    try {
      setLoading(true);
      const userData = await UserDB.getUserData();
      const pacienteId = userData?.paciente?.id;
      
      if (!pacienteId) {
        Alert.alert('Erro', 'ID do paciente não encontrado');
        return;
      }

      setFiltros(prev => ({ ...prev, pacienteId }));
      
      const filtro = {
        paciente: { id: pacienteId }
      };
      
      if (filtros.searchText) {
        filtro.titulo = filtros.searchText;
      }

      const response = await RpdService.buscarPorCriterio(filtro);
      setRegistros(response);
      aplicarFiltros(response);
    } catch (error) {
      console.error(error);
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

  const handleFiltroChange = async (novosFiltros) => {
    setFiltros(prev => ({ ...prev, ...novosFiltros }));
    
    try {
      const filtro = {
        paciente: { id: filtros.pacienteId }
      };

      if (novosFiltros.searchText) {
        filtro.titulo = novosFiltros.searchText;
      }

      const response = await RpdService.buscarPorCriterio(filtro);
      setRegistros(response);
      aplicarFiltros(response);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível aplicar os filtros');
    }
  };

  const handleRegistroPress = (registro) => {
    setSelectedRegistro(registro);
    setModalVisible(true);
  };

  const formatarData = (data) => {
    if (!data) return '';
    
    try {
      // Divide a string em data e hora (se houver)
      const [dataStr] = data.split(' ');
      // Divide a data em dia, mês e ano
      const [dia, mes, ano] = dataStr.split('-');
      
      return `${dia}/${mes}/${ano}`;
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return '';
    }
  };

  const handleDeleteRegistro = async (id) => {
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
              var response = await RpdService.remover([id]); // API espera um array de IDs
              setModalVisible(false); // Fecha o modal se estiver aberto
              await loadRegistros(); // Recarrega a lista
              Alert.alert('Sucesso', 'Registro excluído com sucesso');
            } catch (error) {
              console.error('Erro ao excluir registro:', error);
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
        const registroFormatado = {
          id: item.id,
          data: item.dataRpd || item.dataHoraCriacao,
          situacao: item.motivos,
          sentimentos: Object.entries(item.sentimentos || {}).map(([sentimento, intensidade]) => ({
            sentimento,
            intensidade
          })),
          pensamentosAutomaticos: item.pensamentosAutomaticos,
          pensamentosAdaptativos: item.pensamentosAdaptativos,
          reavaliacao: {
            texto: item.reavaliacaoDoHumor,
            reavaliacoes: []
          }
        };
        
        handleRegistroPress(registroFormatado);
      }}
    >
      <View style={styles.registroContent}>
        <Text style={styles.registroTitulo}>
          {item.titulo || 'Sem título'}
        </Text>
        <Text style={styles.registroData}>
          {formatarData(item.dataRpd || item.dataHoraCriacao)}
        </Text>
        <Text style={styles.registroMotivo} numberOfLines={2}>
          {item.motivos || 'Sem motivo registrado'}
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
  registroMotivo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic'
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