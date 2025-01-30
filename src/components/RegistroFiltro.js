import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegistroFiltro = ({ 
  onFiltroChange, 
  initialSearchText = '', 
  initialFiltroData = null 
}) => {
  const [searchText, setSearchText] = useState(initialSearchText);
  const [filtroData, setFiltroData] = useState(initialFiltroData);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatarData = (data) => {
    return data ? new Date(data).toLocaleDateString('pt-BR') : '';
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFiltroData(selectedDate);
      onFiltroChange({ 
        searchText, 
        filtroData: selectedDate 
      });
    }
  };

  const limparFiltros = () => {
    setSearchText('');
    setFiltroData(null);
    onFiltroChange({ 
      searchText: '', 
      filtroData: null 
    });
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
    onFiltroChange({ 
      searchText: text, 
      filtroData 
    });
  };

  return (
    <View style={styles.filtrosContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por título"
        value={searchText}
        onChangeText={handleSearchChange}
      />
      
      <TouchableOpacity 
        style={styles.dateButton} 
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateButtonText}>
          {filtroData 
            ? formatarData(filtroData) 
            : 'Filtrar por data'}
        </Text>
      </TouchableOpacity>

      {(searchText || filtroData) && (
        <TouchableOpacity 
          style={styles.limparFiltroButton} 
          onPress={limparFiltros}
        >
          <Text style={styles.limparFiltroText}>Limpar</Text>
        </TouchableOpacity>
      )}

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={filtroData || new Date()}
          mode="date"
          is24Hour={true}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  filtrosContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center'
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10
  },
  dateButton: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  dateButtonText: {
    color: '#3b3dbf'
  },
  limparFiltroButton: {
    marginLeft: 10
  },
  limparFiltroText: {
    color: 'red'
  }
});

export default RegistroFiltro; 