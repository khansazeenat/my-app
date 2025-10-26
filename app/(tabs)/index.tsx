import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import {styles} from '../../assets/styles/home.styles'
import { useSignUp } from '../../context/SignUpContext';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { useAddItem } from "@/context/AddItemContext";
import { useRouter } from 'expo-router';

const home = () => {
  const router = useRouter();
  
  const { businessName, logoUri } = useSignUp();
  const { items } = useAddItem();

  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
                
        <TouchableOpacity style={[styles.businessImage]}>
          {logoUri ? (
            <Image source={{ uri: logoUri }} style={{ width: 60, height: 60, borderRadius: 36 }} />
          ) : (
            <Ionicons name="image" size={36} color={COLORS.placeHolderText} />
          )}
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
          <Text style={styles.text2}>12</Text>
        </View>
        {/* revenue tdy */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>Today's Revenue:</Text>
          <Text style={styles.text2}>200,000 Fbu</Text>
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
              <Text>You just Added a New Stock of {item.itemQty} {item.itemName}.</Text>
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