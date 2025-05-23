import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location';

const PRIMARY = '#4A90E2';
const BACKGROUND = '#F2F6FA';
const CARD_BG = '#FFFFFF';
const TEXT_PRIMARY = '#1F2937';
const TEXT_SECONDARY = '#4B5563';
const DOT_SIZE = 12;
const steps = ['EnAttente', 'EnCours', 'En livraison', 'Terminé'];

export default function RequestDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // 1. Récupère la réservation
        const res = await axios.get(`http://57.128.212.12:8082/api/reservations/${id}`);
        const reservation = res.data;

        // 2. Permission de géocodage
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Permission de localisation refusée');
        }

        // 3. Géocode adresses
        const pickupGeo = await Location.geocodeAsync(reservation.startLocation);
        const dropoffGeo = await Location.geocodeAsync(reservation.recipientAddress);
        if (!pickupGeo.length || !dropoffGeo.length) {
          throw new Error('Impossible de géocoder les adresses');
        }

        const pickupCoords = {
          latitude: pickupGeo[0].latitude,
          longitude: pickupGeo[0].longitude,
        };
        const dropoffCoords = {
          latitude: dropoffGeo[0].latitude,
          longitude: dropoffGeo[0].longitude,
        };

        const latDiff = Math.abs(pickupCoords.latitude - dropoffCoords.latitude);
        const lngDiff = Math.abs(pickupCoords.longitude - dropoffCoords.longitude);
        const DELTA_MIN = 0.02;
        const region: Region = {
          latitude: (pickupCoords.latitude + dropoffCoords.latitude) / 2,
          longitude: (pickupCoords.longitude + dropoffCoords.longitude) / 2,
          latitudeDelta: Math.max(latDiff * 1.5, DELTA_MIN),
          longitudeDelta: Math.max(lngDiff * 1.5, DELTA_MIN),
        };

        setData({ ...reservation, pickupCoords, dropoffCoords });
        setInitialRegion(region);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Chargement…</Text>
      </View>
    );
  }

  if (error || !data || !initialRegion) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{error || 'Données manquantes'}</Text>
      </View>
    );
  }

  const currentStep = steps.indexOf(data.reservationStatus);
  const width = Dimensions.get('window').width;
  const MAP_HEIGHT = width * 0.6;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Suivi de livraison</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Carte */}
        <View style={[styles.mapContainer, { height: MAP_HEIGHT }]}>
          <MapView style={StyleSheet.absoluteFill} initialRegion={initialRegion}>
            {/* Ligne du trajet entre départ et arrivée */}
            <Polyline
              coordinates={[data.pickupCoords, data.dropoffCoords]}
              strokeColor={PRIMARY}
              strokeWidth={4}
            />
            {/* Marker discret pour l'arrivée */}
            <Marker coordinate={data.dropoffCoords}>
              <View style={styles.arrivalMarker} />
            </Marker>
          </MapView>
        </View>

        {/* Statut et barre de progression */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>{data.reservationStatus || '—'}</Text>
          <View style={styles.stepsContainer}>
            {steps.map((label, i) => {
              const done = i <= currentStep;
              return (
                <View key={label} style={styles.stepItem}>
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: done ? PRIMARY : '#E5E7EB' },
                    ]}
                  />
                  <Text style={[styles.stepLabel, done && { color: PRIMARY }]}>
                    {label}
                  </Text>
                  {i < steps.length - 1 && (
                    <View
                      style={[
                        styles.line,
                        { backgroundColor: i < currentStep ? PRIMARY : '#E5E7EB' },
                      ]}
                    />
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Détails de la livraison */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Détails</Text>
          <DetailRow
            icon="time-outline"
            label={new Date(data.deliveryDate).toLocaleString('fr-FR')}
          />
          <DetailRow icon="location-outline" label={data.startLocation} />
          <DetailRow icon="location-outline" label={data.recipientAddress} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailRow({ icon, label }: { icon: string; label: string }) {
  return (
    <View style={styles.detailRow}>
      <Ionicons name={icon as any} size={18} color={TEXT_SECONDARY} />
      <Text style={styles.detailText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BACKGROUND },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PRIMARY,
    padding: 12,
  },
  backBtn: { padding: 4 },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  scroll: { paddingBottom: 24 },

  mapContainer: {
    width: '100%',
    backgroundColor: '#eee',
    overflow: 'hidden',
    borderRadius: 12,
    margin: 16,
  },
  arrivalMarker: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: PRIMARY,
    borderWidth: 2,
    borderColor: '#fff',
  },

  statusCard: {
    backgroundColor: CARD_BG,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusTitle: { fontSize: 16, fontWeight: '600', color: TEXT_PRIMARY },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  stepItem: { flex: 1, alignItems: 'center' },
  dot: { width: DOT_SIZE, height: DOT_SIZE, borderRadius: DOT_SIZE / 2 },
  line: {
    position: 'absolute',
    top: DOT_SIZE / 2 - 1,
    left: '50%',
    right: '-50%',
    height: 2,
  },
  stepLabel: {
    marginTop: 4,
    fontSize: 10,
    color: TEXT_SECONDARY,
    textAlign: 'center',
  },

  infoCard: {
    backgroundColor: CARD_BG,
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: TEXT_PRIMARY,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: { marginLeft: 8, fontSize: 14, color: TEXT_SECONDARY },
});

