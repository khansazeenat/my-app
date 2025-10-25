import React from "react";
import { View, Text, TouchableOpacity, Dimensions} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "../../assets/styles/settings.styles";
import SafeScreen from '@/assets/components/SafeScreen';
import { COLORS } from "../../constants/colors";

// Get screen height
const { height } = Dimensions.get('window');

// Example spacing based on screen height
const space = {
  titleTop: height * 0.04, // 10% of screen height from top
  titleToSubtitle: height * 0.05,     // 2% of screen height
  subtitleToInput: height * 0.05,     
  inputWrapper: height * 0.02,        // space between inputs
  inputToButton: height * 0.03,       // space between input and sign in button
  buttonToOr: height * 0.02,
  orToOtherButton: height * 0.02,
  otherButtonToBack: height * 0.02,
};

const Subscripion = () => {
    const router = useRouter();
  
  return (
    <SafeScreen>
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={[styles.backText]}>Your Subscription</Text>
      </View>

      {/* body */}
      <View style={[styles.subscriptionbody]}>
        <Text style={styles.title}>Subscrition Details</Text>
        <Text style={styles.subtitleText}>Your Subscription is Active</Text>
        <Text style={[styles.activeText,{marginVertical:space.titleToSubtitle}]}>  X Days Left {}</Text>

        <View style={styles.contactContainer}>
          <Ionicons name="logo-whatsapp" size={20} color={COLORS.text2}/>
          <Text style={styles.subtitleText}>  +25 71216148</Text>
        </View>
        <View style={styles.contactContainer}>
          <Ionicons name="mail-outline" size={20} color={COLORS.text2}/>
          <Text style={styles.subtitleText}>  info@bukia.bi</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/subscribe')}>
          <Text style={styles.buttonText}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeScreen>
  )
}

export default Subscripion