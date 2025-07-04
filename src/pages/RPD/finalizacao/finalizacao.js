import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import ConfirmationModal from '../../../components/ConfirmationModal/confirmation';
import { useQuiz } from '../../../contexts/QuizContext';

export default function Finalizacao(){
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmSaveModalVisible, setConfirmSaveModalVisible] = useState(false);
  const [titulo, setTitulo] = useState('Sem título');
  const { quizData, updateQuizData, saveQuiz } = useQuiz();
  const { reavaliacoes } = quizData.pergunta6;
  const humoresAnteriores = quizData.pergunta3.sentimentosList;

  const intensidades = Array.from({length: 11}, (_, i) => i.toString());

  const handleIntensidadeChange = (novaIntensidade, index) => {
    const novasReavaliacoes = [...(reavaliacoes || [])];
    novasReavaliacoes[index] = novaIntensidade;
    updateQuizData('pergunta6', { reavaliacoes: novasReavaliacoes });
  };

  const handleCancel = () => {
    setModalVisible(true);
  };

  const handleConfirmCancel = () => {
    setModalVisible(false);
    navigation.navigate('Home');
  };

  const handleFinalizar = async () => {
    const sucesso = await saveQuiz(titulo);
    if (sucesso) {
      navigation.navigate('Home');
      loadRegistros();
    } else {
      Alert.alert('Erro', 'Não foi possível salvar o registro.');
    }
  };

  return(
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Parabéns, você finalizou o RPD!</Text>
          <Text style={styles.subtitle}>
            Ao salvar você poderá vê-lo na aba "Meus Registros".
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.tituloInput}
              placeholder="Digite um título (opcional)"
              placeholderTextColor="#999"
              value={titulo}
              onChangeText={setTitulo}
            />
          </View>

          
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, styles.buttonVoltar]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.buttonProximo]}
            onPress={handleFinalizar}
          >
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.buttoncancelar}
          onPress={handleCancel}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      <ConfirmationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirmCancel}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30
  },
  input: {
    width: '100%',
    height: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  footer: {
    padding: 20,
    paddingBottom: 30,
    width: '100%',
    alignItems: 'center'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center'
  },
  buttonVoltar: {
    backgroundColor: '#808080'
  },
  buttonProximo: {
    backgroundColor: '#7673FF'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttoncancelar: {
    backgroundColor: '#c62c36',
    padding: 15,
    borderRadius: 10,
    width: '50%',
    alignItems: 'center'
  },
  humorCompareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  humorAnterior: {
    flex: 1,
    paddingRight: 10,
  },
  humorLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  intensidadeLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  pickerWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  picker: {
    height: 40,
    width: '100%',
  },
  tituloInput: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20
  },
  humoresContainer: {
    width: '100%',
    alignItems: 'center',
  },
});