import React from "react";
import { View, Text, TouchableOpacity, Image, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { styles } from "../../../assets/styles/add-item.styles";
import { COLORS } from "../../../constants/colors";
import { useAddItem } from "@/context/AddItemContext";

export default function AddItemStep2() {
  const router = useRouter();
  const { itemName, itemQty, itemPrice, itemImage, setItemImage, addItemToList } = useAddItem();
  
  console.log("🧠 Context Data in Step 2:", {
    name: itemName,
    qty: itemQty,
    price: itemPrice,
    image: itemImage,
  });

  const openPicker = async (): Promise<void> => {
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
      setItemImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    const now = new Date();
    const timestamp = `${now.getHours()}:${now.getMinutes()} ${now.getDate()}/${
      now.getMonth() + 1
    }/${now.getFullYear()}`;

    console.log("💾 Final item being saved:", {
      name: itemName,
      qty: itemQty,
      price: itemPrice,
      image: itemImage,
      time: timestamp,
    });


    addItemToList(timestamp);
    router.push("/(tabs)"); // push ensures Home updates
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: COLORS.background1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.backText}>Add Item</Text>
        </View>

        <Text style={{ marginTop: 8, color: COLORS.placeHolderText }}>
          Step 2 — Add an optional Image
        </Text>

        <TouchableOpacity
          onPress={openPicker}
          style={{
            marginTop: 24,
            height: 200,
            width: 200,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: COLORS.inputBorder,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: itemImage ? COLORS.background2 : undefined,
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowRadius: 10,
            elevation: 4,
            position: "relative",
          }}
        >
          {itemImage ? (
            <>
              <Image
                source={{ uri: itemImage }}
                style={{ width: 200, height: 200, borderRadius: 12 }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  backgroundColor: COLORS.primary,
                  borderRadius: 20,
                  padding: 6,
                }}
              >
                <Ionicons name="pencil" size={18} color="#fff" />
              </View>
              <Text
                style={{
                  position: "absolute",
                  bottom: 40,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  color: COLORS.placeHolderText,
                  fontSize: 14,
                }}
              >
                Tap to replace image
              </Text>
            </>
          ) : (
            <>
              <Ionicons name="image-outline" size={44} color={COLORS.placeHolderText} />
              <View
                style={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  backgroundColor: COLORS.primary,
                  borderRadius: 20,
                  padding: 6,
                }}
              >
                <Ionicons name="pencil" size={18} color="#fff" />
              </View>
              <Text
                style={{
                  marginTop: 8,
                  color: COLORS.placeHolderText,
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                Add product image (optional)
              </Text>
            </>
          )}
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <View style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}>
          <TouchableOpacity
            style={[styles.otherButton, { flex: 1 }]}
            onPress={() => router.back()}
          >
            <Text style={[styles.buttonText, { color: COLORS.primary }]}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { flex: 1 }]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
