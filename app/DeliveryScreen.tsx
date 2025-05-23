import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import axios from 'axios';
import * as Location from 'expo-location';

const PRIMARY = '#007AFF';
const BACKGROUND = '#E6F0F0';
const SECTION_BG = '#FFFFFF';
const TEXT_COLOR = '#333';
const PLACEHOLDER = '#AAA';

// Input générique
const InputField = React.memo(({
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  multiline,
}: {
  icon: string;
  placeholder: string;
  value: string;
  onChangeText: (t: string) => void;
  keyboardType?: any;
  multiline?: boolean;
}) => (
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
));

// Étape 1: Formulaire
function DeliveryForm({ form, onChange, onContinue, loading }: {
  form: any;
  onChange: (newForm: any) => void;
  onContinue: () => void;
  loading: boolean;
}) {
  const setField = (key: string, value: any) => onChange({ ...form, [key]: value });

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Stack.Screen options={{ title: 'Nouvelle demande' }} />
          <Text style={styles.title}>Livraison Express</Text>

          {/* Destinataire */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Destinataire</Text>
            <InputField icon="person-outline" placeholder="Nom complet" value={form.fullName} onChangeText={(t) => setField('fullName', t)} />
            <InputField icon="call-outline" placeholder="Téléphone" value={form.phone} onChangeText={(t) => setField('phone', t)} keyboardType="phone-pad" />
            <InputField icon="location-outline" placeholder="Rue et numéro" value={form.street} onChangeText={(t) => setField('street', t)} />
            <View style={styles.row}>
              <View style={styles.halfInput}>
                <InputField icon="home-outline" placeholder="Ville" value={form.city} onChangeText={(t) => setField('city', t)} />
              </View>
              <View style={styles.halfInput}>
                <InputField icon="pricetag-outline" placeholder="Code postal" value={form.postalCode} onChangeText={(t) => setField('postalCode', t)} keyboardType="numeric" />
              </View>
            </View>
          </View>

          {/* Colis */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Détails du colis</Text>
            <InputField icon="cube-outline" placeholder="Type de colis" value={form.packageType} onChangeText={(t) => setField('packageType', t)} />
            <View style={styles.row}>
              <View style={styles.halfInput}>
                <InputField icon="barbell-outline" placeholder="Poids (kg)" value={form.weight} onChangeText={(t) => setField('weight', t)} keyboardType="numeric" />
              </View>
              <View style={styles.halfInput}>
                <InputField icon="resize-outline" placeholder="Dimensions (cm)" value={form.dimensions} onChangeText={(t) => setField('dimensions', t)} />
              </View>
            </View>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Fragile</Text>
              <Pressable onPress={() => setField('fragile', !form.fragile)} style={[styles.switchButton, form.fragile && styles.switchOn]}>
                <View style={[styles.switchThumb, form.fragile && styles.thumbOn]} />
              </Pressable>
            </View>
          </View>

          {/* Instructions spéciales */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions spéciales</Text>
            <InputField icon="chatbubble-ellipses-outline" placeholder="Détails pour le livreur..." value={form.specialInstructions} onChangeText={(t) => setField('specialInstructions', t)} multiline />
          </View>

          {/* Boutons */}
          <View style={styles.footer}>
            <Pressable style={styles.cancelButton} onPress={() => onChange({ fullName:'', phone:'', street:'', city:'', postalCode:'', packageType:'', weight:'', dimensions:'', fragile:false, specialInstructions:'' })}>
              <Text style={styles.cancelText}>Annuler</Text>
            </Pressable>
            <Pressable style={[styles.validateButton, loading && { opacity: 0.6 }]} onPress={onContinue} disabled={loading}>
              <Text style={styles.validateText}>{loading ? 'Chargement…' : 'Continuer'}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Étape 2: Prestataires
function ProvidersList({ providers, loading, error, onSelect, onBack }: { providers: any[]; loading: boolean; error?: string | null; onSelect: (prov: any) => void; onBack: () => void; }) {
  if (loading) return <View style={styles.center}><ActivityIndicator size="large"/></View>;
  if (error) return <View style={styles.center}><Text style={{ color: 'red' }}>{error}</Text><Pressable style={styles.button} onPress={onBack}><Text style={styles.buttonText}>Retour</Text></Pressable></View>;

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.rowTop}>
        <Ionicons name="ios-car-sport-outline" size={32} color={PRIMARY} />
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.infoText}>Note : {item.rating.toFixed(1)} ({item.reviews} avis)</Text>
          <Text style={styles.infoText}>Distance : {item.distance} km</Text>
          <Text style={styles.infoText}>Prix : {item.price} €</Text>
        </View>
        <Pressable style={styles.button} onPress={() => onSelect(item)}>
          <Text style={styles.buttonText}>Sélectionner</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: 'Choix du prestataire' }} />
      <FlatList
        data={providers}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

// Wizard principal
export default function DeliveryProviderWizard() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({ fullName: '', phone: '', street: '', city: '', postalCode: '', packageType: '', weight: '', dimensions: '', fragile: false, specialInstructions: '' });
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [userCoords, setUserCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  // Récupère la position utilisateur
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setUserCoords({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      }
    })();
  }, []);

  const onContinue = async () => {
    if (!form.street || !form.city || !form.postalCode) {
      Alert.alert('Veuillez remplir l’adresse complète');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const fakeProviders = [
        { id: 1, name: 'Alpha', rating: 4.5, reviews: 50, distance: 1.2, price: 15, delay: 5 },
        { id: 2, name: 'Beta', rating: 4.2, reviews: 30, distance: 0.8, price: 12, delay: 3 },
        { id: 3, name: 'Gamma', rating: 4.8, reviews: 80, distance: 2.1, price: 18, delay: 7 },
      ];
      await new Promise((r) => setTimeout(r, 300));
      setProviders(fakeProviders);
      setStep(2);
    } catch {
      setError('Erreur chargement prestataires');
    } finally {
      setLoading(false);
    }
  };

  const onSelectProvider = async (provider: any) => {
    if (!userCoords) {
      Alert.alert('Impossible de récupérer votre position');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        userId: 1015,
        name: 'Livraison Express',
        recipientName: form.fullName,
        recipientPhone: form.phone,
        recipientAddress: `${form.street}, ${form.city}`,
        recipientPostalCode: form.postalCode,
        packageType: form.packageType,
        weight: parseFloat(form.weight) || 0,
        dimension: form.dimensions,
        isFragile: form.fragile,
        specialInstructions: form.specialInstructions,
        startLocation: `${userCoords.latitude},${userCoords.longitude}`,
        prestataire: provider.name,
        reservationStatus: 'EnAttente',
        deliveryDate: new Date().toISOString(),
      };
      const res = await axios.post('http://57.128.212.12:8082/api/reservations', payload);
      router.push({ pathname: '/request-detail/[id]', params: { id: String(res.data.reservationId) } });
    } catch {
      Alert.alert('Erreur serveur', 'La réservation a échoué');
    } finally {
      setLoading(false);
    }
  };

  return step === 1 ? (
    <DeliveryForm form={form} onChange={setForm} onContinue={onContinue} loading={loading} />
  ) : (
    <ProvidersList providers={providers} loading={loading} error={error} onSelect={onSelectProvider} onBack={() => setStep(1)} />
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BACKGROUND },
  container: { padding: 20, paddingBottom: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '800', textAlign: 'center', color:PRIMARY, marginVertical:20 },
  section: { backgroundColor: SECTION_BG, borderRadius:16, padding:20, marginBottom:20, shadowColor: PRIMARY, shadowOffset: { width:0, height:4 }, shadowOpacity:0.1, shadowRadius:8, elevation:4 },
  sectionTitle: { fontSize:20, fontWeight:'700', color: TEXT_COLOR, marginBottom:12 },
  inputContainer: { flexDirection:'row', alignItems:'center', backgroundColor:'#F7F9FC', borderRadius:12, marginBottom:16, paddingHorizontal:10 },
  icon: { marginRight:8 },
  input: { flex:1, height:46, fontSize:16, color:TEXT_COLOR, paddingVertical:8 },
  row: { flexDirection:'row', justifyContent:'space-between' },
  halfInput: { flex:1, marginRight:10 },
  switchRow: { flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:10 },
  switchLabel: { fontSize:16, color: TEXT_COLOR },
  switchButton: { width:50, height:28, borderRadius:14, backgroundColor:'#D0D5DD', padding:2 },
  switchOn: { backgroundColor: PRIMARY },
  switchThumb: { width:24, height:24, borderRadius:12, backgroundColor:'#FFF' },
  thumbOn: { transform:[{translateX:22}] },
  footer: { flexDirection:'row', justifyContent:'flex-end', marginTop:10 },
  cancelButton: { paddingVertical:12, paddingHorizontal:24, borderRadius:24, borderWidth:1, borderColor:PRIMARY, marginRight:12 },
  cancelText: { color:PRIMARY, fontSize:16, fontWeight:'600' },
  validateButton: { paddingVertical:12, paddingHorizontal:24, borderRadius:24, backgroundColor:PRIMARY, shadowColor:PRIMARY, shadowOffset:{width:0, height:6}, shadowOpacity:0.2, shadowRadius:10, elevation:6 },
  validateText: { color:SECTION_BG, fontSize:16, fontWeight:'700' },
  list: { padding:16 },
  card: { backgroundColor:SECTION_BG, borderRadius:12, padding:16, marginBottom:12, shadowColor:PRIMARY, shadowOffset:{ width:0, height:1 }, shadowOpacity:0.1, shadowRadius:4, elevation:2 },
  rowTop: { flexDirection:'row', alignItems:'center' },
  details: { flex:1, marginLeft:12 },
  name: { fontSize:18, fontWeight:'700', color:TEXT_COLOR },
  infoText: { fontSize:13, color:TEXT_COLOR, marginTop:4 },
  button: { backgroundColor:PRIMARY, paddingVertical:8, paddingHorizontal:16, borderRadius:20, marginTop:6 },
  buttonText: { color:SECTION_BG, fontWeight:'700' },
});     