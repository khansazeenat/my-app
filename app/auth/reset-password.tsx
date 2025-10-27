// /app/auth/sign-up.tsx
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { styles } from '../../assets/styles/auth.styles'; // 👈 import your styles
import { spacing, COLORS } from "../../constants/colors";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SafeScreen from '@/assets/components/SafeScreen';
import { Ionicons } from '@expo/vector-icons';
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

const ResetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const emailInputRef = useRef<TextInput | null>(null);

  return (
    <SafeScreen>
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: COLORS.background2 }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center'}}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          
          {/* Titles */}
          <Text style={[styles.normalTitle, { marginTop:space.titleTop ,textAlign: 'left'}]}>
            Forgot Password?
          </Text>
          <Text style={[styles.subtitleText, { marginTop: space.titleToSubtitle, textAlign: 'left'}]}>
            Enter the Email that you used to create an account
          </Text>

          {/* Input field */}
          <View style={[styles.inputWrapper ,{ marginTop: space.subtitleToInput }]}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              ref={emailInputRef}
              placeholder="Enter the email"
              placeholderTextColor={COLORS.placeHolderText}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Next Button */}
          <TouchableOpacity
            style={[styles.button, { marginTop: 30 }]}
            onPress={() => router.push('/auth/verify-code')}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeScreen>
  );
};

export default ResetPassword;
