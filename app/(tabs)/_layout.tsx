import React from 'react';
import { View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import SafeScreen from '@/assets/components/SafeScreen';
import { COLORS } from '@/constants/colors';
import { AddItemProvider } from '@/context/AddItemContext'; // ✅ import the provider

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeScreen>
      {/* ✅ Wrap all tabs with the provider */}
      <AddItemProvider>
        <Tabs
          screenOptions={{        
            headerShown: false, 
            tabBarLabelPosition: "below-icon", 
          }}
        >      
          <Tabs.Screen
            name="index"
            options={{
              tabBarLabel: "Home",
              tabBarActiveTintColor: COLORS.primary,
              tabBarInactiveTintColor: COLORS.placeHolderText,
              tabBarIcon: ({ color, size, focused }) => (
                <Octicons
                  name={focused ? "home-fill" : "home"}
                  size={size}
                  color={focused ? COLORS.primary : COLORS.placeHolderText}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="add-item"
            options={{
              tabBarLabel: "",
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="add-circle"
                  size={size + 20}
                  color={COLORS.add}
                />
              ),
              tabBarLabelStyle: { display: "none" },
            }}
          />
          
          <Tabs.Screen
            name="profile"
            options={{
              tabBarLabel: "Profile",
              tabBarActiveTintColor: COLORS.primary,
              tabBarInactiveTintColor: COLORS.placeHolderText,
              tabBarIcon: ({ color, size, focused }) => (
                <Octicons
                  name={focused ? "person-fill" : "person"}
                  size={size}
                  color={focused ? COLORS.primary : COLORS.placeHolderText}
                />
              ),
            }}
          />
        </Tabs>
      </AddItemProvider>
    </SafeScreen>
  );
}
