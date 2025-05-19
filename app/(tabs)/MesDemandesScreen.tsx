import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface RequestItem {
    id: string;
    title?: string; // optional, could display request title
}

const DATA = [
    {
        title: 'A venir',
        data: [{ id: 'upcoming1' }],
    },
    {
        title: 'Passées',
        data: [
            { id: 'past1' },
            { id: 'past2' },
            { id: 'past3' },
            { id: 'past4' },
            { id: 'past5' },
        ],
    },
];

export default function MesDemandesScreen({ navigation }: any) {
    const renderRequest = ({ item }: { item: RequestItem }) => (
        <View
            style={[
                styles.card,
                item.id.startsWith('upcoming') && styles.upcomingCard,
            ]}
        >
            {/* TODO: replace with real content */}
        </View>
    );

    const insets = useSafeAreaInsets();

    const renderSectionHeader = ({ section: { title } }: any) => (
        <Text style={styles.sectionHeader}>{title}</Text>
    );

    return (
        <View
            style={{
                ...styles.container,
                marginTop: insets.top,
            }}
        >
            <SectionList
                sections={DATA}
                keyExtractor={(item) => item.id}
                renderItem={renderRequest}
                renderSectionHeader={renderSectionHeader}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    backButton: {
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    list: {},
    sectionHeader: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 16,
        marginBottom: 8,
        color: '#000',
    },
    card: {
        height: 80,
        backgroundColor: '#D0D0D0',
        borderRadius: 12,
        marginBottom: 12,
    },
    upcomingCard: {
        height: 120,
    },
});
