import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "../../../assets/styles/add-item.styles";
import { COLORS } from "../../../constants/colors";
import * as ImagePicker from "expo-image-picker";
import { useSignUp } from "@/context/SignUpContext"; // 👈 import context
import { useState } from "react";
import { Alert } from "react-native"; 


const { height } = Dimensions.get("window");
const space = {
  titleTop: height * 0.06,
  inputWrapper: height * 0.02,
};

export default function EditBusinessSettings() {
  const router = useRouter();
  const { businessName, setBusinessName, logoUri, setLogoUri } = useSignUp();

  // Local state to hold changes before I save the Data 
  const [localBusinessName, setLocalBusinessName] = useState(businessName);
  const [localLogoUri, setLocalLogoUri] = useState(logoUri);

  const [editing, setEditing] = useState(false);
  // Function to pick or replace logo (updates local state only)
  const pickLogo = async (): Promise<void> => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission is required to select images from your gallery.");
        return;
      }
    } 

   const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setLocalLogoUri(result.assets[0].uri); // update only local state
    }
  };

  // Save function: updates the context and navigates back
  const handleSave = () => {
    Alert.alert(
    "Save Changes?",
    "Are you sure you want to save these changes?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes, Save",
        onPress: () => {
          // Update context and navigate back
          setBusinessName(localBusinessName);
          setLogoUri(localLogoUri);
          router.replace("/(tabs)/profile");
        },
      },
    ],
    { cancelable: true }
  );
  };
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: COLORS.background1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.businessDetailheader}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.backText}> Change Business Settings</Text>
          <TouchableOpacity
            style={[styles.saveDetailBtn, { opacity: 1 }]}
            onPress={handleSave} 
          >
            <Text style={styles.saveDetatailText}>Save</Text>
          </TouchableOpacity>
        </View>
        
        {/* Business Name */} 
        <View style={{ marginTop: 18 }}>
          <Text style={{ marginBottom: 6 }}>Change Business Name</Text>
          <TextInput
            style={[styles.input, { padding: 12, borderRadius: 10 }]}
            value={localBusinessName}
            onChangeText={setLocalBusinessName} // 👈 directly updates context
          />
        </View>
        <View style={styles.menuSeparator} />
        {/* Logo picker */}
        <View style={[styles.contactContainer]}>
          <Text>Change Business Logo</Text>
          <TouchableOpacity
            onPress={pickLogo}
            style={{
              width: 96,
              height: 96,
              borderRadius: 99,
              borderWidth: 1,
              borderColor: COLORS.inputBorder,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 3,
              backgroundColor: logoUri ? COLORS.background2 : undefined,
              position: "relative", // make this relative so absolute circle stays in place
            }}
          >
            {localLogoUri ? (
              <Image
                source={{ uri: localLogoUri }}
                style={{ width: 89, height: 89, borderRadius: 99 }}
              />
            ) : (
              <Ionicons name="image-outline" size={36} color={COLORS.placeHolderText} />
            )}

            {/* Circle always overlayed */}
            <View
              style={{
                position: "absolute",
                bottom: -1,
                right: -0.5,
                backgroundColor: COLORS.primary,
                borderRadius: 12,
                padding: 4,
              }}
            >
              <Ionicons name={logoUri ? "pencil" : "add"} size={12} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSeparator} />
        {/* Email */} 
        <View style={[styles.contactContainer]}>
          <Text style={styles.text}>Email</Text>
          <Text style={styles.text}>example@gmail.com</Text>
        </View>
        <View style={styles.menuSeparator} />
        
        {/* Phone Number */}
        <View style={[styles.contactContainer]}>
          <Text style={styles.text}>Phone Number</Text>
          <Text style={styles.text}>+25 000 000</Text>
        </View>
        <View style={styles.menuSeparator} />
      </View>
    </KeyboardAwareScrollView>
  );
}
