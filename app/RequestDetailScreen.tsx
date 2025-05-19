import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Reuse RequestItem interface and DATA from MesDemandesScreen
interface RequestItem {
  id: string;
  title: string;
  status: string;
  date: string;
  address: string;
}

// Flatten DATA for lookup
const ALL_REQUESTS: RequestItem[] = [
  { id: '1', title: 'Livraison', status: "En attente d'envoi", date: '22/05/2025', address: '123 Rue de la Santé, Paris' },
  { id: '2', title: 'Réunion projet', status: 'Accepté', date: '25/05/2025', address: '45 Avenue du Travail, Lyon' },
  { id: '15', title: 'Baby-Sitting', status: 'Terminée', date: '10/04/2025', address: '10 Boulevard des Enfants, Marseille' },
  { id: '16', title: 'Baby-Sitting', status: 'Annulée', date: '15/04/2025', address: '22 Place du Bien-être, Nice' },
  { id: '17', title: 'Livraison', status: 'Terminée', date: '20/04/2025', address: '7 Rue du Commerce, Bordeaux' },
  { id: '18', title: 'Déménagement', status: 'Terminée', date: '01/05/2025', address: '3 Rue de la Socialisation, Toulouse' },
  { id: '19', title: 'Nettoyage Automobile', status: 'Terminée', date: '05/05/2025', address: '89 Avenue des Autos, Nantes' },
];

type ParamList = {
  RequestDetail: { id: string };
};

export default function RequestDetailScreen() {
  const route = useRoute<RouteProp<ParamList, 'RequestDetail'>>();
  const navigation = useNavigation();
  const { id } = route.params;
  const item = ALL_REQUESTS.find(req => req.id === id);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Demande introuvable</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <IconSymbol name="chevron.left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.label}>Statut :</Text>
      <Text style={styles.value}>{item.status}</Text>
      <Text style={styles.label}>Date :</Text>
      <Text style={styles.value}>{item.date}</Text>
      <Text style={styles.label}>Adresse :</Text>
      <Text style={styles.value}>{item.address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    color: '#DC3545',
  },
});
