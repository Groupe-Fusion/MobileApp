// app/inscription.tsx
import { RouteProp, useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Checkbox from 'expo-checkbox';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type RootStackParamList = {
    Inscription: undefined;
    Connexion: undefined;
};

type InscriptionScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Inscription'
>;
type InscriptionScreenRouteProp = RouteProp<RootStackParamList, 'Inscription'>;

interface Props {
    navigation: InscriptionScreenNavigationProp;
    route: InscriptionScreenRouteProp;
}

interface FormState {
    nom: string;
    prenom: string;
    email: string;
    tel: string;
    password: string;
    confirmPassword: string;
    acceptConditions: boolean;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

export default function InscriptionScreen({ navigation }: Props) {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    const [form, setForm] = useState<FormState>({
        nom: '',
        prenom: '',
        email: '',
        tel: '',
        password: '',
        confirmPassword: '',
        acceptConditions: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const newErrors: FormErrors = {};
        if (!form.nom.trim()) newErrors.nom = 'Le nom est requis';
        if (!form.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
        if (!/\S+@\S+\.\S+/.test(form.email))
            newErrors.email = 'Email invalide';
        if (!/^\+?\d{6,15}$/.test(form.tel))
            newErrors.tel = 'Téléphone invalide';
        if (form.password.length < 6)
            newErrors.password = 'Minimum 6 caractères';
        if (form.password !== form.confirmPassword)
            newErrors.confirmPassword =
                'Les mots de passe ne correspondent pas';
        if (!form.acceptConditions)
            newErrors.acceptConditions = 'Vous devez accepter les conditions';

        setErrors(newErrors);
        setIsValid(Object.keys(newErrors).length === 0);
    }, [form]);

    const handleChange = <K extends keyof FormState>(
        key: K,
        value: FormState[K],
    ) => {
        setForm((prev) => ({ ...prev, [key]: value }) as FormState);
    };

    const handleSubmit = () => {
        if (!isValid) return;
        console.log('Envoi des données :', form);
        router.push('/connexion');
    };

    const styles = StyleSheet.create({
        container: {
            padding: 20,
        },
        title: {
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 8,
            color: theme.colors.text,
        },
        subtitle: { fontSize: 16, marginBottom: 20, color: theme.colors.text },
        input: {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 6,
            padding: 10,
            marginBottom: 10,
            color: theme.colors.text,
        },
        error: { color: theme.colors.notification, marginBottom: 10 },
        checkboxContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
        },
        checkboxLabel: { marginLeft: 8, flex: 1 },
        button: {
            backgroundColor: theme.colors.primary,
            padding: 15,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 20,
        },
        buttonDisabled: { backgroundColor: '#aaa' },
        buttonText: { color: '#fff', fontWeight: 'bold' },
        footer: {
            marginTop: 20,
            textAlign: 'center',
            color: theme.colors.text,
        },
        link: { color: theme.colors.primary, fontWeight: 'bold' },
    });

    return (
        <ScrollView
            contentContainerStyle={{
                ...styles.container,
                paddingBottom: insets.bottom,
            }}
            keyboardShouldPersistTaps="handled"
        >
            <Text style={styles.title}>Bienvenue chez QuickServe</Text>
            <Text style={styles.subtitle}>
                Créez votre compte pour une expérience optimale
            </Text>

            <TextInput
                placeholder="Nom"
                style={styles.input}
                onChangeText={(v) => handleChange('nom', v)}
                value={form.nom}
            />
            {!!errors.nom && <Text style={styles.error}>{errors.nom}</Text>}

            <TextInput
                placeholder="Prénom"
                style={styles.input}
                onChangeText={(v) => handleChange('prenom', v)}
                value={form.prenom}
            />
            {!!errors.prenom && (
                <Text style={styles.error}>{errors.prenom}</Text>
            )}

            <TextInput
                placeholder="Email"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(v) => handleChange('email', v)}
                value={form.email}
            />
            {!!errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
                placeholder="Téléphone"
                style={styles.input}
                keyboardType="phone-pad"
                onChangeText={(v) => handleChange('tel', v)}
                value={form.tel}
            />
            {!!errors.tel && <Text style={styles.error}>{errors.tel}</Text>}

            <TextInput
                placeholder="Mot de passe"
                style={styles.input}
                secureTextEntry
                onChangeText={(v) => handleChange('password', v)}
                value={form.password}
            />
            {!!errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
            )}

            <TextInput
                placeholder="Confirmation du mot de passe"
                style={styles.input}
                secureTextEntry
                onChangeText={(v) => handleChange('confirmPassword', v)}
                value={form.confirmPassword}
            />
            {!!errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}

            <View style={styles.checkboxContainer}>
                <Checkbox
                    value={form.acceptConditions}
                    onValueChange={(v) => handleChange('acceptConditions', v)}
                />
                <Text style={styles.checkboxLabel}>
                    J’accepte les conditions d’utilisation et la politique de
                    confidentialité
                </Text>
            </View>
            {!!errors.acceptConditions && (
                <Text style={styles.error}>{errors.acceptConditions}</Text>
            )}

            <Pressable
                style={[styles.button, !isValid && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={!isValid}
            >
                <Text style={styles.buttonText}>S’inscrire</Text>
            </Pressable>

            <Text style={styles.footer}>
                Vous avez déjà un compte ?{' '}
                <Text
                    style={styles.link}
                    onPress={() => router.push('/connexion')}
                >
                    Se connecter
                </Text>
            </Text>
        </ScrollView>
    );
}
