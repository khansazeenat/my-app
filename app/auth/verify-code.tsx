import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SafeScreen from '@/assets/components/SafeScreen';
import { COLORS } from "../../constants/colors";
import { styles } from '../../assets/styles/auth.styles';




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


const VerifyCode = () => {
const router = useRouter();


// Temporary hardcoded value (later you’ll fetch this dynamically)
const sentTo = '+257 79 123 456';

const [code, setCode] = useState(['', '', '', '', '', '']);
const [seconds, setSeconds] = useState(30);
const [isResending, setIsResending] = useState(false);

const inputRefs = Array(6)
.fill(0)
.map(() => useRef<TextInput | null>(null));

// ⏱ Countdown timer
useEffect(() => {
if (seconds === 0) return;
const timer = setInterval(() => setSeconds((prev) => prev - 1), 1000);
return () => clearInterval(timer);
}, [seconds]);

// 🔁 Handle resend click
const handleResend = () => {
if (seconds === 0) {
console.log('Resending code...');
setIsResending(true);
// Simulate resend delay
setTimeout(() => {
setIsResending(false);
setSeconds(30);
console.log('New code sent!');
}, 1500);
}
};

// 🧠 Handle digit change
const handleChange = (text: string, index: number) => {
if (!/^\d$/.test(text)) return; // only digits allowed


const newCode = [...code];
newCode[index] = text;
setCode(newCode);

if (index < 5) {
  inputRefs[index + 1].current?.focus();
} else {
  const fullCode = newCode.join('');
  console.log('Full code:', fullCode);
  // ✅ Auto verify once all 6 digits are filled
  router.push('/(tabs)');
}


};

// ⬅️ Handle backspace key
const handleKeyPress = (e: any, index: number) => {
if (e.nativeEvent.key === 'Backspace' && index > 0 && code[index] === '') {
inputRefs[index - 1].current?.focus();
}
};

// 🔘 Disable Next until all digits are filled
const isButtonDisabled = code.some((digit) => digit === '');

return ( <SafeScreen>
<View style={[styles.container, { paddingTop: 60 }]}>
{/* 🔙 Back Arrow */}
<TouchableOpacity onPress={() => router.back()}> <Ionicons name="arrow-back" size={24} color={COLORS.primary} /> </TouchableOpacity>


    {/* 🧾 Title */}
    <Text style={[styles.normalTitle, { marginTop: space.titleTop }]}>
      Enter the confirmation code we sent to you
    </Text>

    {/* 📩 Where it was sent */}
    <Text style={[styles.subtitleText, { marginTop: space.titleToSubtitle, color: COLORS.placeHolderText }]}>
      On {sentTo}
    </Text>
    {/* 💬 Subtitle + Resend */}
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: space.titleToSubtitle }}>
      <Text style={styles.subtitleText}>Didn’t receive the code?</Text>
      <TouchableOpacity onPress={handleResend} disabled={seconds > 0 || isResending}>
        <Text style={{ color: COLORS.link, opacity: seconds > 0 ? 0.6 : 1 }}>
          {seconds > 0 ? ` Resend in ${seconds}s` : isResending ? ' Sending...' : ' Resend'}
        </Text>
      </TouchableOpacity>
    </View>


  {/* Inputs in a row */}
    {/* 🔢 Verification inputs */}
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:space.subtitleToInput
      }}
    >
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={inputRefs[index]}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          style={{
            width: 45,
            height: 50,
            borderWidth: 1,
            borderColor: COLORS.placeHolderText,
            borderRadius: 8,
            fontSize: 18,
            textAlign: 'center',
            marginHorizontal: 8,
            color: COLORS.text,
          }}
          keyboardType="number-pad"
          maxLength={1}
        />
      ))}
    </View>
    
        {/* 🔄 Switch to email */}
            
        <TouchableOpacity
          style={{ marginTop: space.inputWrapper, alignSelf: 'center'}}
          onPress={() => router.push('/auth/reset-password')}
        >
          <Text style={[styles.linkText]}>
            Use email instead
          </Text>
        </TouchableOpacity>



  </View>
</SafeScreen>


);
};

export default VerifyCode;
