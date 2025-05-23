import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const PRIMARY = '#007AFF';
const BACKGROUND = '#E6F0F0';
const CARD_BG = '#FFFFFF';
const TEXT_COLOR = '#333';

export default function ProvidersScreen() {
  const router = useRouter();
  const { reservationId, payload } = useLocalSearchParams<{
    reservationId?: string;
    payload?: string;
  }>();

  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  // Si la réservation n'existe pas encore, crée-la depuis le payload
  useEffect(() => {
    if (!reservationId && payload) {
      const parsedPayload = JSON.parse(payload);

      axios
        .post('http://57.128.212.12:8082/api/reservations', parsedPayload)
        .then((res) => {
          const newId = res.data.reservationId;
          router.replace({
            pathname: '/providers',
            params: { reservationId: String(newId) },
          });
        })
        .catch((err) => {
          console.error('Erreur POST depuis providers:', err.response?.data);
          setError('Échec de l’enregistrement de la demande');
          setLoading(false);
        });
    }
  }, [reservationId, payload]);

  // Une fois la réservation créée (ou reçue), charge les prestataires
  useEffect(() => {
    if (!reservationId) return;

    axios
      .get(
        `http://57.128.212.12:8082/api/providers?reservationId=${reservationId}`
      )
      .then(({ data }) => setProviders(data))
      .catch(() => setError('Impossible de charger les prestataires'))
      .finally(() => setLoading(false));
  }, [reservationId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Retour au formulaire</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.rowTop}>
        <Ionicons name="ios-car-sport-outline" size={32} color={PRIMARY} />
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.infoText}>
            Note : {item.rating.toFixed(1)} ({item.reviews} avis)
          </Text>
          <Text style={styles.infoText}>Distance : {item.distance} km</Text>
          <Text style={styles.infoText}>Prix estimé : {item.price} €</Text>
          <Text style={styles.infoText}>Délai : dans {item.delay} min</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: '/request-detail/[id]',
              params: { id: reservationId },
            })
          }
        >
          <Text style={styles.buttonText}>Sélectionner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ title: 'Choix du prestataire' }} />
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={providers}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BACKGROUND },
  list: { padding: 16 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rowTop: { flexDirection: 'row', alignItems: 'center' },
  details: { flex: 1, marginLeft: 12 },
  name: { fontSize: 18, fontWeight: '700', color: TEXT_COLOR },
  infoText: { fontSize: 13, color: TEXT_COLOR, marginTop: 4 },
  button: {
    backgroundColor: PRIMARY,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 6,
  },
  buttonText: { color: CARD_BG, fontWeight: '700' },
});
