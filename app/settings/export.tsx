import React from "react";
import { View, Text, TouchableOpacity, Dimensions} from "react-native";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
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
  buttonToOr: height * 0.05,
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
        <Text style={[styles.backText]}>Download Information</Text>
      </View>

      {/* body */}
      <View style={[styles.subscriptionbody]}>
        <Text style={styles.title}>Download Information</Text>
        <Text style={styles.subtitleText}>You can Export Information of your business.</Text>

        <Text style={[styles.subtitleText, {marginTop: space.buttonToOr}]}>
            You can Download a CVS file that contains all your information and Dates of your businness Transactions
        </Text>

        <TouchableOpacity style={[styles.button, {flexDirection:'row', justifyContent:'center', alignItems:'center', gap:6 }]}
          onPress={() => router.push('/auth/subscribe')}>
          <FontAwesome6 name="file-csv" size={20} color={COLORS.background1}/>
          <Text style={styles.buttonText}> Download CVS</Text>
        </TouchableOpacity>

        <Text style={[styles.subtitleText, , {marginTop: space.buttonToOr}]}>Please If you need any help, Contact Us:</Text>
        <View style={styles.contactContainer}>
          <Ionicons name="logo-whatsapp" size={20} color={COLORS.text2}/>
          <Text style={styles.subtitleText}>  +25 71216148</Text>
        </View>
        <View style={styles.contactContainer}>
          <Ionicons name="mail-outline" size={20} color={COLORS.text2}/>
          <Text style={styles.subtitleText}>  info@bukia.bi</Text>
        </View>

        
      </View>
    </View>
    </SafeScreen>
  )
}

export default Subscripion