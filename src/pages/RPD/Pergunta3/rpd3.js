import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import ConfirmationModal from '../../../components/ConfirmationModal/confirmation';
import { useQuiz } from '../../../contexts/QuizContext';

export default function Pergunta3(){
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { quizData, updateQuizData } = useQuiz();
  const { 
    sentimentosList, 
    observacoes, 
    selectedSentimento, 
    selectedIntensidade 
  } = quizData.pergunta3;

  const sentimentos = [
    'Alegria', 'Tristeza', 'Raiva', 'Medo', 'Ansiedade',
    'Culpa', 'Vergonha', 'Frustração', 'Solidão', 'Esperança'
  ];

  const intensidades = Array.from({length: 11}, (_, i) => i.toString());

  const handleAddSentimento = () => {
    if (selectedSentimento && selectedIntensidade) {
      const novoSentimento = {
        sentimento: selectedSentimento,
        intensidade: selectedIntensidade
      };
      
      updateQuizData('pergunta3', {
        sentimentosList: [...sentimentosList, novoSentimento],
        selectedSentimento: '',
        selectedIntensidade: '1'
      });
    }
  };

  const handleCancel = () => {
    setModalVisible(true);
  };

  const handleConfirmCancel = () => {
    setModalVisible(false);
    // Limpar dados ao cancelar
    updateQuizData('pergunta3', {
      sentimentosList: [],
      observacoes: '',
      selectedSentimento: '',
      selectedIntensidade: '1'
    });
    navigation.navigate('Home');
  };

  return(
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Sentimentos</Text>
          <Text style={styles.subtitle}>
            Especifique as emoções, sentimentos ou sensações e
            avalie a intensidade utilizando a escala de 0 a 10.
          </Text>
          
          <View style={styles.pickerContainer}>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedSentimento}
                onValueChange={(value) => updateQuizData('pergunta3', { selectedSentimento: value })}
                style={styles.picker}
              >
                <Picker.Item label="Selecione" value="" />
                {sentimentos.map((sentimento) => (
                  <Picker.Item key={sentimento} label={sentimento} value={sentimento} />
                ))}
              </Picker>
            </View>

            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedIntensidade}
                onValueChange={(value) => updateQuizData('pergunta3', { selectedIntensidade: value })}
                style={styles.picker}
              >
                {intensidades.map((num) => (
                  <Picker.Item key={num} label={num} value={num} />
                ))}
              </Picker>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddSentimento}
          >
            <Text style={styles.addButtonText}>+ Adicionar Sentimento</Text>
          </TouchableOpacity>

          {/* Lista de sentimentos adicionados */}
          {sentimentosList.map((item, index) => (
            <View key={index} style={styles.sentimentoItem}>
              <Text style={styles.sentimentoText}>
                {item.sentimento} - Intensidade: {item.intensidade}
              </Text>
            </View>
          ))}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Observações adicionais..."
              placeholderTextColor="#999"
              multiline={true}
              numberOfLines={4}
              value={observacoes}
              onChangeText={(text) => updateQuizData('pergunta3', { observacoes: text })}
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
            onPress={() => navigation.navigate('Quiz', { screen: 'Pergunta4' })}
          >
            <Text style={styles.buttonText}>Próximo</Text>
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
  scrollView: {
    flex: 1,
    width: '100%'
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10
  },
  pickerWrapper: {
    width: '48%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden'
  },
  picker: {
    height: 50,
    width: '100%'
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  sentimentoItem: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  sentimentoText: {
    fontSize: 16,
    color: '#333'
  }
});