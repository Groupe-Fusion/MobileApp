import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const PRIMARY = '#4A90E2';
const ACCENT = '#357ABD';
const BACKGROUND = '#F0F4F8';
const CARD_BG = '#FFFFFF';
const TEXT_PRIMARY = '#2D3A4B';
const TEXT_SECONDARY = '#5B6D8E';
const SCREEN_WIDTH = Dimensions.get('window').width;

const MENU = [
  { key: 'history', icon: 'time-outline', label: 'Historique', action: 'History' },
  { key: 'profile', icon: 'person-outline', label: 'Mon profil', action: 'Settings' },
  { key: 'locations', icon: 'location-outline', label: 'Lieux', action: 'Locations' },
  { key: 'payments', icon: 'card-outline', label: 'Paiements', action: 'Payments' },
  { key: 'help', icon: 'help-circle-outline', label: 'Aide', action: 'Help' },
  { key: 'privacy', icon: 'lock-closed-outline', label: 'Confidentialité', action: 'Privacy' },
  // Logout as menu item
  { key: 'logout', icon: 'exit-outline', label: 'Déconnexion', action: 'Logout', isDestructive: true },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handlePress = item => {
    if (item.action === 'Logout') {
      // logout logic
    } else {
      router.push(item.action);
    }
  };

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.menuCard,
        item.isDestructive && { backgroundColor: '#E6F7FF' },
      ]}
      activeOpacity={0.7}
      onPress={() => handlePress(item)}
    >
      <View style={styles.menuIcon}>
        <Ionicons
          name={item.icon}
          size={24}
          color={item.isDestructive ? '#D0021B' : ACCENT}
        />
      </View>
      <Text
        style={[
          styles.menuLabel,
          item.isDestructive && { color: '#D0021B' },
        ]}
      >
        {item.label}
      </Text>
      {!item.isDestructive && (
        <Ionicons name="chevron-forward" size={20} color={TEXT_SECONDARY} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>      
      {/* Header */}
      <LinearGradient
        colors={[PRIMARY, ACCENT]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require('../../assets/images/profil.png')}
              style={styles.avatar}
            />
          </View>
          <View>
            <Text style={styles.name}>Alex Dupont</Text>
            <Text style={styles.joined}>Membre depuis 03/12/2024</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Menu list including logout */}
      <FlatList
        data={MENU}
        keyExtractor={item => item.key}
        renderItem={renderMenuItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.menuContainer}
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
    height: SCREEN_WIDTH * 0.4,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: CARD_BG,
    overflow: 'hidden',
    marginRight: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: CARD_BG,
  },
  joined: {
    fontSize: 14,
    color: CARD_BG,
    marginTop: 4,
    opacity: 0.8,
  },
  menuContainer: {
    padding: 16,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_BG,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: ACCENT + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_PRIMARY,
  },
  separator: {
    height: 12,
  },
});
