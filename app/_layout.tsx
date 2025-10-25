import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SignUpProvider } from '@/context/SignUpContext'; // 👈 import provider

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SignUpProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Stack screenOptions={{ headerShown: false }}>
          {children}
        </Stack>
      </SignUpProvider>
    </SafeAreaProvider>
  );
}
