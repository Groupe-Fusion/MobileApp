import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export const options = { headerShown: false };

export default function Index() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>quickserve</Text>

            <Pressable onPress={() => router.push('/inscription')}>
                <Text style={styles.buttonText}>Créer un compte</Text>
            </Pressable>

            {/* Bouton temporaire pour accès sans compte */}
            <Pressable style={styles.secondaryButton} onPress={() => router.push('/(tabs)')}>
                <Text style={styles.secondaryButtonText}>
                    Accéder sans compte
                </Text>
            </Pressable>

            <Text style={styles.footer}>
                Vous avez déjà un compte ?{' '}
                <Text
                    onPress={() => router.push('/connexion')}
                    style={styles.link}
                >
                    Se connecter
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    button: {
        width: '100%',
        backgroundColor: '#007AFF',
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
        borderColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    secondaryButtonText: {
        fontWeight: 'bold',
        color: '#007AFF',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        textAlign: 'center',
        color: '#606370',
    },
    link: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
});
