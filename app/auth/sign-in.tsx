// /app/auth/sign-in.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { styles } from '../../assets/styles/auth.styles'; // 👈 import your styles
import { spacing } from "../../constants/colors";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SafeScreen from '@/assets/components/SafeScreen';
import {Ionicons} from '@expo/vector-icons';
import { COLORS } from "../../constants/colors";
import { useRouter } from 'expo-router';

// Get screen height
const { height } = Dimensions.get('window');

// Example spacing based on screen height
const space = {
  titleTop: height * 0.1, // 10% of screen height from top
  titleToSubtitle: height * 0.01,     // 2% of screen height
  subtitleToInput: height * 0.05,     
  inputWrapper: height * 0.02,        // space between inputs
  inputToButton: height * 0.03,       // space between input and sign in button
  buttonToOr: height * 0.02,
  orToOtherButton: height * 0.02,
  otherButtonToBack: height * 0.02,
};

const SignIn = () => {

  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); // <-- for showing error messages

  // Dummy credentials (for testing)
  const correctEmail = "aisha@example.com";
  const correctPassword = "12345";

  const handleLogin = () => {
      console.log("Email:", email, "Password:", password);
    if (!email || !password) {
      setError("Please fill in your Email and password");
      return;
    }

    if (email.trim() === correctEmail && password.trim() === correctPassword) {
      setError(""); // clear errors
        router.dismissAll();
      router.replace('/(tabs)'); // logged in
    } else {
      setError("Email or password is incorrect");
    }
  };

  return (
    <SafeScreen>
    <KeyboardAwareScrollView
    style={{ flex: 1, backgroundColor: COLORS.background2, }}
    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
    enableOnAndroid={true}
    keyboardShouldPersistTaps="handled"
    >

      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      {/* Titles */}
        <Text style={[styles.welcomeTitle, { marginTop: space.titleTop }]}>Welcome back!</Text>
        <Text style={[styles.subtitleText, { marginTop: space.titleToSubtitle }]}>
          Sign in to continue
        </Text>

        {/* Email Input */}
        <View style={[styles.inputWrapper,{ marginTop: space.subtitleToInput }]}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="Enter your email"
            onChangeText={setEmail}
            placeholderTextColor={COLORS.placeHolderText}
          />
        </View>

        {/* Password Input */}

        <View style={[styles.inputWrapper, { marginTop: space.inputWrapper }]}>
          <Text style={styles.label}>Password</Text>

          <View style={{ position: 'relative', justifyContent: 'center' }}>
            <TextInput
              style={[styles.input, { paddingRight: 40 }]} // space for the icon
              placeholder="Enter your password"
              placeholderTextColor={COLORS.placeHolderText}
              secureTextEntry={!showPassword} // 👈 switch based on state
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: 10,
                height: '100%',
                justifyContent: 'center',
              }}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color={COLORS.placeHolderText}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => router.push('/auth/reset-password')}>
            <Text style={styles.linkText}>Forgot Password</Text>
          </TouchableOpacity>

          
        </View>
{error ? <Text style={{ color: 'red', marginTop: 5 }}>{error}</Text> : null}

        {/* Sign In Button */}
        <TouchableOpacity 
        style={[styles.button, { marginTop: space.inputToButton }]} 
        onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        {/* OR separator */}
        <View style={[styles.orContainer, { marginVertical: space.buttonToOr }]}>
          <View style={styles.line} />
          <Text style={styles.normalText}>or</Text>
          <View style={styles.line} />
        </View>

        {/* Create Account Line */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: space.otherButtonToBack }}>
        <Text style={styles.subtitleText}>Don't have an Account. </Text>
        <TouchableOpacity onPress={() => router.push('/auth/sign-up-step1')}>
          <Text style={styles.otherButtonText}>Create Account</Text>
        </TouchableOpacity>
        </View>
    </View>
  </KeyboardAwareScrollView>
</SafeScreen>

  );
};

export default SignIn;