import React from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Certifique-se de ter instalado: npm install react-native-vector-icons

const RegistroDetailModal = ({ visible, onClose, registro, onDelete }) => {
  if (!registro) return null;

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir este registro?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: () => {
            onDelete(registro.id);
            onClose();
          },
          style: "destructive"
        }
      ]
    );
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
          <View style={styles.modalHeader}>
            <Text style={styles.dataText}>{formatarData(registro.data)}</Text>
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Icon name="delete" size={24} color="#c62c36" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView}>
            <Text style={styles.dataText}>{formatarData(registro.data)}</Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Situação</Text>
              <Text style={styles.sectionText}>{registro.situacao}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sentimentos</Text>
              <View style={styles.sentimentosContainer}>
                {registro.sentimentos.map((sent, index) => (
                  <View key={index} style={styles.sentimentoItem}>
                    <Text style={styles.sentimentoText}>
                      {sent.sentimento}
                    </Text>
                    <Text style={styles.intensidadeText}>
                      Intensidade inicial: {sent.intensidade}
                      {registro.reavaliacao.reavaliacoes[index] && 
                        ` → Final: ${registro.reavaliacao.reavaliacoes[index]}`
                      }
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pensamentos Automáticos</Text>
              <Text style={styles.sectionText}>{registro.pensamentosAutomaticos}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pensamentos Adaptativos</Text>
              <Text style={styles.sectionText}>{registro.pensamentosAdaptativos}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Reavaliação</Text>
              <Text style={styles.sectionText}>{registro.reavaliacao.texto}</Text>
            </View>
          </ScrollView>

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

export default RegistroDetailModal; 

const styles = StyleSheet.create({
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
    elevation: 5
  },
  scrollView: {
    maxHeight: '90%'
  },
  dataText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b3dbf',
    marginBottom: 20
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8
  },
  sectionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20
  },
  sentimentosContainer: {
    gap: 10
  },
  sentimentoItem: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  sentimentoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333'
  },
  intensidadeText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4
  },
  closeButton: {
    backgroundColor: '#3b3dbf',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  deleteButton: {
    padding: 8,
  },
}); 