import React, { createContext, useContext, useState, useEffect } from 'react';
import { Event } from '../types';
import { getEvents, saveEvent, removeEvent } from '../storage/eventStorage';

interface EventContextData {
  events: Event[];
  addEvent: (event: Event) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  refreshEvents: () => Promise<void>;
}

const EventContext = createContext<EventContextData>({} as EventContextData);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);

  const refreshEvents = async () => {
    const loadedEvents = await getEvents();
    setEvents(loadedEvents);
  };

  const addEvent = async (event: Event) => {
    await saveEvent(event);
    await refreshEvents();
  };

  const deleteEvent = async (eventId: string) => {
    await removeEvent(eventId);
    await refreshEvents();
  };

  useEffect(() => {
    refreshEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events, addEvent, deleteEvent, refreshEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}; 