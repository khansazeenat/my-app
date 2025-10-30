import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { styles } from '../assets/styles/auth.styles';
import { COLORS } from '../constants/colors';

const { height } = Dimensions.get('window');

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={[styles.container, { justifyContent: 'space-between', paddingVertical: 40 }]}>
      
      {/* Logo Top */}
      <View style={{ alignItems: 'center', marginTop: height * 0.08 }}>
        <Image 
          source={require('../assets/images/bukia-logo.png')} 
          style={{ width: 300, height: 300, resizeMode: 'contain' }} 
        />
      </View>

      {/* Middle Text */}
      <View style={{ alignItems: 'center', paddingHorizontal: 24, marginTop: 16 }}>
        <Text style={[styles.welcomeTitle, { fontSize: 28 }]}>
          Save Time and Energy
        </Text>
        <Text style={[styles.subtitleText, { marginTop: 12 }]}>
          A quick way for small businesses to manage their Stock Materials
        </Text>
      </View>


      {/* Buttons at Bottom */}
      <View style={{ paddingHorizontal: 24 }}>
        {/* Google Sign-In Placeholder */}
        <TouchableOpacity 
          style={[styles.otherButton, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }]}
          onPress={() => router.push('/auth/sign-up-step1')}
        >
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }}
            style={{ width: 24, height: 24, marginRight: 10 }}
          />
          <Text style={[styles.buttonText, { color: COLORS.text }]}>Sign in with Google</Text>
        </TouchableOpacity>

        {/* Regular Sign-Up */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push('/auth/sign-up-step1')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Already have account */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
          <Text style={styles.subtitleText}>Already have an Account? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/sign-in')}>
            <Text style={styles.otherButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </View>
  );
}
