import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface MessageItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
}

const MESSAGES: MessageItem[] = [
  { id: '1', title: 'Support Client', excerpt: 'Bonjour, comment pouvons-nous vous aider ?', date: '12/05/2025' },
  { id: '2', title: 'Notification', excerpt: 'Votre paiement a été reçu.', date: '10/05/2025' },
  { id: '3', title: 'Promotion', excerpt: 'Profitez de 20% de réduction...', date: '08/05/2025' },
];

export default function MesMessages() {
  const renderMessage = ({ item }: { item: MessageItem }) => (
    <TouchableOpacity style={styles.card} onPress={() => {/* naviguer vers le détail */}}>
      <View style={styles.cardHeader}>
        <Text style={styles.messageTitle}>{item.title}</Text>
        <Text style={styles.messageDate}>{item.date}</Text>
      </View>
      <Text style={styles.messageExcerpt}>{item.excerpt}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MESSAGES}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>Aucun message</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  messageDate: {
    fontSize: 12,
    color: '#808080',
  },
  messageExcerpt: {
    fontSize: 14,
    color: '#333333',
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    color: '#808080',
  },
});
