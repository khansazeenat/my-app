import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import {styles} from '../../assets/styles/home.styles'
import { useSignUp } from '../../context/SignUpContext';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { useAddItem } from "@/context/AddItemContext";
import { useRouter } from 'expo-router';
import { useSoldItems } from '@/context/SoldItemsContext';
import { useMemo } from 'react';

const home = () => {
  const router = useRouter();
  const { soldItems } = useSoldItems(); // get all sold items
  const { businessName, logoUri } = useSignUp();

  const { items } = useAddItem();
// ✅ Filter sold items for today dynamically
  const soldToday = useMemo(() => {
    const now = new Date(); // current time whenever soldItems changes
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date(now);
    endOfToday.setHours(23, 59, 59, 999);

    return soldItems.filter(item => {
      const itemDate = new Date(item.time);
      return itemDate >= startOfToday && itemDate <= endOfToday;
    });
  }, [soldItems]);

  // ✅ Total products sold today
  const totalProductsSold = useMemo(() => {
    return soldToday.reduce((acc, item) => acc + Number(item.qty), 0);
  }, [soldToday]);

  // ✅ Total revenue today
  const totalRevenue = useMemo(() => {
    return soldToday.reduce((acc, item) => acc + Number(item.qty) * Number(item.price), 0);
  }, [soldToday]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
                
        <TouchableOpacity style={[styles.businessImage]}
        onPress={()=> router.replace("/(tabs)/profile/edit-business")}
        >
          {logoUri ? (
            <Image source={{ uri: logoUri }} style={{ width: 60, height: 60, borderRadius: 36 }} />
          ) : (
            <Ionicons name="image" size={24} color={COLORS.placeHolderText} />
          )}
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
            <Ionicons name={logoUri ? "pencil" : "add"} size={12} color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={styles.businessName}>
          Hello 👋, {businessName || 'Business Name'}
        </Text>
      </View>

      {/*Page Content*/}
      <View>   
        {/* Sold tdy */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>Products Sold Today:</Text>
          <Text style={styles.text2}>{totalProductsSold}</Text>
        </View>
        {/* revenue tdy */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>Today's Revenue:</Text>
          <Text style={styles.text2}>{totalRevenue.toLocaleString()} Fbu</Text>
        </View>

        {/* Weekly graphs  */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>This Week</Text>
          <TouchableOpacity style={styles.button}
           onPress={() => router.push('/stock/stockHistory')}>
            <Text style={styles.buttonText}>View Full History</Text>
          </TouchableOpacity>
        </View>
        
        {/* Boxes Container*/}
        <View>          
          <Text style={[styles.text, {fontWeight:"bold"}]}>Today's Activities</Text>
          {/*Dummy Content*/}
        <FlatList   
        
          // 1️⃣ The data you want to display
          data={items}

          // 2️⃣ A unique key for each item (important for performance)
          keyExtractor={(item) => item.id}
          // 3️⃣ Style for the list’s content container
          contentContainerStyle={{ marginTop: 8 }}
          // 4️⃣ How to render each item (like a map function)
          renderItem={({ item }) => (
            <View>
              <Text style={styles.timeText}>{item.itemTime}</Text>
            <View style={styles.textContainer}>
              <Text>You Added a New Stock of {item.itemQty} {item.itemName}.</Text>
            </View>
                           
            </View>
            
          )}
          
        />        
        </View>
    </View>


    </View>
  )
}

export default home