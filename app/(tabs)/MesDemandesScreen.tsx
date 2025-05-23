// app/(tabs)/mes-demandes.tsx
import React, { useEffect, useState, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const PRIMARY = '#4A90E2';
const BACKGROUND = '#F2F6FA';
const CARD_BG = '#FFFFFF';
const TEXT_PRIMARY = '#1F2937';
const TEXT_SECONDARY = '#4B5563';

const statusColors: Record<string, string> = {
  EnAttente: '#F59E0B',
  EnCours:   '#34D399',
  Terminé:   '#6B7280',
  Annulé:    '#EF4444',
};

export default function MesDemandesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    axios.get('http://57.128.212.12:8082/api/reservations')
      .then(({ data }) => {
        // Ici on récupère data.$values, ou un tableau vide si non défini
        const list = Array.isArray(data.$values) ? data.$values : [];
        setReservations(list);
      })
      .catch(() => setError('Échec du chargement des demandes'))
      .finally(() => setLoading(false));
  }, []);

  // Filtre "À venir" = EnCours ou EnAttente
  const upcoming = useMemo(
    () =>
      reservations.filter(r =>
        r.reservationStatus === 'EnCours' ||
        r.reservationStatus === 'EnAttente'
      ),
    [reservations]
  );
  // Filtre "Passées" = tout le reste
  const past = useMemo(
    () =>
      reservations.filter(r =>
        r.reservationStatus !== 'EnCours' &&
        r.reservationStatus !== 'EnAttente'
      ),
    [reservations]
  );
  const data = tab === 'upcoming' ? upcoming : past;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Chargement…</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: any) => {
    const dateFr = item.deliveryDate && item.deliveryDate !== '0001-01-01T00:00:00'
      ? new Date(item.deliveryDate).toLocaleDateString('fr-FR')
      : '—';
    const address = item.recipientAddress
      ? item.recipientAddress
      : item.startLocation && item.endLocation
        ? `${item.startLocation} → ${item.endLocation}`
        : '—';

    return (
      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
        onPress={() =>
          router.push({
            pathname: '/request-detail/[id]',
            params: { id: String(item.reservationId) },
          })
        }
      >
        <View style={[styles.accentBar, { backgroundColor: tab === 'upcoming' ? PRIMARY : TEXT_SECONDARY }]} />
        <View style={styles.cardBody}>
          <View style={styles.rowTop}>
            <Text style={styles.title}>{item.name || '—'}</Text>
            <Text style={[styles.status, { color: statusColors[item.reservationStatus] || TEXT_SECONDARY }]}>
              {item.reservationStatus || '—'}
            </Text>
          </View>
          <View style={styles.rowBottom}>
            <Text style={styles.date}>{dateFr}</Text>
            <Text style={styles.address} numberOfLines={1}>{address}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={TEXT_SECONDARY} />
      </Pressable>
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.headerText}>Mes demandes</Text>
          <Pressable onPress={() => {/* nouvelle demande */}} style={styles.addBtn}>
            <Ionicons name="add-circle" size={28} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.tabBar}>
          {(['upcoming', 'past'] as const).map(key => (
            <Pressable
              key={key}
              onPress={() => setTab(key)}
              style={[styles.tabItem, tab === key && styles.tabItemActive]}
            >
              <Text style={[styles.tabText, tab === key && styles.tabTextActive]}>
                {key === 'upcoming' ? 'À venir' : 'Passées'}
              </Text>
            </Pressable>
          ))}
        </View>

        <FlatList
          data={data}
          keyExtractor={item => String(item.reservationId)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Aucune demande.</Text>}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BACKGROUND },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: PRIMARY, paddingVertical: 12, paddingHorizontal: 16,
  },
  backBtn: { padding: 4 }, addBtn: { padding: 4 },
  headerText: { color: '#fff', fontSize: 20, fontWeight: '700' },

  tabBar: {
    flexDirection: 'row', marginTop: 16, marginHorizontal: 16,
    backgroundColor: CARD_BG, borderRadius: 8, overflow: 'hidden',
  },
  tabItem: { flex: 1, paddingVertical: 8, alignItems: 'center', backgroundColor: CARD_BG },
  tabItemActive: { backgroundColor: PRIMARY },
  tabText: { fontSize: 14, fontWeight: '600', color: TEXT_SECONDARY },
  tabTextActive: { color: '#fff' },

  list: { padding: 16 },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: CARD_BG,
    borderRadius: 12, marginBottom: 12, elevation: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4,
    overflow: 'hidden',
  },
  pressed: { opacity: 0.6 },
  accentBar: { width: 4, height: '100%' },
  cardBody: { flex: 1, padding: 12 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  title: { fontSize: 16, fontWeight: '600', color: TEXT_PRIMARY },
  status: { fontSize: 14, fontWeight: '600' },
  rowBottom: { flexDirection: 'row', justifyContent: 'space-between' },
  date: { fontSize: 13, color: TEXT_SECONDARY },
  address: { fontSize: 13, color: TEXT_SECONDARY, flex: 1, textAlign: 'right' },
});
