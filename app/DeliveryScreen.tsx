import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Switch,
  Platform,
} from 'react-native';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const PRIMARY = '#007AFF';
const CARD = '#FFFFFF';
const BACKGROUND = '#F0F8FF';
const LABEL_COLOR = '#444';

export default function DeliveryScreen() {
  // Destinataire
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // Détails colis
  const [packageType, setPackageType] = useState<'Petit'|'Moyen'|'Grand'>('Petit');
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [fragile, setFragile] = useState(false);

  // Livraison
  const [isNow, setIsNow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [timeSlot, setTimeSlot] = useState<'any'|'morning'|'afternoon'|'evening'>('any');

  // Options payantes
  const [insurance, setInsurance] = useState(false);
  const [signature, setSignature] = useState(false);

  // Instructions
  const [instructions, setInstructions] = useState('');

  // Budget
  const [minPrice, setMinPrice] = useState(5);
  const [maxPrice, setMaxPrice] = useState(50);

  const onChangeDate = (_: any, selected?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selected) setDate(selected);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.ScrollView
        contentContainerStyle={styles.container}
        entering={FadeIn.duration(400)}
      >
        <Text style={styles.title}>Livraison Express</Text>

        {/* Informations destinataire */}
        <Animated.View style={styles.section} entering={SlideInUp.delay(100)}>
          <Text style={styles.sectionTitle}>Informations destinataire</Text>

          <View style={styles.fieldRow}>
            <View style={styles.flexField}>
              <Text style={styles.label}>Nom complet</Text>
              <TextInput
                style={styles.input}
                placeholder="Nom complet"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
            <View style={styles.flexField}>
              <Text style={styles.label}>Téléphone</Text>
              <TextInput
                style={styles.input}
                placeholder="Téléphone"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Adresse</Text>
            <TextInput
              style={styles.input}
              placeholder="Adresse"
              value={street}
              onChangeText={setStreet}
            />
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.flexField}>
              <Text style={styles.label}>Ville</Text>
              <TextInput
                style={styles.input}
                placeholder="Ville"
                value={city}
                onChangeText={setCity}
              />
            </View>
            <View style={styles.flexField}>
              <Text style={styles.label}>Code postal</Text>
              <TextInput
                style={styles.input}
                placeholder="Code postal"
                keyboardType="numeric"
                value={postalCode}
                onChangeText={setPostalCode}
              />
            </View>
          </View>
        </Animated.View>

        {/* Détails du colis */}
        <Animated.View style={styles.section} entering={SlideInUp.delay(150)}>
          <Text style={styles.sectionTitle}>Détails du colis</Text>

          <View style={styles.fieldRow}>
            <View style={styles.flexField}>
              <Text style={styles.label}>Type de colis</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={packageType}
                  onValueChange={setPackageType}
                  style={styles.picker}
                >
                  <Picker.Item label="Petit (max 2kg)" value="Petit" />
                  <Picker.Item label="Moyen (2–5kg)" value="Moyen" />
                  <Picker.Item label="Grand (5–10kg)" value="Grand" />
                </Picker>
              </View>
            </View>
            <View style={styles.flexField}>
              <Text style={styles.label}>Poids (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="kg"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
              />
            </View>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.flexField}>
              <Text style={styles.label}>Dimensions (L×l×H cm)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 30×20×15"
                value={dimensions}
                onChangeText={setDimensions}
              />
            </View>
            <View style={[styles.flexField, styles.switchField]}
            >
              <Text style={styles.label}>Contenu fragile</Text>
              <Switch
                value={fragile}
                onValueChange={setFragile}
                trackColor={{ true: PRIMARY }}
              />
            </View>
          </View>
        </Animated.View>

        {/* Options de livraison */}
        <Animated.View style={styles.section} entering={SlideInUp.delay(200)}>
          <Text style={styles.sectionTitle}>Options de livraison</Text>

          <View style={styles.switchRow}>
            <Text style={styles.label}>Livraison immédiate</Text>
            <Switch
              value={isNow}
              onValueChange={setIsNow}
              trackColor={{ true: PRIMARY }}
            />
          </View>

          {!isNow && (
            <>
              <Pressable
                onPress={() => setShowPicker(true)}
                style={styles.dateButton}
              >
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={PRIMARY}
                />
                <Text style={styles.dateText}>
                  {date.toLocaleDateString()} {date.toLocaleTimeString().slice(0, 5)}
                </Text>
              </Pressable>
              {showPicker && (
                <DateTimePicker
                  value={date}
                  mode="datetime"
                  display="default"
                  onChange={onChangeDate}
                  minimumDate={new Date()}
                />
              )}

              <View style={styles.field}>
                <Text style={styles.label}>Créneau horaire</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={timeSlot}
                    onValueChange={setTimeSlot}
                    style={styles.picker}
                  >
                    <Picker.Item label="Pas de préférence" value="any" />
                    <Picker.Item label="Matin" value="morning" />
                    <Picker.Item label="Après-midi" value="afternoon" />
                    <Picker.Item label="Soir" value="evening" />
                  </Picker>
                </View>
              </View>
            </>
          )}

          <View style={styles.switchRow}>
            <Text style={styles.label}>Assurance colis (+5€)</Text>
            <Switch
              value={insurance}
              onValueChange={setInsurance}
              trackColor={{ true: PRIMARY }}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.label}>Signature à la livraison (+2)</Text>
            <Switch
              value={signature}
              onValueChange={setSignature}
              trackColor={{ true: PRIMARY }}
            />
          </View>
        </Animated.View>

        {/* Instructions spéciales */}
        <Animated.View style={styles.section} entering={SlideInUp.delay(250)}>
          <Text style={styles.sectionTitle}>Instructions spéciales</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Informations supplémentaires pour le livreur..."
            multiline
            numberOfLines={4}
            value={instructions}
            onChangeText={setInstructions}
          />
        </Animated.View>

        {/* Budget */}
        <Animated.View style={styles.section} entering={SlideInUp.delay(300)}>
          <Text style={styles.sectionTitle}>Budget (€)</Text>
          <View style={styles.fieldRow}>
            <View style={styles.flexField}>
              <Text style={styles.label}>Prix minimum</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                keyboardType="numeric"
                value={String(minPrice)}
                onChangeText={(t) => setMinPrice(Number(t) || 0)}
              />
            </View>
            <View style={styles.flexField}>
              <Text style={styles.label}>Prix maximum</Text>
              <TextInput
                style={styles.input}
                placeholder="1000"
                keyboardType="numeric"
                value={String(maxPrice)}
                onChangeText={(t) => setMaxPrice(Number(t) || 0)}
              />
            </View>
          </View>
          <View style={styles.sliderRow}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1000}
              step={1}
              value={minPrice}
              onValueChange={setMinPrice}
            />
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1000}
              step={1}
              value={maxPrice}
              onValueChange={setMaxPrice}
            />
          </View>
          <View style={styles.budgetLabels}>
            <Text>0</Text>
            <Text>250</Text>
            <Text>500</Text>
            <Text>750</Text>
            <Text>1000</Text>
          </View>
        </Animated.View>

        {/* Footer actions */}
        <View style={styles.footer}>
          <Pressable style={styles.cancelButton} onPress={() => { /* reset or back */ }}>
            <Text style={styles.cancelText}>Annuler</Text>
          </Pressable>
          <Pressable style={styles.validateButton} onPress={() => { /* submit */ }}>
            <Text style={styles.validateText}>Valider la demande</Text>
          </Pressable>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: PRIMARY,
    marginBottom: 16,
  },
  section: {
    backgroundColor: CARD,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  field: {
    marginBottom: 16,
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 16,
    marginHorizontal: -4,
  },
  flexField: {
    flex: 1,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 14,
    color: LABEL_COLOR,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    height: 42,
    paddingHorizontal: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: PRIMARY,
    borderRadius: 8,
    marginBottom: 16,
  },
  dateText: {
    marginLeft: 8,
    color: PRIMARY,
    fontSize: 16,
  },
  pickerWrapper: {
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
  },
  picker: {
    height: 42,
    width: '100%',
  },
  sliderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 4,
  },
  budgetLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 12,
  },
  cancelText: {
    color: LABEL_COLOR,
    fontSize: 16,
  },
  validateButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: PRIMARY,
  },
  validateText: {
    color: CARD,
    fontSize: 16,
    fontWeight: '600',
  },
});
