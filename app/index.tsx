import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const options = { headerShown: false };

export default function Index() {
    const theme = useTheme();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        logo: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 40,
            color: theme.colors.text,
        },
        button: {
            width: '100%',
            backgroundColor: theme.colors.primary,
            paddingVertical: 15,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 20,
        },
        buttonText: {
            fontWeight: 'bold',
            color: '#fff',
        },
        secondaryButton: {
            width: '100%',
            borderWidth: 1,
            borderColor: theme.colors.primary,
            paddingVertical: 15,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 20,
        },
        secondaryButtonText: {
            fontWeight: 'bold',
            color: theme.colors.primary,
        },
        footer: {
            position: 'absolute',
            bottom: 20,
            width: '100%',
            textAlign: 'center',
            color: '#606370',
        },
        footerText: {
            textAlign: 'center',
            color: theme.colors.text,
        },
        link: {
            color: theme.colors.primary,
            fontWeight: 'bold',
        },
    });

    return (
        <View
            style={{
                ...styles.container,
                marginBottom: insets.bottom,
                marginLeft: insets.left,
                marginRight: insets.right,
                marginTop: insets.top,
            }}
        >
            <Text style={styles.logo}>quickserve</Text>

            {/* Bouton temporaire pour accès sans compte */}
            <Pressable
                style={styles.secondaryButton}
                onPress={() => router.push('/(tabs)')}
            >
                <Text style={styles.secondaryButtonText}>
                    Accéder sans compte
                </Text>
            </Pressable>

            <View style={styles.footer}>
                <Pressable
                    style={styles.button}
                    onPress={() => router.push('/inscription')}
                >
                    <Text style={styles.buttonText}>Créer un compte</Text>
                </Pressable>

                <Text style={styles.footerText}>
                    Vous avez déjà un compte ?{' '}
                    <Text
                        onPress={() => router.push('/connexion')}
                        style={styles.link}
                    >
                        Se connecter
                    </Text>
                </Text>
            </View>
        </View>
    );
}
