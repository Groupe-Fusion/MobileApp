import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const PRIMARY = '#4A90E2';
const BACKGROUND = '#F5F7FA';
const CARD_BG = '#FFFFFF';
const TEXT_PRIMARY = '#1F2937';
const TEXT_SECONDARY = '#6B7280';
const UNREAD_DOT = '#EF4444';
const SCREEN_WIDTH = Dimensions.get('window').width;


const MESSAGES = [
  { id: '1', title: 'Support Client', excerpt: 'Bonjour, comment pouvons-nous vous aider ?', date: '12/05/2025', unread: true },
  { id: '2', title: 'Notification', excerpt: 'Votre paiement a été reçu.', date: '10/05/2025', unread: false },
  { id: '3', title: 'Promotion', excerpt: 'Profitez de 20% de réduction sur tous nos services jusqu\u2019au 31 mai !', date: '08/05/2025', unread: true },
];

export default function MessagesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.6 }
      ]}
      onPress={() => router.push({ pathname: 'MessageDetail', params: { messageId: item.id } })}
    >
      <View style={styles.leftAccent} />
      <View style={styles.content}>
        <View style={styles.rowTop}>
          <Text style={styles.messageTitle}>{item.title}</Text>
          {item.unread && <View style={styles.unreadDot} />}
          <Text style={styles.messageDate}>{item.date}</Text>
        </View>
        <Text style={styles.messageExcerpt} numberOfLines={2} ellipsizeMode="tail">
          {item.excerpt}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={TEXT_SECONDARY} />
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes Messages</Text>
        <Ionicons name="add" size={24} color={PRIMARY} />
      </View>

      <FlatList
        data={MESSAGES}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.emptyText}>Vous n'avez pas de messages.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: CARD_BG,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: TEXT_PRIMARY,
  },
  list: {
    padding: 16,
  },
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
  leftAccent: {
    width: 4,
    backgroundColor: PRIMARY,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_PRIMARY,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: UNREAD_DOT,
    marginHorizontal: 6,
  },
  messageDate: {
    fontSize: 12,
    color: TEXT_SECONDARY,
  },
  messageExcerpt: {
    fontSize: 14,
    color: TEXT_SECONDARY,
    lineHeight: 20,
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    color: TEXT_SECONDARY,
    fontSize: 16,
  },
});
