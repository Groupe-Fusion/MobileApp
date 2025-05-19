import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Dimensions,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY = '#4A90E2';
const BACKGROUND = '#F2F6FA';
const CARD_BG = '#FFFFFF';
const TEXT_PRIMARY = '#1F2937';
const TEXT_SECONDARY = '#4B5563';
const ACCENT_UPCOMING = '#E0F2FE';
const ACCENT_PAST = '#F3F4F6';
const SCREEN_WIDTH = Dimensions.get('window').width;

const DATA = {
  upcoming: [
    { id: '1', title: 'Livraison', status: "En attente d'envoi", date: '22/05/2025', address: '123 Rue de la Santé, Paris' },
    { id: '2', title: 'Réunion projet', status: 'Accepté', date: '25/05/2025', address: '45 Avenue du Travail, Lyon' },
  ],
  past: [
    { id: '15', title: 'Baby-Sitting', status: 'Terminée', date: '10/04/2025', address: '10 Boulevard des Enfants, Marseille' },
    { id: '16', title: 'Baby-Sitting', status: 'Annulée', date: '15/04/2025', address: '22 Place du Bien-être, Nice' },
    { id: '17', title: 'Livraison', status: 'Terminée', date: '20/04/2025', address: '7 Rue du Commerce, Bordeaux' },
    { id: '18', title: 'Déménagement', status: 'Terminée', date: '01/05/2025', address: '3 Rue de la Socialisation, Toulouse' },
    { id: '19', title: 'Nettoyage Auto', status: 'Terminée', date: '05/05/2025', address: '89 Avenue des Autos, Nantes' },
  ],
};

const statusColors: Record<string, string> = {
  "En attente d'envoi": '#F59E0B',
  Accepté: '#34D399',
  Rejeté: '#EF4444',
  Terminée: '#6B7280',
  Annulée: '#EF4444',
};

export default function MesDemandesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const data = useMemo(() => (tab === 'upcoming' ? DATA.upcoming : DATA.past), [tab]);

  const renderItem = ({ item }: any) => (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={() => router.push({ pathname: '/RequestDetail', params: { id: item.id } })}
    >
      <View style={[styles.accentBar, { backgroundColor: tab === 'upcoming' ? PRIMARY : TEXT_SECONDARY }]} />
      <View style={styles.cardBody}>
        <View style={styles.rowTop}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={[styles.status, { color: statusColors[item.status] || TEXT_SECONDARY }]}>
            {item.status}
          </Text>
        </View>
        <View style={styles.rowBottom}>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.address}>{item.address}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={TEXT_SECONDARY} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>      
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.headerText}>Mes demandes</Text>
          <Pressable onPress={() => {/* new request */}} style={styles.addBtn}>
            <Ionicons name="add-circle" size={28} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.tabBar}>
          {['upcoming', 'past'].map((key) => (
            <Pressable
              key={key}
              onPress={() => setTab(key as any)}
              style={[
                styles.tabItem,
                tab === key && styles.tabItemActive,
              ]}
            >
              <Text style={[
                styles.tabText,
                tab === key && styles.tabTextActive,
              ]}>
                {key === 'upcoming' ? 'À venir' : 'Passées'}
              </Text>
            </Pressable>
          ))}
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BACKGROUND },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backBtn: { padding: 4 },
  addBtn: { padding: 4 },
  headerText: { color: '#fff', fontSize: 20, fontWeight: '700' },
  tabBar: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: CARD_BG,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: CARD_BG,
  },
  tabItemActive: {
    backgroundColor: PRIMARY,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: TEXT_SECONDARY,
  },
  tabTextActive: {
    color: '#fff',
  },
  list: { padding: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_BG,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  pressed: { opacity: 0.6 },
  accentBar: {
    width: 4,
    height: '100%',
  },
  cardBody: { flex: 1, padding: 12 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  title: { fontSize: 16, fontWeight: '600', color: TEXT_PRIMARY },
  status: { fontSize: 14, fontWeight: '600' },
  rowBottom: { flexDirection: 'row', justifyContent: 'space-between' },
  date: { fontSize: 13, color: TEXT_SECONDARY },
  address: { fontSize: 13, color: TEXT_SECONDARY, flex: 1, textAlign: 'right' },
});
