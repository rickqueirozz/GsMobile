import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Event } from '../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEvents } from '../context/EventContext';

type EventDetailsRouteProp = RouteProp<RootStackParamList, 'EventDetails'>;
type EventDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EventDetails'>;

const EventDetailsScreen = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const route = useRoute<EventDetailsRouteProp>();
  const navigation = useNavigation<EventDetailsNavigationProp>();
  const { events, deleteEvent } = useEvents();

  useEffect(() => {
    const foundEvent = events.find(e => e.id === route.params.eventId);
    if (foundEvent) {
      setEvent(foundEvent);
    }
  }, [events, route.params.eventId]);

  const handleDelete = async () => {
    try {
      await deleteEvent(route.params.eventId);
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
    }
  };

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Localização</Text>
          <Text style={styles.sectionContent}>{event.location}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data do Evento</Text>
          <Text style={styles.sectionContent}>{event.date}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Duração</Text>
          <Text style={styles.sectionContent}>{event.duration}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prejuízos</Text>
          <Text style={styles.sectionContent}>{event.damages}</Text>
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Icon name="delete" size={24} color="white" />
          <Text style={styles.deleteButtonText}>Excluir Evento</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default EventDetailsScreen; 