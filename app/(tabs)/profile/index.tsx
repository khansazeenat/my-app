import { View, Text,TextInput,Dimensions, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../../../assets/styles/profile.styles'
import { useRouter } from 'expo-router'
import { COLORS } from '@/constants/colors';
import { Ionicons, MaterialCommunityIcons, Foundation } from '@expo/vector-icons'
import MenuModal from '@/app/(tabs)/profile/humburger-menu';
import { useSignUp } from '@/context/SignUpContext'; // 👈 import context
import { useAddItem } from '@/context/AddItemContext';

// Get screen height
const { height } = Dimensions.get('window');

// Example spacing based on screen height
const space = {
menuToHeader: height * 0.01,     // 2% of screen height
};
const Profile = () => {
  const router = useRouter();
  const { businessName, logoUri } = useSignUp();
  // const { items } = useAddItem();
  const items = [
  {
    id: "1",
    itemName: "Coca-Cola 500ml",
    itemQty: 24,
    itemImage: "https://images.unsplash.com/photo-1602009486820-9b3e0f6c1f8e",
  },
  {
    id: "2",
    itemName: "Sprite 500ml",
    itemQty: 18,
    itemImage: "https://images.unsplash.com/photo-1625938144515-94dca5c0021b",
  },
  {
    id: "3",
    itemName: "Fanta Orange 500ml",
    itemQty: 15,
    itemImage: "https://images.unsplash.com/photo-1625938146084-33a907be0a47",
  },
  {
    id: "4",
    itemName: "Bottled Water 1L",
    itemQty: 30,
    itemImage: "https://images.unsplash.com/photo-1585238342028-1f8b99bca54b",
  },
  {
    id: "5",
    itemName: "Bread Loaf",
    itemQty: 12,
    itemImage: "https://images.unsplash.com/photo-1608198093002-ad4e00548402",
  },
  {
    id: "6",
    itemName: "Cooking Oil 1L",
    itemQty: 20,
    itemImage: "https://images.unsplash.com/photo-1600172454370-7e93074fdaa3",
  },
  {
    id: "7",
    itemName: "Rice (5kg Bag)",
    itemQty: 10,
    itemImage: "https://images.unsplash.com/photo-1625938468029-301c820e9f37",
  },
  {
    id: "8",
    itemName: "Sugar 1kg",
    itemQty: 25,
    itemImage: "https://images.unsplash.com/photo-1587734844765-6c6c4b60a05e",
  },
  {
    id: "9",
    itemName: "Salt 500g",
    itemQty: 40,
    itemImage: "https://images.unsplash.com/photo-1625938151435-30c22a15f13a",
  },
  {
    id: "10",
    itemName: "Tomato Sauce",
    itemQty: 14,
    itemImage: "https://images.unsplash.com/photo-1625938181538-65d36e08190d",
  },
];

  const [searchText, setSearchText] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);


  return (
    <View style={styles.container}>
      <TouchableOpacity style={{alignItems: "flex-end"}} onPress={() => setMenuVisible(true)}>
        <Ionicons name="menu" size={24} color={COLORS.primary} />
      </TouchableOpacity>
      <MenuModal visible={menuVisible} onClose={() => setMenuVisible(false)} />


      {/* Seach Bar */}
      <View style={[styles.searchContainer,{marginTop:space.menuToHeader}]}>
      <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />

      <TextInput
        style={styles.SearchInput}
        placeholder="Search..."
        placeholderTextColor={COLORS.placeHolderText}
        value={searchText}
        onChangeText={setSearchText}
      />
      
    </View>
      {/* Item List */}
      <FlatList
        // 1️⃣ The data you want to display
        data={items}
        // 2️⃣ A unique key for each item (important for performance)
        keyExtractor={(item) => item.id}
        // 3️⃣ Style for the list’s content container
        contentContainerStyle={{ marginTop: 8 }}
        // 4️⃣ How to render each item (like a map function)
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            {/* Item Image/Icon */}
            <View style={styles.itemImage}>
              {item.itemImage ? (
                <Image
                source={{uri: item.itemImage}}
                style={styles.itemImage}
                />
              ) :(
                
              <MaterialCommunityIcons
                name="image-plus"
                size={24}
                color={COLORS.placeHolderText}
                style={styles.itemImageIcon}
              />
              )}
            </View>
            <View style={styles.stockDetails}>
            {/* Item Name and price */}
            <Text style={styles.itemName}>{item.itemName}</Text>
              <Text style={styles.itemStock}>{item.itemQty} in Stock</Text>
            </View>
            {/* Stock and Buttons */}
            <View style={styles.stockSection}>
              <TouchableOpacity style={styles.addBtn}>
                <Text style={styles.btnText}>-</Text>
              </TouchableOpacity>
              <View style={styles.separator}/>
              <TouchableOpacity style={styles.addBtn}>
                <Text style={styles.btnText}>3</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={{padding: 20, alignItems: "center" }}>
            <Text style={{ color: "gray", fontSize: 16 }}>
              You don’t have any stock items yet. Add your first item to get started!
            </Text>
          </View>
        )}
      />

      {/* Total */}
      <View style={styles.cartContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Items: {}</Text>
        </View>
        <View  style={styles.totalItemsContainer}>
          <TouchableOpacity style={styles.clearBtn}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.comfirmBtn}>
            <Text style={styles.comfirmText}>Comfirm</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default Profile
