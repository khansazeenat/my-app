// /app/auth/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // remove the default header
      }}
    />
  );
};

export default AuthLayout;
