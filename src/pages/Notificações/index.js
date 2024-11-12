import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Notifications() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDays, setSelectedDays] = useState({
    dom: false,
    seg: false,
    ter: false,
    qua: false,
    qui: false,
    sex: false,
    sab: false
  });

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const toggleDay = (day) => {
    setSelectedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.reminderContainer}>
        <Text style={styles.title}>Lembrete Diário</Text>
        <Switch
          value={isEnabled}
          onValueChange={toggleSwitch}
        />
      </View>

      {isEnabled && (
        <>
          <TouchableOpacity 
            style={styles.timeButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Text>Horário: {time.toLocaleTimeString().slice(0, 5)}</Text>
          </TouchableOpacity>

          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={true}
              onChange={onTimeChange}
            />
          )}

          <View style={styles.daysContainer}>
            {Object.entries(selectedDays).map(([day, selected]) => (
              <TouchableOpacity 
                key={day}
                style={[styles.dayButton, selected && styles.selectedDay]}
                onPress={() => toggleDay(day)}
              >
                <Text style={[styles.dayText, selected && styles.selectedDayText]}>
                  {day.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  reminderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeButton: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 20,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  dayButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedDay: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  dayText: {
    fontSize: 12,
  },
  selectedDayText: {
    color: 'white',
  },
});