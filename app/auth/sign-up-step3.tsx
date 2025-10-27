// /app/auth/sign-in.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { styles } from '../../assets/styles/auth.styles'; // 👈 import your styles
import { spacing } from "../../constants/colors";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SafeScreen from '@/assets/components/SafeScreen';
import {Ionicons} from '@expo/vector-icons'
import { useState } from 'react';
import {useRouter} from 'expo-router'
import { COLORS } from "../../constants/colors";
import ProgressBar from '../../assets/components/progressBar';

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



const SignUp3 = () => {

const router = useRouter();

const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  return (
    <SafeScreen>
    <KeyboardAwareScrollView
    style={{ flex: 1, backgroundColor: COLORS.background2, }}
    contentContainerStyle={{ flexGrow: 1 }}
    enableOnAndroid={true}
    keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        <ProgressBar step={3} />
      {/* Titles */}
        <Text style={[styles.normalTitle,  { marginTop: space.titleTop, textAlign: 'left' }]}>Create a Password</Text>
        <Text style={[styles.subtitleText,  { marginTop: space.titleToSubtitle, textAlign: 'left' }]}>
            You will use it to sign into your account
        </Text>

        {/* Password */}
        <View style={[styles.inputWrapper,{ marginTop: space.subtitleToInput }]}>
        <Text style={styles.label}>Password</Text>
        <TextInput
            style={styles.input}
            placeholder="Create a password"
            placeholderTextColor={COLORS.placeHolderText}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
        />
        </View>

{/* Confirm Password */}
<View style={[styles.inputWrapper, { marginTop: space.inputWrapper }]}>
  <Text style={styles.label}>Confirm Password</Text>

  <View style={{ position: 'relative', justifyContent: 'center' }}>
    <TextInput
      style={[styles.input, { paddingRight: 40 }]} // space for the icon
      placeholder="Confirm your password"
      placeholderTextColor={COLORS.placeHolderText}
      secureTextEntry={!showConfirmPassword} // 👈 toggles visibility
      value={confirmPassword}
      onChangeText={setConfirmPassword}
    />

    <TouchableOpacity
      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
      style={{
        position: 'absolute',
        right: 10,
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <Ionicons
        name={showConfirmPassword ? 'eye-off' : 'eye'}
        size={22}
        color={COLORS.placeHolderText}
      />
    </TouchableOpacity>
  </View>
</View>



        {/* Next Button */}
        <TouchableOpacity
        style={[styles.button, { marginTop: space.inputToButton }]}
        onPress={() => router.replace('/auth/subscribe')}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

    </View>
  </KeyboardAwareScrollView>
</SafeScreen>
  )
}

export default SignUp3