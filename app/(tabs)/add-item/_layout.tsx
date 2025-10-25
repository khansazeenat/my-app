// /add_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

const addLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // hide header globally
      }}
    />
  );
};

export default addLayout;
