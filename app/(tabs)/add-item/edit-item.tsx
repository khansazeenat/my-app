import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../../assets/styles/add-item.styles";
import { COLORS } from "../../../constants/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAddItem, Item } from "@/context/AddItemContext";

const { height } = Dimensions.get("window");
const space = {
  titleTop: height * 0.06,
  inputWrapper: height * 0.02,
};

export default function EditItem() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { items, updateItem } = useAddItem();
  const itemToEdit = items.find((i: Item) => i.id === id);

  const [name, setName] = useState(itemToEdit?.itemName || '');
  const [qty, setQty] = useState(itemToEdit?.itemQty || '');
  const [price, setPrice] = useState(itemToEdit?.itemPrice || '');
  const [imageUri, setImageUri] = useState(itemToEdit?.itemImage || null);

  const pickImage = () => {
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

        <View style={{ flexDirection: "row", gap: 12, marginTop: 20 }}>
          <TouchableOpacity style={[styles.otherButton, { flex: 1 }]} onPress={() => router.back()}>
            <Text style={[styles.buttonText, { color: COLORS.primary }]}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { flex: 1, opacity: 1 }]}
            onPress={() => {
              if (!itemToEdit) return;
              updateItem(id, { itemName: name, itemQty: qty, itemPrice: price, itemImage: imageUri });
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
