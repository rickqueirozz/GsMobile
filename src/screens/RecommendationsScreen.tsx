import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import RecommendationSection from '../components/RecommendationSection';

const recommendations = [
  {
    title: 'Antes da Tempestade',
    items: [
      'Mantenha uma lanterna e pilhas extras em local de fácil acesso',
      'Tenha um rádio portátil para acompanhar as notícias',
      'Mantenha o celular carregado e tenha uma bateria externa',
      'Tenha água e alimentos não perecíveis em estoque',
      'Identifique o local do disjuntor principal da sua residência',
    ],
  },
  {
    title: 'Durante a Falta de Energia',
    items: [
      'Desligue equipamentos elétricos para evitar danos por surto de energia',
      'Mantenha a geladeira fechada para preservar os alimentos',
      'Use lanternas em vez de velas para evitar riscos de incêndio',
      'Mantenha-se informado através do rádio ou celular',
      'Evite abrir portas e janelas desnecessariamente',
    ],
  },
  {
    title: 'Após a Energia Voltar',
    items: [
      'Verifique se todos os equipamentos estão funcionando corretamente',
      'Descarte alimentos que possam ter estragado',
      'Verifique se há danos na instalação elétrica',
      'Registre o evento no aplicativo para ajudar na prevenção futura',
      'Mantenha um kit de emergência sempre atualizado',
    ],
  },
];

const RecommendationsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>
          Orientações Preventivas e Boas Práticas
        </Text>

        {recommendations.map((section, index) => (
          <RecommendationSection
            key={index}
            title={section.title}
            items={section.items}
          />
        ))}

        <View style={styles.emergencySection}>
          <Text style={styles.emergencyTitle}>Números de Emergência</Text>
          <Text style={styles.emergencyText}>
            Defesa Civil: 199{'\n'}
            Bombeiros: 193{'\n'}
            Polícia: 190{'\n'}
            SAMU: 192
          </Text>
        </View>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  emergencySection: {
    backgroundColor: '#ffebee',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 12,
  },
  emergencyText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});

export default RecommendationsScreen; 