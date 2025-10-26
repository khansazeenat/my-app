import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "../../../assets/styles/add-item.styles";
import { COLORS } from "../../../constants/colors";
import { useAddItem } from "@/context/AddItemContext";

// get screen height for consistent spacing on different phones
const { height } = Dimensions.get("window");
const space = {
  titleTop: height * 0.06,
  inputWrapper: height * 0.02,
  inputToButton: height * 0.04,
};

export default function AddItemStep1() {
  const router = useRouter();
  const { itemName, setItemName, itemQty, setItemQty, itemPrice, setItemPrice } =
    useAddItem();

  // these store local inline error messages under each input
  const [nameError, setNameError] = useState("");
  const [qtyError, setQtyError] = useState("");
  const [priceError, setPriceError] = useState("");

  // runs when the "Next" button is pressed
  const handleNext = () => {
    let valid = true;

    // ----------------------
    // validation for item name
    // ----------------------
    if (!itemName.trim()) {
      // error shows if the name is empty
      setNameError("Please enter the item name");
      valid = false;
    } else {
      setNameError("");
    }

    // ----------------------
    // validation for quantity
    // ----------------------
    if (!itemQty.trim()) {
      setQtyError("Please enter the quantity");
      valid = false;
    } else if (isNaN(Number(itemQty)) || Number(itemQty) <= 0) {
      // error shows if the value is not a number or is negative/zero
      setQtyError("Quantity must be a positive number");
      valid = false;
    } else {
      setQtyError("");
    }

    // ----------------------
    // validation for price
    // ----------------------
    if (!itemPrice.trim()) {
      setPriceError("Please enter the price");
      valid = false;
    } else if (isNaN(Number(itemPrice)) || Number(itemPrice) <= 0) {
      // same numeric check for price
      setPriceError("Price must be a positive number");
      valid = false;
    } else {
      setPriceError("");
    }

    // ----------------------
    // navigation
    // ----------------------
    // only navigate if all inputs are valid
    if (valid) {
      router.push("/add-item/step2");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: COLORS.background1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        {/* ---------- Header ---------- */}
        <View style={styles.header}>
        </View>

        <Text style={{ marginTop: 8, color: COLORS.placeHolderText }}>
          Step 1 — Enter basic details
        </Text>

        {/* ---------- Item Name ---------- */}
        <View style={{ marginTop: space.inputWrapper }}>
          <Text style={{ marginBottom: 6, fontSize: 14 }}>Item Name</Text>
          <TextInput
            style={[styles.input, { padding: 12, borderRadius: 10 }]}
            placeholder="e.g. Coca-Cola 2L"
            placeholderTextColor={COLORS.placeHolderText}
            value={itemName}
            onChangeText={(text) => {
              setItemName(text);
              setNameError(""); // clear error as user types
            }}
          />
          {nameError ? (
            <Text style={{ color: "red", marginTop: 5 }}>{nameError}</Text>
          ) : null}
        </View>

        {/* ---------- Quantity ---------- */}
        <View style={{ marginTop: space.inputWrapper }}>
          <Text style={{ marginBottom: 6, fontSize: 14 }}>Quantity (Qty)</Text>
          <TextInput
            style={[styles.input, { padding: 12, borderRadius: 10 }]}
            placeholder="e.g. 12"
            placeholderTextColor={COLORS.placeHolderText}
            keyboardType="numeric"
            value={itemQty}
            onChangeText={(text) => {
              setItemQty(text);
              setQtyError("");
            }}
          />
          {qtyError ? (
            <Text style={{ color: "red", marginTop: 5 }}>{qtyError}</Text>
          ) : null}
        </View>

        {/* ---------- Price ---------- */}
        <View style={{ marginTop: space.inputWrapper }}>
          <Text style={{ marginBottom: 6, fontSize: 14 }}>Price</Text>
          <TextInput
            style={[styles.input, { padding: 12, borderRadius: 10 }]}
            placeholder="e.g. 5000"
            placeholderTextColor={COLORS.placeHolderText}
            keyboardType="numeric"
            value={itemPrice}
            onChangeText={(text) => {
              setItemPrice(text);
              setPriceError("");
            }}
          />
          {priceError ? (
            <Text style={{ color: "red", marginTop: 5 }}>{priceError}</Text>
          ) : null}
        </View>

        <View style={{ flex: 1 }} />

        {/* ---------- Footer Buttons ---------- */}
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}>
          <TouchableOpacity
            style={[styles.otherButton, { flex: 1 }]}
            onPress={() => router.back()}
          >
            <Text style={[styles.buttonText, { color: COLORS.primary }]}>
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { flex: 1, opacity: 1 }]}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
