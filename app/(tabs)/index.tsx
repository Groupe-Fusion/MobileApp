import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Pressable,
    StyleSheet,
    Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY = '#007AFF';
const BACKGROUND = '#F0F8FF';
const CARD = '#FFFFFF';

const categories = [
    {
        label: 'Livraison Express',
        path: 'DeliveryScreen',
        icon: 'bicycle-outline',
    },
    { label: 'Déménagement', path: 'DemecoScreen', icon: 'cube-outline' },
    { label: 'Nettoyage Auto', path: 'CarWashScreen', icon: 'water-outline' },
    {
        label: 'Dépannage Auto',
        path: 'CarRepairScreen',
        icon: 'construct-outline',
    },
    {
        label: 'Garde d’enfants',
        path: 'BabySittingScreen',
        icon: 'child-outline',
    },
];

export default function HomeScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <Animated.ScrollView
                contentContainerStyle={styles.contentContainer}
                entering={FadeIn.duration(400)}
            >
                {/* Image en haut */}
                <Animated.Image
                    source={require('../../assets/images/header.jpg')}
                    style={styles.headerImage}
                    entering={FadeIn.duration(600).delay(100)}
                />

                <Animated.View
                    style={styles.header}
                    entering={SlideInDown.duration(500).delay(200)}
                >
                    <Text style={styles.welcomeText}>Bonjour, Alex</Text>
                    <Text style={styles.subtitleText}>
                        De quoi avez-vous besoin ?
                    </Text>
                </Animated.View>

                <Animated.View
                    style={styles.profileCard}
                    entering={FadeIn.delay(300).duration(500)}
                >
                    <Text style={styles.profileTitle}>
                        Complétez votre profil
                    </Text>
                    <Text style={styles.profileSubtitle}>
                        Pour une meilleure interaction et une expérience
                        personnalisée
                    </Text>
                </Animated.View>

                <View style={styles.categoriesSection}>
                    <Text style={styles.categoriesTitle}>Catégories</Text>

                    {categories.map((cat, i) => (
                        <Animated.View
                            key={cat.label}
                            style={styles.categoryCard}
                            entering={FadeIn.delay(400 + i * 100).duration(400)}
                        >
                            <Pressable
                                style={styles.cardContent}
                                onPress={() => router.push(cat.path as any)}
                            >
                                <View style={styles.iconWrapper}>
                                    <Ionicons
                                        name={cat.icon}
                                        size={20}
                                        color="#fff"
                                    />
                                </View>
                                <Text style={styles.categoryText}>
                                    {cat.label}
                                </Text>
                                <Ionicons
                                    name="chevron-forward-outline"
                                    size={20}
                                    color="#999"
                                />
                            </Pressable>
                        </Animated.View>
                    ))}
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
    contentContainer: {
        padding: 16,
        paddingBottom: 32,
    },
    headerImage: {
        width: '100%',
        height: 180,
        borderRadius: 12,
        marginBottom: 16,
        alignSelf: 'center',
    },
    header: {
        marginBottom: 24,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: '700',
        color: PRIMARY,
        marginBottom: 4,
    },
    subtitleText: {
        fontSize: 16,
        color: '#606370',
    },
    profileCard: {
        backgroundColor: CARD,
        padding: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 24,
    },
    profileTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 6,
        color: PRIMARY,
    },
    profileSubtitle: {
        fontSize: 14,
        color: '#606370',
    },
    categoriesSection: {
        marginBottom: 16,
    },
    categoriesTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: PRIMARY,
        marginBottom: 12,
    },
    categoryCard: {
        marginBottom: 12,
        borderRadius: 12,
        backgroundColor: CARD,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    iconWrapper: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    categoryText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: '#303030',
    },
});
