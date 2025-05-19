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

const PRIMARY = '#007AFF';
const CARD = '#FFFFFF';
const BACKGROUND = '#F0F8FF';

export default function DeliveryScreen() {
    const [isNow, setIsNow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [tab, setTab] = useState<'reservation' | 'providers'>('reservation');

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

                {/* Tabs */}
                <Animated.View
                    style={styles.tabs}
                    entering={SlideInUp.delay(100)}
                >
                    {['reservation', 'providers'].map((key) => {
                        const selected = tab === key;
                        return (
                            <Pressable
                                key={key}
                                style={[
                                    styles.tab,
                                    selected && styles.tabSelected,
                                ]}
                                onPress={() => setTab(key as any)}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        selected && {
                                            color: CARD,
                                            fontWeight: '600',
                                        },
                                    ]}
                                >
                                    {key === 'reservation'
                                        ? 'Réservation'
                                        : 'Prestataires'}
                                </Text>
                            </Pressable>
                        );
                    })}
                </Animated.View>

                {/* Form */}
                <Animated.View
                    style={styles.form}
                    entering={SlideInUp.delay(200)}
                >
                    {[
                        {
                            icon: 'location-outline',
                            label: 'Départ',
                            placeholder: 'Lieu de départ',
                        },
                        {
                            icon: 'location-outline',
                            label: 'Destination',
                            placeholder: "Lieu d'arrivée",
                        },
                    ].map(({ icon, label, placeholder }) => (
                        <View key={label} style={styles.field}>
                            <Text style={styles.label}>{label}</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons
                                    name={icon}
                                    size={20}
                                    color="#888"
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    placeholder={placeholder}
                                    style={styles.input}
                                />
                            </View>
                        </View>
                    ))}

                    <View style={[styles.row, { marginTop: 8 }]}>
                        {[
                            {
                                icon: 'cube-outline',
                                label: 'Dimension',
                                placeholder: 'Petit/Moyen...',
                            },
                            {
                                icon: 'swap-vertical-outline',
                                label: 'Poids',
                                placeholder: 'kg',
                            },
                        ].map(({ icon, label, placeholder }) => (
                            <View key={label} style={styles.flexField}>
                                <Text style={styles.label}>{label}</Text>
                                <View style={styles.inputWrapper}>
                                    <Ionicons
                                        name={icon}
                                        size={20}
                                        color="#888"
                                        style={styles.inputIcon}
                                    />
                                    <TextInput
                                        placeholder={placeholder}
                                        style={styles.input}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={styles.switchRow}>
                        <Text style={styles.label}>Maintenant ?</Text>
                        <Switch
                            value={isNow}
                            onValueChange={setIsNow}
                            trackColor={{ true: PRIMARY }}
                        />
                    </View>

                    {!isNow && (
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
                                {date.toLocaleDateString()}{' '}
                                {date.toLocaleTimeString().slice(0, 5)}
                            </Text>
                        </Pressable>
                    )}

                    {showPicker && (
                        <DateTimePicker
                            value={date}
                            mode="datetime"
                            display="default"
                            onChange={onChangeDate}
                            minimumDate={new Date()}
                        />
                    )}

                    <Pressable
                        style={styles.ctaButton}
                        onPress={() => {
                            /* naviguer */
                        }}
                    >
                        <Text style={styles.ctaText}>Voir 42 résultats</Text>
                        <Ionicons
                            name="chevron-forward-outline"
                            size={20}
                            color={CARD}
                        />
                    </Pressable>
                </Animated.View>
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
    tabs: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: PRIMARY,
        marginHorizontal: 4,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    tabSelected: {
        backgroundColor: PRIMARY,
    },
    tabText: {
        color: PRIMARY,
        fontWeight: '500',
    },
    form: {
        backgroundColor: CARD,
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 4,
    },
    field: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#444',
        marginBottom: 6,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        borderRadius: 8,
    },
    inputIcon: {
        paddingHorizontal: 12,
    },
    input: {
        flex: 1,
        height: 42,
        paddingVertical: 0,
        paddingHorizontal: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    flexField: {
        flex: 1,
        marginRight: 8,
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 16,
    },
    dateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: PRIMARY,
        borderRadius: 8,
        marginBottom: 20,
    },
    dateText: {
        marginLeft: 8,
        color: PRIMARY,
        fontSize: 16,
    },
    ctaButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: PRIMARY,
        paddingVertical: 14,
        borderRadius: 8,
    },
    ctaText: {
        color: CARD,
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    },
});
