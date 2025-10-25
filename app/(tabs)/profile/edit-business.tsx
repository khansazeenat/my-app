import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "../../../assets/styles/add-item.styles";
import { COLORS } from "../../../constants/colors";
import * as ImagePicker from "expo-image-picker";
import { useSignUp } from "@/context/SignUpContext"; // 👈 import context

const { height } = Dimensions.get("window");
const space = {
  titleTop: height * 0.06,
  inputWrapper: height * 0.02,
};

export default function EditBusinessSettings() {
  const router = useRouter();
  const { businessName, setBusinessName, logoUri, setLogoUri } = useSignUp();

  // Function to pick or replace logo
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
      setLogoUri(result.assets[0].uri); // 👈 updates context
    }
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
          <Text style={styles.backText}>Edit Business Settings</Text>
          <TouchableOpacity
            style={[styles.saveDetailBtn, { opacity: 1 }]}
            onPress={() => router.replace("/(tabs)/profile")} // save is automatic via context
          >
            <Text style={styles.saveDetatailText}>Save</Text>
          </TouchableOpacity>
        </View>
        {/* Business Name */} 
        <View style={{ marginTop: 18 }}>
          <Text style={{ marginBottom: 6 }}>Edit Business Name</Text>
          <TextInput
            style={[styles.input, { padding: 12, borderRadius: 10 }]}
            value={businessName}
            onChangeText={setBusinessName} // 👈 directly updates context
          />
        </View>
        {/* Logo picker */}
        <Text style={{ marginTop: 18, marginBottom: 8 }}>Edit Business Logo</Text>
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
          }}
        >
          {logoUri ? (
            <>
              <Image
                source={{ uri: logoUri }}
                style={{ width: 89, height: 89, borderRadius: 99 }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: -4,
                  right: -4,
                  backgroundColor: COLORS.primary,
                  borderRadius: 12,
                  padding: 4,
                }}
              >
                <Ionicons name="pencil" size={12} color="#fff" />
              </View>
            </>
          ) : (
            <Ionicons name="image-outline" size={36} color={COLORS.placeHolderText} />
          )}
        </TouchableOpacity>

        
      </View>
    </KeyboardAwareScrollView>
  );
}
