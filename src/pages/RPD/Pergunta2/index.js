import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ConfirmationModal from '../../../components/ConfirmationModal';

export default function Pergunta2(){
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [texto, setTexto] = useState('');

  const handleCancel = () => {
    setModalVisible(true);
  };

  const handleConfirmCancel = () => {
    setModalVisible(false);
    navigation.navigate('Home');
  };

  return(
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>O que aconteceu?</Text>
        <Text style={styles.subtitle}>
          Descreva a situação que gerou o pensamento ou emoção
        </Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite aqui..."
            placeholderTextColor="#999"
            multiline={true}
            numberOfLines={4}
            value={texto}
            onChangeText={setTexto}
            textAlignVertical="top"
          />
        </View>
      </View>

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
            onPress={() => navigation.navigate('Quiz', { screen: 'Pergunta3' })}
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
        message="Tem certeza que deseja cancelar o quiz?"
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
  }
});