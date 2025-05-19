import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: {},
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Accueil',
                    tabBarIcon: ({ color }) => (
                        <Ionicons size={28} name="home" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="MesDemandesScreen"
                options={{
                    title: 'Mes Demandes',
                    tabBarIcon: ({ color }) => (
                        <Ionicons size={28} name="calendar" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="MesMessagesScreen"
                options={{
                    title: 'Messages',
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            size={28}
                            name="chatbubble-ellipses-outline"
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="ProfilScreen"
                options={{
                    title: 'Profil',
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            size={28}
                            name="person-circle-outline"
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
