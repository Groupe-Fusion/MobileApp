import { Ionicons } from '@expo/vector-icons';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface MenuItem {
    key: string;
    icon: any;
    label: string;
    onPress?: () => void;
}

const menuItems: MenuItem[] = [
    {
        key: 'history',
        icon: 'hourglass-outline',
        label: 'Historique de mes demandes',
    },
    { key: 'profile', icon: 'person-outline', label: 'Mes infos personnelles' },
    { key: 'locations', icon: 'location-outline', label: 'Lieux enregistrés' },
    { key: 'payments', icon: 'card-outline', label: 'Mes moyens de paiements' },
    { key: 'help', icon: 'bulb-outline', label: 'Aide' },
    { key: 'privacy', icon: 'lock-closed-outline', label: 'Confidentialité' },
];

export default function ProfilScreen() {
    const renderItem = ({ item }: { item: MenuItem }) => (
        <TouchableOpacity style={styles.item} onPress={item.onPress}>
            <Ionicons name={item.icon} size={24} color="#808080" />
            <Text style={styles.itemText}>{item.label}</Text>
        </TouchableOpacity>
    );

    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                ...styles.container,
                marginTop: insets.top,
            }}
        >
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Image
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                        }}
                        source={require('../../assets/images/profil.png')}
                    />
                </View>
                <View style={styles.headerText}>
                    <Text style={styles.title}>Alex</Text>
                    <Text style={styles.subText}>
                        Membre depuis le 03/12/2024
                    </Text>
                </View>
            </View>

            <FlatList
                data={menuItems}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => {
                    /* handle logout */
                }}
            >
                <Text style={styles.logoutButtonText}>Me déconnecter</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#D0D0D0',
        marginRight: 16,
    },
    headerText: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
    },
    subText: {
        marginTop: 4,
        color: '#808080',
        fontSize: 14,
    },
    list: {
        paddingVertical: 8,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    itemText: {
        marginLeft: 12,
        fontSize: 16,
        color: '#000000',
    },
    logoutButton: {
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 16,
    },
    logoutButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
    },
});
