import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../../../assets/styles/profile.styles";
import { useRouter } from "expo-router";
import { COLORS } from "@/constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import MenuModal from "@/app/(tabs)/profile/humburger-menu";
import { useSignUp } from "@/context/SignUpContext";
import { useAddItem, Item } from "@/context/AddItemContext";
import { useSoldItems } from "@/context/SoldItemsContext";
import { Swipeable } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

const { height } = Dimensions.get("window");
const space = { menuToHeader: height * 0.01 };

const Profile = () => {
  const router = useRouter();
  const { items, reduceItemQty, deleteItem } = useAddItem();
  const { addSoldItems } = useSoldItems();
  const [searchText, setSearchText] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);

  const [selectedItems, setSelectedItems] = useState<{ [id: string]: number }>({});
  const [totalSelected, setTotalSelected] = useState(0);
  const [showTotal, setShowTotal] = useState(false);

  const handleMinus = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (!item || Number(item.itemQty) <= 0) return;

    const newQty = (selectedItems[itemId] || 0) + 1;
    if (newQty <= Number(item.itemQty)) {
      setSelectedItems({ ...selectedItems, [itemId]: newQty });
      setTotalSelected(totalSelected + 1);
      setShowTotal(true);
    }
  };

  const handleEditQuantity = (itemId: string) => {
    if (showTotal) return; // disable edit while total active
    const item = items.find((i) => i.id === itemId);
    if (!item || Number(item.itemQty) <= 0) return;

    Alert.prompt(
      "Select Quantity",
      `Enter number of ${item.itemName} to take out:`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: (text: string | undefined) => {
            const num = Number(text);
            const stock = Number(item.itemQty);
            if (!isNaN(num) && num > 0 && num <= stock) {
              const prevQty = selectedItems[itemId] || 0;
              setSelectedItems({ ...selectedItems, [itemId]: num });
              setTotalSelected(totalSelected - prevQty + num);
              setShowTotal(true);
            } else {
              Alert.alert("Invalid number", `Enter a number between 1 and ${stock}`);
            }
          },
        },
      ],
      "plain-text",
      "0",
      "number-pad"
    );
  };

  const handleDelete = (itemId: string) => {
    if (showTotal) return; // disable delete while total active
    Alert.alert(
      "Delete Item",
      "Are you sure? This action is irreversible.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteItem(itemId);
            const qtyRemoved = selectedItems[itemId] || 0;
            if (qtyRemoved > 0) setTotalSelected(totalSelected - qtyRemoved);
            const newSelection = { ...selectedItems };
            delete newSelection[itemId];
            setSelectedItems(newSelection);
            Toast.show({
              type: "success",
              text1: "Item deleted",
              position: "bottom",
              visibilityTime: 1500,
            });
          },
        },
      ]
    );
  };

  const handleConfirm = () => {
    if (totalSelected === 0) return;
    Alert.alert(
      "Confirm Sale",
      "Are you sure you want to confirm this sale?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            Object.entries(selectedItems).forEach(([id, qty]) => {
              reduceItemQty(id, qty);
            });

            const sold = Object.entries(selectedItems).map(([id, qty]) => {
              const item = items.find((i) => i.id === id)!;
              return {
                id: item.id,
                name: item.itemName,
                qty,
                price: Number(item.itemPrice),
                imageUri: item.itemImage ?? null,
                time: new Date().toISOString(),
              };
            });
            addSoldItems(sold);

            setSelectedItems({});
            setTotalSelected(0);
            setShowTotal(false);
          },
        },
      ]
    );
  };

  const handleClear = () => {
    setSelectedItems({});
    setTotalSelected(0);
    setShowTotal(false);
  };

  const renderRightActions = (itemId: string) => (
    <TouchableOpacity
      style={{ backgroundColor: "red", justifyContent: "center", alignItems: "center", width: 80 }}
      onPress={() => handleDelete(itemId)}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
    </TouchableOpacity>
  );

  const renderLeftActions = (itemId: string) => (
    <TouchableOpacity
      style={{ backgroundColor: COLORS.primary, justifyContent: "center", alignItems: "center", width: 80 }}
      onPress={() =>
        router.push({
          pathname: "/add-item/edit-item",
          params: { id: itemId },
        })
      }
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>Edit</Text>
    </TouchableOpacity>
  );

  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Toast />
      <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={() => setMenuVisible(true)}>
        <Ionicons name="menu" size={24} color={COLORS.primary} />
      </TouchableOpacity>
      <MenuModal visible={menuVisible} onClose={() => setMenuVisible(false)} />

      <View style={[styles.searchContainer, { marginTop: space.menuToHeader }]}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.SearchInput}
          placeholder="Search..."
          placeholderTextColor={COLORS.placeHolderText}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginTop: 8 }}
        renderItem={({ item }) => {
          const currentQty = selectedItems[item.id] || 0;
          const stockNum = Number(item.itemQty);
          const isOutOfStock = stockNum === 0;

          return (
            <Swipeable
              renderRightActions={() => !showTotal && renderRightActions(item.id)}
              renderLeftActions={() => !showTotal && renderLeftActions(item.id)}
            >
              <View style={[styles.itemRow, isOutOfStock && { opacity: 0.5 }]}>
                <View style={styles.itemImage}>
                  {item.itemImage ? (
                    <Image source={{ uri: item.itemImage }} style={styles.itemImage} />
                  ) : (
                    <MaterialCommunityIcons
                      name="image-plus"
                      size={24}
                      color={COLORS.placeHolderText}
                      style={styles.itemImageIcon}
                    />
                  )}
                </View>
                <View style={styles.stockDetails}>
                  <Text style={styles.itemName}>{item.itemName}</Text>
                  <Text style={styles.itemStock}>{item.itemQty} in Stock</Text>
                </View>
                <View style={styles.stockSection}>
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => handleMinus(item.id)}
                    disabled={isOutOfStock || currentQty >= stockNum}
                  >
                    <Text style={styles.btnText}>-</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                  <TouchableOpacity
                    onPress={() => handleEditQuantity(item.id)}
                    disabled={isOutOfStock || showTotal}
                  >
                    <Text style={styles.btnText}>{currentQty}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Swipeable>
          );
        }}
        ListEmptyComponent={() => (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ color: "gray", fontSize: 16 }}>
              You don’t have any stock items yet. Add your first item to get started!
            </Text>
          </View>
        )}
      />

      {showTotal && (
        <View style={styles.cartContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total Items: {totalSelected}</Text>

            <View style={styles.totalItemsContainer}>
              <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleConfirm} style={styles.comfirmBtn}>
                <Text style={styles.comfirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      )}
    </View>
  );
};

export default Profile;
