import React from "react";
import { View, Text, TouchableOpacity, Dimensions} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "../../assets/styles/settings.styles";
import { COLORS } from "../../constants/colors";
const Subscripion = () => {
    const router = useRouter();
  
  return (
    <View style={styles.container}>
      {/* header */}
        <Text style={styles.backText}>Your Acc</Text>
      
      {/* body */}
      <View>
        <Text>Subscrition Details</Text>
        <Text>Your Subscription is Active</Text>
        <Text>Days Left: {}</Text>
        <View>
          <Text>+257 71216148</Text>
          <Text>info@bukia.bi</Text>
        </View>
        <TouchableOpacity>
          <Text>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Subscripion