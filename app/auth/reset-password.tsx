// /app/auth/sign-up.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { styles } from '../../assets/styles/auth.styles'; // 👈 import your styles
import { spacing } from "../../constants/colors";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SafeScreen from '@/assets/components/SafeScreen';
import {Ionicons} from '@expo/vector-icons'
import { COLORS } from "../../constants/colors";
import { useState, useRef } from 'react';
import {useRouter} from 'expo-router'


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
  
  const [usePhone, setUsePhone] = useState(true); // 👈 default: phone first
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // ✅ Create refs
  const phoneInputRef = useRef<TextInput | null>(null);
  const emailInputRef = useRef<TextInput | null>(null);


 const toggleInput = () => {
  // blur current focused input so keyboard can change
  if (usePhone) {
    phoneInputRef.current?.blur();
  } else {
    emailInputRef.current?.blur();
  }

  // switch the input type
  setUsePhone(prev => !prev);

  // focus the new input after a short delay so keyboard re-opens with correct type
  setTimeout(() => {
    if (usePhone) {
      // we were on phone, now switching to email -> focus email
      emailInputRef.current?.focus();
    } else {
      // we were on email, now switching to phone -> focus phone
      phoneInputRef.current?.focus();
    }
  }, 50); // 50ms is enough; you can increase to 100 if needed on some devices
};

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
            Enter the Email  or  Phone Number that you used to create an account
          </Text>

          {/* Input field */}
          <View style={[styles.inputWrapper ,{ marginTop: space.subtitleToInput }]}>
            {usePhone ? (
              <>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  ref={phoneInputRef} // ✅ assign ref
                  placeholder="Enter the phone number"
                  placeholderTextColor={COLORS.placeHolderText}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </>
            ) : (
              <>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  ref={emailInputRef} // ✅ assign ref
                  placeholder="Enter the email"
                  placeholderTextColor={COLORS.placeHolderText}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </>
            )}

            {/* Toggle button */}
            <TouchableOpacity onPress={toggleInput}>
              <Text style={styles.linkText}>
                {usePhone ? 'Use Email Instead' : 'Use Phone Number Instead'}
              </Text>
            </TouchableOpacity>
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
