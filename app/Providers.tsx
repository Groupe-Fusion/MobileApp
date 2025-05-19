import React, { useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY = '#007AFF';
const BACKGROUND = '#E6F0F0';
const CARD_BG = '#FFFFFF';
const TEXT_COLOR = '#333';
const ACCENT = '#E6F0F0';

// Sample data
const DATA = [
  { id: '1', name: 'Fast Track', rating: 4.3, reviews: 185, distance: 6.1, price: 8.75, delay: 30 },
  { id: '2', name: 'QuickServe', rating: 4.6, reviews: 328, distance: 5.7, price: 9.99, delay: 30 },
  { id: '3', name: 'City Runners', rating: 4.5, reviews: 287, distance: 4.3, price: 11.25, delay: 60 },
  { id: '4', name: 'Express Delivery Pro', rating: 4.8, reviews: 512, distance: 3.2, price: 12.99, delay: 60 },
];

const SORT_OPTIONS = [
  { key: 'rating', label: 'Note ↓' },
  { key: 'distance', label: 'Distance ↑' },
  { key: 'price', label: 'Prix ↑' },
  { key: 'delay', label: 'Délai ↑' },
];

export default function ProvidersScreen() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState(null);

  // Format delay
  const formatDelay = minutes => {
    if (minutes < 60) return `dans ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    return hours === 1 ? 'dans 1 heure' : `dans ${hours} heures`;
  };

  // Sorting
  const sortedData = [...DATA].sort((a, b) => {
    if (!sortBy) return 0;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'distance') return a.distance - b.distance;
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'delay') return a.delay - b.delay;
    return 0;
  });

  // Render stars
  const renderStars = rating => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    const icons = [];
    for (let i = 0; i < full; i++) {
      icons.push(<Ionicons key={i} name="star" size={14} color="#FFC107" />);
    }
    if (half) icons.push(<Ionicons key="h" name="star-half" size={14} color="#FFC107" />);
    return <View style={styles.stars}>{icons}</View>;
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.rowTop}>
        <Ionicons name="ios-car-sport-outline" size={32} color={PRIMARY} />
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.rowSmall}>
            {renderStars(item.rating)}
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
          </View>
          <View style={styles.rowSmall}>
            <Ionicons name="location-outline" size={14} color={PRIMARY} />
            <Text style={styles.infoText}>{item.distance} km</Text>
          </View>
          <View style={styles.rowSmall}>
            <Ionicons name="pricetag-outline" size={14} color={PRIMARY} />
            <Text style={styles.infoText}>{item.price.toFixed(2)} €</Text>
          </View>
          <View style={styles.rowSmall}>
            <Ionicons name="time-outline" size={14} color={PRIMARY} />
            <Text style={styles.infoText}>{formatDelay(item.delay)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: '/RequestDetail', params: { providerId: item.id } })}>
          <Text style={styles.buttonText}>Sélectionner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSortChips = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
      {SORT_OPTIONS.map(opt => {
        const active = sortBy === opt.key;
        return (
          <TouchableOpacity
            key={opt.key}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => setSortBy(active ? null : opt.key)}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{opt.label}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Sort By */}
      <View style={styles.sortSection}>
        <Text style={styles.sortTitle}>Trier par :</Text>
        {renderSortChips()}
      </View>
      <FlatList
        data={sortedData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BACKGROUND },
  list: { padding: 20, paddingBottom: 40 },
  sortSection: { padding: 12, backgroundColor: CARD_BG, margin: 16, borderRadius: 12, elevation: 2 },
  sortTitle: { fontSize: 16, fontWeight: '700', color: TEXT_COLOR, marginBottom: 8 },
  chipContainer: { flexDirection: 'row' },
  chip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, backgroundColor: ACCENT, marginRight: 8 },
  chipActive: { backgroundColor: PRIMARY },
  chipText: { fontSize: 14, color: TEXT_COLOR },
  chipTextActive: { color: '#fff' },
  card: { backgroundColor: CARD_BG, borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: PRIMARY, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  rowTop: { flexDirection: 'row', alignItems: 'center' },
  details: { flex: 1, marginLeft: 12 },
  name: { fontSize: 18, fontWeight: '700', color: TEXT_COLOR },
  rowSmall: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  stars: { flexDirection: 'row' },
  ratingText: { fontSize: 14, fontWeight: '600', color: TEXT_COLOR, marginLeft: 6 },
  infoText: { fontSize: 12, color: TEXT_COLOR, marginLeft: 4 },
  button: { backgroundColor: PRIMARY, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  buttonText: { color: CARD_BG, fontWeight: '700', fontSize: 14 },
});