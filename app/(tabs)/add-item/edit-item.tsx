import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SafeScreen from "@/assets/components/SafeScreen";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "../../../assets/styles/add-item.styles";
import { COLORS } from "../../../constants/colors";

const { height } = Dimensions.get("window");
const space = {
  titleTop: height * 0.06,
  inputWrapper: height * 0.02,
};

export default function EditItem() {
  const router = useRouter();

  // Hardcoded example values (per your request)
  const [name, setName] = useState("Coca-Cola 2L");
  const [qty, setQty] = useState("12");
  const [price, setPrice] = useState("5000");
  const [imageUri, setImageUri] = useState<string | null>(null); // show placeholder box (or add image)

  const pickImage = () => {
    // TODO: integrate ImagePicker. For now toggle placeholder text or set an example.
    setImageUri(imageUri ? null : "placeholder");
  };

  return (
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: COLORS.background1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.backText}>Change Product</Text>
          </View>
          <Text style={{ marginTop: 8, color: COLORS.placeHolderText }}>Change your product detail and save them</Text>

          <View style={{ marginTop: space.inputWrapper }}>
            <Text style={{ marginBottom: 6, fontSize: 14 }}>Change Name</Text>
            <TextInput
              style={[styles.input, { padding: 12, borderRadius: 10 }]}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={{ marginTop: space.inputWrapper, flexDirection: "row", gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ marginBottom: 6, fontSize: 14 }}>Change Quantity (Qty)</Text>
              <TextInput
                style={[styles.input, { padding: 12, borderRadius: 10 }]}
                value={qty}
                onChangeText={setQty}
                keyboardType="numeric"
              />
            </View>

            <View style={{ width: 110 }}>
              <Text style={{ marginBottom: 6, fontSize: 14 }}>Change Price</Text>
              <TextInput
                style={[styles.input, { padding: 12, borderRadius: 10 }]}
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
            </View>
          </View>

          <Text style={{ marginTop: 16, marginBottom: 8 }}>Change Product Image</Text>
          <TouchableOpacity
            onPress={pickImage}
            style={{
              height: 180,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: COLORS.inputBorder,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 3,
              backgroundColor: imageUri ? COLORS.background2 : undefined,
            }}
          >
            {imageUri ? (
              <View style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: "https://via.placeholder.com/140" }}
                  style={{ width: 120, height: 120, borderRadius: 8 }}
                />
                <Text style={{ marginTop: 8, color: COLORS.placeHolderText }}>Tap to change</Text>
              </View>
            ) : (
              <View style={{ alignItems: "center" }}>
                <Ionicons name="image-outline" size={36} color={COLORS.placeHolderText} />
                <Text style={{ marginTop: 8, color: COLORS.placeHolderText }}>Add / Change image</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={{ flexDirection: "row", gap: 12, marginTop:20 }}>
            <TouchableOpacity style={[styles.otherButton, { flex: 1 }]} onPress={() => router.back()}>
              <Text style={[styles.buttonText, { color: COLORS.primary }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { flex: 1, opacity: 1 }]}
              onPress={() => {
                // TODO: save to backend or state
                console.log("Saved", { name, qty, price, imageUri });
                router.replace("/(tabs)");
              }}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
  );
}
