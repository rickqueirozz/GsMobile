import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { EventProvider } from './src/context/EventContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <EventProvider>
        <AppNavigator />
      </EventProvider>
    </SafeAreaProvider>
  );
} 