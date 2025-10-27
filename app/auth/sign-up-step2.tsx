import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { styles } from '../../assets/styles/auth.styles';
import { COLORS } from "../../constants/colors";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SafeScreen from '@/assets/components/SafeScreen';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ProgressBar from '../../assets/components/progressBar';
import { useSignUp } from '@/context/SignUpContext'; // 👈 import context

const { height } = Dimensions.get('window');

const space = {
  titleTop: height * 0.1,
  subtitleToInput: height * 0.05,
};

const SignUp2 = () => {
  const router = useRouter();
  const { phone, email, setPhone, setEmail } = useSignUp(); // 👈 access context
  const [usePhone, setUsePhone] = useState(true);
  const phoneInputRef = useRef<TextInput | null>(null);
  const emailInputRef = useRef<TextInput | null>(null);
const [phoneError, setPhoneError] = useState('');
const [emailError, setEmailError] = useState('');


  const handleNext = () => {
     let valid = true;
        if (!phone.trim()) {
        setPhoneError('Phone Number is required');
        phoneInputRef.current?.focus();
        valid = false;
      } else {
        setPhoneError('');
      }

      if (!email.trim()) {
        setEmailError('Email is required');
        if (valid) emailInputRef.current?.focus(); // focus only if phone is filled
        valid = false;
      } else {
        setEmailError('');
      }

      if (!valid) return;

      router.push('/auth/sign-up-step3');
  };

  return (
    <SafeScreen>
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: COLORS.background2 }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <ProgressBar step={2} />
          <Text style={[styles.normalTitle, { marginTop: space.titleTop, textAlign: 'left' }]}>
            Your Email and Phone Number
          </Text>

            <View style={[styles.inputWrapper, { marginTop: space.subtitleToInput }]}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              ref={phoneInputRef}
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.placeHolderText}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
            {phoneError ? <Text style={{ color: 'red', marginTop: 5 }}>{phoneError}</Text> : null}
            </View>
            <View>
            <Text style={[styles.label, { marginTop: 20 }]}>Email</Text>
            <TextInput
              ref={emailInputRef}
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={COLORS.placeHolderText}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            {emailError ? <Text style={{ color: 'red', marginTop: 5 }}>{emailError}</Text> : null}
          </View>

          <TouchableOpacity
            style={[styles.button, { marginTop: 30 }]}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeScreen>
  );
};

export default SignUp2;
