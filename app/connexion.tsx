import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useRouter } from 'expo-router';

export const options = {
    headerShown: false,
};

export default function ConnexionScreen() {
    const router = useRouter();

    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>(
        {},
    );
    const [isValid, setIsValid] = useState(false);

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

    const handleSubmit = () => {
        if (!isValid) return;
        // TODO: appeler votre API de connexion
        console.log('Connexion avec :', form);
    };

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.select({ ios: 'padding', android: undefined })}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                {/* Flèche de retour */}
                <Pressable onPress={() => router.back()} style={styles.back}>
                    <Text style={styles.backText}>← Retour</Text>
                </Pressable>

                {/* Titres */}
                <Text style={styles.title}>Content de te revoir</Text>
                <Text style={styles.subtitle}>
                    Connecte-toi pour une expérience optimale
                </Text>

                {/* Email */}
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={form.email}
                    onChangeText={(v) => handleChange('email', v)}
                />
                {errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                )}

                {/* Mot de passe */}
                <TextInput
                    placeholder="Mot de passe"
                    style={styles.input}
                    secureTextEntry
                    value={form.password}
                    onChangeText={(v) => handleChange('password', v)}
                />
                {errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                )}

                {/* Bouton Se connecter */}
                <Pressable
                    style={[styles.button, !isValid && styles.buttonDisabled]}
                    onPress={handleSubmit}
                    disabled={!isValid}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            !isValid && styles.buttonTextDisabled,
                        ]}
                    >
                        Se connecter
                    </Text>
                </Pressable>

                {/* Lien vers inscription */}
                <Text style={styles.footer}>
                    Vous n’avez pas de compte ?{' '}
                    <Text
                        style={styles.link}
                        onPress={() => router.push('/inscription')}
                    >
                        S’inscrire
                    </Text>
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1 },
    container: {
        padding: 20,
        paddingTop: 40,
    },
    back: {
        marginBottom: 20,
        padding: 8,
    },
    backText: {
        fontSize: 16,
        color: '#007AFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#606370',
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonDisabled: {
        backgroundColor: '#aaa',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonTextDisabled: {
        color: '#eee',
    },
    footer: {
        textAlign: 'center',
        color: '#606370',
    },
    link: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
});
