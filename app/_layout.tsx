import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
            <SafeAreaView style={{ flex: 1 }}>
                <ThemeProvider
                    value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
                >
                    <Stack
                        initialRouteName="index"
                        screenOptions={{ headerTitleAlign: 'center' }}
                    >
                        <Stack.Screen
                            name="index"
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="inscription"
                            options={{
                                headerShown: true,
                                title: 'Créer un compte',
                            }}
                        />
                        <TouchableOpacity
                            onPress={() =>
                                router.push('/(tabs)')
                            }
                        >
                            <Text>
                                Accéder sans compte
                            </Text>
                        </TouchableOpacity>
                        <Stack.Screen
                            name="connexion"
                            options={{
                                headerShown: true,
                                title: 'Se connecter',
                            }}
                        />

                        <Stack.Screen
                            name="(tabs)"
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="+not-found"
                            options={{ title: 'Page introuvable' }}
                        />
                    </Stack>

                    <StatusBar style="auto" />
                </ThemeProvider>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
