import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Empêche le splash automatique avant que les assets soient chargés
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <ThemeProvider
                value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            >
                <Stack
                    // tu peux préciser l'écran d'entrée si tu veux
                    initialRouteName="index"
                    screenOptions={{ headerTitleAlign: 'center' }}
                >
                    {/* 1. Welcome (app/index.tsx) */}
                    <Stack.Screen
                        name="index"
                        options={{ headerShown: false }}
                    />

                    {/* 2. Auth */}
                    <Stack.Screen
                        name="inscription"
                        options={{
                            headerShown: true,
                            title: 'Créer un compte',
                        }}
                    />

                    <Stack.Screen
                        name="connexion"
                        options={{
                            headerShown: true,
                            title: 'Se connecter',
                        }}
                    />

                    {/* 3. Ton flow principal après login */}
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />

                    {/* 4. Page 404 */}
                    <Stack.Screen
                        name="+not-found"
                        options={{ title: 'Page introuvable' }}
                    />
                </Stack>

                <StatusBar style="auto" />
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
