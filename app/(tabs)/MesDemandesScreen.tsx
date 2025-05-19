import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SectionList } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface RequestItem {
  id: string;
  title: string;
  status: string;
  date: string;
  address: string;
}

const DATA: { title: string; data: RequestItem[] }[] = [
  {
    title: 'À venir',
    data: [
      { id: '1', title: 'Livraison', status: "En attente d'envoi", date: '22/05/2025', address: '123 Rue de la Santé, Paris' },
      { id: '2', title: 'Réunion projet', status: 'Accepté', date: '25/05/2025', address: '45 Avenue du Travail, Lyon' },
    ],
  },
  {
    title: 'Passées',
    data: [
      { id: '15', title: 'Baby-Sitting', status: 'Terminée', date: '10/04/2025', address: '10 Boulevard des Enfants, Marseille' },
      { id: '16', title: 'Baby-Sitting', status: 'Annulée', date: '15/04/2025', address: '22 Place du Bien-être, Nice' },
      { id: '17', title: 'Livraison', status: 'Terminée', date: '20/04/2025', address: '7 Rue du Commerce, Bordeaux' },
      { id: '18', title: 'Déménagement', status: 'Terminée', date: '01/05/2025', address: '3 Rue de la Socialisation, Toulouse' },
      { id: '19', title: 'Nettoyage Automobile', status: 'Terminée', date: '05/05/2025', address: '89 Avenue des Autos, Nantes' },
    ],
  },
];

export default function MesDemandesScreen() {
  const router = useRouter();

  return (
    <>
      {/* On désactive la barre de header par défaut (qui mettait “Tabs” en back) */}
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mes demandes</Text>
        </View>

        <SectionList
          sections={DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item, section }) => (
            <TouchableOpacity
              style={[styles.card, section.title === 'À venir' && styles.upcomingCard]}
              onPress={() =>
                router.push({
                  pathname: '/RequestDetail',
                  params: { id: item.id },
                })
              }
            >
              <View style={styles.row}>
                <Text style={styles.requestTitle}>{item.title}</Text>
                <Text style={[styles.requestStatus, statusStyles[item.status]]}>
                  {item.status}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.requestDate}>{item.date}</Text>
                <Text style={styles.requestAddress}>{item.address}</Text>
              </View>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          contentContainerStyle={styles.list}
        />
      </View>
    </>
  );
}

const statusStyles = StyleSheet.create({
  "En attente":      { color: '#FFA500' },
  "En attente d'envoi": { color: '#FFA500' },
  Accepté:            { color: '#28A745' },
  Rejeté:             { color: '#DC3545' },
  Terminée:           { color: '#6c757d' },
  Annulée:            { color: '#DC3545' },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  list: {
    paddingBottom: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 8,
    color: '#000',
  },
  card: {
    padding: 16,
    backgroundColor: '#D0D0D0',
    borderRadius: 12,
    marginBottom: 12,
  },
  upcomingCard: {
    backgroundColor: '#B0E0E6',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  requestStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  requestDate: {
    fontSize: 14,
    color: '#666',
  },
  requestAddress: {
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
});
