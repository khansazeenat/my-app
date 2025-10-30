import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { styles } from '../../assets/styles/auth.styles';
import { COLORS } from "../../constants/colors";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SafeScreen from '@/assets/components/SafeScreen';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ProgressBar from '../../assets/components/progressBar';
import { useSignUp } from '@/context/SignUpContext'; // 👈 import context hook

const { height } = Dimensions.get('window');

const space = {
  titleTop: height * 0.1,
  titleToSubtitle: height * 0.01,
  subtitleToInput: height * 0.05,
  inputWrapper: height * 0.02,
  inputToButton: height * 0.03,
};

const SignUp1 = () => {
  const router = useRouter();
  const { businessName, setBusinessName } = useSignUp(); // 👈 access context
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!businessName.trim()) {
      setError('Business name is required');
      return;
    }
    setError('');
    router.push('/auth/sign-up-step2'); // 👈 step 2
  };

  return (
    <SafeScreen>
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: COLORS.background2 }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <ProgressBar step={1} />

          <Text style={[styles.normalTitle, { marginTop: space.titleTop }]}>
            Welcome to Bukia!
          </Text>
          <Text style={[styles.subtitleText, { marginTop: space.titleToSubtitle }]}>
            What is your Business Name?
          </Text>

          <View style={[styles.inputWrapper, { marginTop: space.subtitleToInput }]}>
            <Text style={styles.label}>Business Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your business name"
              placeholderTextColor={COLORS.placeHolderText}
              value={businessName}
              onChangeText={setBusinessName}
            />
            {error ? <Text style={{ color: 'red', marginTop: 5 }}>{error}</Text> : null}
          </View>

          <TouchableOpacity
            style={[styles.button, { marginTop: space.inputToButton }]}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeScreen>
  );
};

export default SignUp1;
