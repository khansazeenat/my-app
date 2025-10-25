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

  const toggleInput = () => {
    if (usePhone) phoneInputRef.current?.blur();
    else emailInputRef.current?.blur();
    setUsePhone(prev => !prev);
    setTimeout(() => {
      if (usePhone) emailInputRef.current?.focus();
      else phoneInputRef.current?.focus();
    }, 50);
  };

  const handleNext = () => {
    if (usePhone && !phone.trim()) return;
    if (!usePhone && !email.trim()) return;
    router.push('/auth/sign-up-step3'); // 👈 redirect to homepage
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
            Phone Number or Email
          </Text>

          <View style={[styles.inputWrapper, { marginTop: space.subtitleToInput }]}>
            {usePhone ? (
              <>
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
              </>
            ) : (
              <>
                <Text style={styles.label}>Email</Text>
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
              </>
            )}

            <TouchableOpacity onPress={toggleInput}>
              <Text style={styles.linkText}>
                {usePhone ? 'Use Email Instead' : 'Use Phone Number Instead'}
              </Text>
            </TouchableOpacity>
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
