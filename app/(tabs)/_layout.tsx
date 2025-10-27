import React from 'react';
import { View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import { Ionicons, Octicons } from '@expo/vector-icons';
import SafeScreen from '@/assets/components/SafeScreen';
import { COLORS } from '@/constants/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // ✅ import
import { SignUpProvider } from '@/context/SignUpContext';

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
    // ✅ Wrap everything in GestureHandlerRootView
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeScreen>
          
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
                tabBarIcon: ({ size, focused }) => (
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
                tabBarIcon: ({ size }) => (
                  <Ionicons
                    name="add-circle"
                    size={size + 15}
                    color={COLORS.add}
                    style={{ marginBottom:-10, marginRight:-10 }}
                  />
                ),
              }}
            />

            <Tabs.Screen
              name="profile"
              options={{
                tabBarLabel: "Profile",
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.placeHolderText,
                tabBarIcon: ({ size, focused }) => (
                  <Octicons
                    name={focused ? "person-fill" : "person"}
                    size={size}
                    color={focused ? COLORS.primary : COLORS.placeHolderText}
                  />
                ),
              }}
            />
          </Tabs>
      </SafeScreen>
    </GestureHandlerRootView>
  );
}
