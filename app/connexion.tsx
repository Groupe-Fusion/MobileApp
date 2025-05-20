import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const options = {
  headerShown: false,
};

const API_URL = 'http://57.128.212.12:8081'; // Remplacez par votre URL d'API

export default function ConnexionScreen() {
  const router = useRouter();
  const theme = useTheme();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] =
    useState<{ email?: string; password?: string }>({});
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const newErrors: typeof errors = {};
    if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = 'Email invalide';
    if (form.password.length < 6)
      newErrors.password = 'Minimum 6 caractères';
    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [form]);

  const handleChange = (key: 'email' | 'password', value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    setApiError(null);
    try {
      const response = await fetch(`${API_URL}/api/User/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      if (response.ok) {
        const { token, user } = await response.json();
        // Stockez le token si nécessaire
        await AsyncStorage.setItem('authToken', token);
        // Naviguez vers l'écran protégé
        router.push('/home');
      } else {
        const errorData = await response.json();
        setApiError(
          errorData.message || 'Email ou mot de passe invalide'
        );
      }
    } catch (e) {
      setApiError('Erreur réseau, veuillez réessayer');
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      paddingTop: 40,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 4,
      textAlign: 'center',
      color: theme.colors.text,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: 'center',
      color: theme.colors.text,
    },
    input: {
      height: 48,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 12,
      marginBottom: 10,
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
    },
    error: {
      color: theme.colors.notification,
      marginBottom: 10,
    },
    apiError: {
      color: 'red',
      textAlign: 'center',
      marginVertical: 10,
    },
    button: {
      backgroundColor: theme.colors.primary,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 20,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    buttonDisabled: {
      backgroundColor: '#aaa',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      marginLeft: 8,
    },
    footer: {
      textAlign: 'center',
      color: '#606370',
    },
    link: {
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
  });

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Content de te revoir</Text>
      <Text style={styles.subtitle}>
        Connecte-toi pour une expérience optimale
      </Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(v) => handleChange('email', v)}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput
        placeholder="Mot de passe"
        style={styles.input}
        secureTextEntry
        value={form.password}
        onChangeText={(v) => handleChange('password', v)}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      {apiError && <Text style={styles.apiError}>{apiError}</Text>}

      <Pressable
        style={[styles.button, (!isValid || loading) && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!isValid || loading}
      >
        {loading && <ActivityIndicator />}
        <Text style={styles.buttonText}>Se connecter</Text>
      </Pressable>

      <Text style={styles.footer}>
        Vous n’avez pas de compte ?{' '}
        <Text style={styles.link} onPress={() => router.push('/inscription')}>
          S’inscrire
        </Text>
      </Text>
    </ScrollView>
  );
}
