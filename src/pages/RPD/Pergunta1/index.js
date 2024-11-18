import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Checkbox } from 'react-native-paper';  // Se não tiver, instale: npm install react-native-paper
import ConfirmationModal from '../../../components/ConfirmationModal';

export default function Pergunta1(){
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isToday, setIsToday] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCancel = () => {
    setModalVisible(true);
  };

  const handleConfirmCancel = () => {
    setModalVisible(false);
    navigation.navigate('Home');
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setIsToday(false);
    }
  };

  const handleTodayCheck = () => {
    setIsToday(!isToday);
    if (!isToday) {
      setDate(new Date());
    }
  };

  return(
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Quando Aconteceu?</Text>
        
        <View style={styles.dateContainer}>
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={handleTodayCheck}
          >
            <Checkbox
              status={isToday ? 'checked' : 'unchecked'}
              onPress={handleTodayCheck}
            />
            <Text style={styles.checkboxLabel}>Aconteceu hoje</Text>
          </TouchableOpacity>

          {!isToday && (
            <>
              <TouchableOpacity 
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateButtonText}>
                  Selecionar outra data: {date.toLocaleDateString()}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
            </>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.buttonRow}>
          

          <TouchableOpacity 
            style={[styles.button, styles.buttonProximo]}
            onPress={() => navigation.navigate('Quiz', { screen: 'Pergunta2' })}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  dateContainer: {
    width: '100%',
    marginBottom: 30
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 8
  },
  dateButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333'
  },
  footer: {
    padding: 20,
    paddingBottom: 30,
    width: '100%',
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30
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
    width: '48%',  // deixa um pequeno espaço entre os botões
    alignItems: 'center'
  },
  buttonVoltar: {
    backgroundColor: '#808080'  // cor cinza para o botão voltar
  },
  buttonProximo: {
    backgroundColor: '#3b3dbf'  // mantém a cor original do botão próximo
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