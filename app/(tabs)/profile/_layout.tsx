// /profile_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // hide header globally
      }}
    />
  );
};

export default ProfileLayout;
