import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert, Modal } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import RegistroDetailModal from '../RegistroDetailModal';
import PacienteService from '../../api/services/pacienteService';
import UserDB from '../../db/userDB';

export default function PacientesContent({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    searchText: '',
    psicologo: null
  });
  const [selectedRpd, setSelectedRpd] = useState(null);
  const [rpdsModalVisible, setRpdsModalVisible] = useState(false);

  useEffect(() => {
    loadPacientes();
  }, []);

  const loadPacientes = async () => {
    try {
      setLoading(true);
      const userData = await UserDB.getUserData();
      const psicologoId = userData?.psicologo?.id;
      
      if (!psicologoId) {
        Alert.alert('Erro', 'ID do psicólogo não encontrado');
        return;
      }

      setFiltros(prev => ({ ...prev, psicologo: { id: psicologoId } }));
      
      const filtro = {
        psicologo: { id: psicologoId }
      };
      
      if (searchTerm) {
        filtro.nome = searchTerm;
      }

      const response = await PacienteService.buscarPorCriterio(filtro);
      
      if (Array.isArray(response)) {
        setPacientes(response);
      } else {
        console.error('Resposta não é um array:', response);
        setPacientes([]);
      }
    } catch (error) {
      console.error('Erro completo:', error);
      Alert.alert('Erro', 'Não foi possível carregar os pacientes');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = async (text) => {
    setSearchTerm(text);
    try {
      const filtro = {
        psicologo: { id: filtros.psicologo.id }
      };

      if (text) {
        filtro.nome = text;
      }

      const response = await PacienteService.buscarPorCriterio(filtro);
      setPacientes(response);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível realizar a busca');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const [dataStr] = dateString.split(' ');
      const [dia, mes, ano] = dataStr.split('-');
      return `${dia}/${mes}/${ano}`;
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return '';
    }
  };

  const handlePacientePress = (paciente) => {
    if (paciente.historico && paciente.historico.length > 0) {
      setSelectedPaciente(paciente);
      setRpdsModalVisible(true);
    } else {
      Alert.alert('Aviso', 'Não há registros para este paciente');
    }
  };

  const handleRpdPress = (rpd) => {
    const registroFormatado = {
      id: rpd.id,
      data: rpd.dataRpd || rpd.dataHoraCriacao,
      situacao: rpd.motivos,
      sentimentos: Object.entries(rpd.sentimentos || {}).map(([sentimento, intensidade]) => ({
        sentimento,
        intensidade
      })),
      pensamentosAutomaticos: rpd.pensamentosAutomaticos,
      pensamentosAdaptativos: rpd.pensamentosAdaptativos,
      reavaliacao: {
        texto: rpd.reavaliacaoDoHumor,
        reavaliacoes: []
      }
    };
    setSelectedRpd(registroFormatado);
    setRpdsModalVisible(false);
    setIsModalVisible(true);
  };

  const RpdsModal = ({ visible, onClose, paciente }) => {
    const formatarData = (data) => {
      if (!data) return '';
      try {
        const [dataStr] = data.split(' ');
        const [dia, mes, ano] = dataStr.split('-');
        return `${dia}/${mes}/${ano}`;
      } catch (error) {
        return '';
      }
    };

    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Registros de {paciente?.usuario?.nome}
            </Text>
            
            <FlatList
              data={paciente?.historico || []}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.rpdItem}
                  onPress={() => handleRpdPress(item)}
                >
                  <Text style={styles.rpdData}>
                    {formatarData(item.dataRpd || item.dataHoraCriacao)}
                  </Text>
                  <Text style={styles.rpdMotivo} numberOfLines={2}>
                    {item.motivos || 'Sem motivo registrado'}
                  </Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Nenhum registro encontrado</Text>
              }
            />

            <TouchableOpacity 
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderPaciente = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.pacienteItem}
        onPress={() => handlePacientePress(item)}
      >
        <View style={styles.pacienteNomeContainer}>
          <Text style={styles.pacienteNome}>
            {item?.usuario?.nome || 'Nome não disponível'}
          </Text>
          <View style={styles.pacienteInfoContainer}>
            {item?.historico?.length > 0 && (
              <View style={styles.notificationDot} />
            )}
            <Text style={styles.ultimaAtualizacaoText}>
              {formatDate(item?.usuario?.dataNascimento)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando pacientes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar pacientes"
          value={searchTerm}
          onChangeText={handleSearchChange}
        />
      </View>

      {pacientes.length > 0 ? (
        <FlatList
          data={pacientes}
          renderItem={renderPaciente}
          keyExtractor={item => item?.id?.toString() || Math.random().toString()}
          ListEmptyComponent={
            <Text style={styles.emptyListText}>Nenhum paciente encontrado</Text>
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum paciente encontrado</Text>
        </View>
      )}

      <RpdsModal
        visible={rpdsModalVisible}
        onClose={() => setRpdsModalVisible(false)}
        paciente={selectedPaciente}
      />

      <RegistroDetailModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        registro={selectedRpd}
        onDelete={() => setIsModalVisible(false)}
      />

      {/* <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('AdicionarPaciente')}
      >
        <Feather name="plus" size={24} color="#FFF" />
      </TouchableOpacity> */}
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  rpdItem: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  rpdData: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  rpdMotivo: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    backgroundColor: '#3b3dbf',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 