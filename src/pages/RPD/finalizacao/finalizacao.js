import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { useQuiz } from '../../../contexts/QuizContext';

export default function Finalizacao(){
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmSaveModalVisible, setConfirmSaveModalVisible] = useState(false);
  const [titulo, setTitulo] = useState('Sem título');
  const { quizData, updateQuizData, saveQuiz } = useQuiz();
  const { texto, reavaliacoes } = quizData.pergunta6;
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

  const handleSaveConfirmation = () => {
    setConfirmSaveModalVisible(true);
  };

  const handleFinalizar = async () => {
    const sucesso = await saveQuiz();
    if (sucesso) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Erro', 'Não foi possível salvar o registro.');
    }
  };

  return(
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Reavaliação do humor</Text>
          <Text style={styles.subtitle}>
            Compare seus humores anteriores e reavalie a intensidade atual de cada um
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

          {humoresAnteriores.map((humor, index) => (
            <View key={index} style={styles.humorCompareContainer}>
              <View style={styles.humorAnterior}>
                <Text style={styles.humorLabel}>{humor.sentimento}</Text>
                <Text style={styles.intensidadeLabel}>Intensidade anterior: {humor.intensidade}</Text>
              </View>

              <View style={styles.pickerWrapper}>
                <Text style={styles.intensidadeLabel}>Nova intensidade:</Text>
                <Picker
                  selectedValue={reavaliacoes?.[index] || '0'}
                  onValueChange={(value) => handleIntensidadeChange(value, index)}
                  style={styles.picker}
                >
                  {intensidades.map((num) => (
                    <Picker.Item key={num} label={num} value={num} />
                  ))}
                </Picker>
              </View>
            </View>
          ))}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Como você se sente após essa reavaliação?"
              placeholderTextColor="#999"
              multiline={true}
              numberOfLines={4}
              value={texto}
              onChangeText={(newText) => updateQuizData('pergunta6', { texto: newText })}
              textAlignVertical="top"
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
            onPress={handleSaveConfirmation}
          >
            <Text style={styles.buttonText}>Finalizar</Text>
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
        message="Tem certeza que deseja cancelar o quiz?"
      />

      <ConfirmationModal
        visible={confirmSaveModalVisible}
        onClose={() => setConfirmSaveModalVisible(false)}
        onConfirm={handleFinalizar}
        message="Tem certeza que deseja salvar este registro?"
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
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40
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
    backgroundColor: '#3b3dbf'
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
});