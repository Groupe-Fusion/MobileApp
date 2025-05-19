import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const PRIMARY = '#007AFF';
const BACKGROUND = '#E6F0FF';
const SECTION_BG = '#FFFFFF';
const TEXT_COLOR = '#333';
const PLACEHOLDER = '#AAA';

export default function DeliveryScreen() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [packageType, setPackageType] = useState('');
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [fragile, setFragile] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleSubmit = () => {
    router.push('/Providers', { fullName, phone, street, city, postalCode, packageType, weight, dimensions, fragile, specialInstructions });
  };

  const InputField = ({ icon, placeholder, value, onChangeText, keyboardType, multiline }) => (
    <View style={styles.inputContainer}>
      <Ionicons name={icon} size={20} color={PRIMARY} style={styles.icon} />
      <TextInput
        style={[styles.input, multiline && { height: 80, textAlignVertical: 'top' }]}
        placeholder={placeholder}
        placeholderTextColor={PLACEHOLDER}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Livraison Express</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destinataire</Text>
          <InputField icon="person-outline" placeholder="Nom complet" value={fullName} onChangeText={setFullName} />
          <InputField icon="call-outline" placeholder="Téléphone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <InputField icon="location-outline" placeholder="Adresse" value={street} onChangeText={setStreet} />
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <InputField icon="home-outline" placeholder="Ville" value={city} onChangeText={setCity} />
            </View>
            <View style={styles.halfInput}>
              <InputField icon="pricetag-outline" placeholder="Code postal" value={postalCode} onChangeText={setPostalCode} keyboardType="numeric" />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Détails du colis</Text>
          <InputField icon="cube-outline" placeholder="Type de colis (ex: Boîte)" value={packageType} onChangeText={setPackageType} />
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <InputField icon="barbell-outline" placeholder="Poids (kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" />
            </View>
            <View style={styles.halfInput}>  
              <InputField icon="resize-outline" placeholder="Dimensions (cm)" value={dimensions} onChangeText={setDimensions} />
            </View>
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Fragile</Text>
            <Pressable onPress={() => setFragile(prev => !prev)} style={[styles.switchButton, fragile && styles.switchOn]}>
              <View style={[styles.switchThumb, fragile && styles.thumbOn]} />
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions spéciales</Text>
          <InputField icon="chatbubble-ellipses-outline" placeholder="Détails pour le livreur..." value={specialInstructions} onChangeText={setSpecialInstructions} multiline />
        </View>

        <View style={styles.footer}>
          <Pressable style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelText}>Annuler</Text>
          </Pressable>
          <Pressable style={styles.validateButton} onPress={handleSubmit}>
            <Text style={styles.validateText}>Envoyer</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BACKGROUND },
  container: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '800', textAlign: 'center', color: PRIMARY, marginVertical: 20 },
  section: { backgroundColor: SECTION_BG, borderRadius: 16, padding: 20, marginBottom: 20, shadowColor: PRIMARY, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: TEXT_COLOR, marginBottom: 12 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F7F9FC', borderRadius: 12, marginBottom: 16, paddingHorizontal: 10 },
  icon: { marginRight: 8 },
  input: { flex: 1, height: 46, fontSize: 16, color: TEXT_COLOR, paddingVertical: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInput: { flex: 1, marginRight: 10 },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  switchLabel: { fontSize: 16, color: TEXT_COLOR },
  switchButton: { width: 50, height: 28, borderRadius: 14, backgroundColor: '#D0D5DD', padding: 2 },
  switchOn: { backgroundColor: PRIMARY },
  switchThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#FFF', transform: [{ translateX: 0 }] },
  thumbOn: { transform: [{ translateX: 22 }] },
  footer: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 },
  cancelButton: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 24, borderWidth: 1, borderColor: PRIMARY, marginRight: 12 },
  cancelText: { color: PRIMARY, fontSize: 16, fontWeight: '600' },
  validateButton: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 24, backgroundColor: PRIMARY, shadowColor: PRIMARY, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 6 },
  validateText: { color: SECTION_BG, fontSize: 16, fontWeight: '700' },
});
