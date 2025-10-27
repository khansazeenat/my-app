// /add_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

const addLayout = () => {
  return (
    <>
    <Stack
      initialRouteName="index" // 🔑 always start at /add/index
      screenOptions={{
        headerShown: false, // hide header globally
      }}
    />
    <Toast/>
    </>
  );
};

export default addLayout;
