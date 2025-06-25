import React, { useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { v4 as uuidv4 } from 'uuid';
import EventForm from '../components/EventForm';
import { useEvents } from '../context/EventContext';

type NewEventScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NewEvent'>;

const NewEventScreen = () => {
  const navigation = useNavigation<NewEventScreenNavigationProp>();
  const { addEvent } = useEvents();
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [damages, setDamages] = useState('');
  const [date, setDate] = useState('');

  const handleSave = async () => {
    if (!location || !duration || !damages || !date) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      const newEvent = {
        id: uuidv4(),
        location,
        duration,
        damages,
        date,
      };

      await addEvent(newEvent);
      Alert.alert('Sucesso', 'Evento registrado com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o evento');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <EventForm
        location={location}
        setLocation={setLocation}
        duration={duration}
        setDuration={setDuration}
        damages={damages}
        setDamages={setDamages}
        date={date}
        setDate={setDate}
        onSave={handleSave}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default NewEventScreen; 