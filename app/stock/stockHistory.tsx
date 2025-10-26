// /components/HistoryPage.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import { getTodayData, getWeekData, getMonthData, getCustomData } from "../../assets/components/history";
import { styles } from "@/assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useRouter } from "expo-router";
import DateTimePicker from '@react-native-community/datetimepicker';
import SafeScreen from '@/assets/components/SafeScreen';


const HistoryPage = () => {
  const router = useRouter();
    // ---------- State ----------
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'month' | 'custom'>('today');
  const [customStart, setCustomStart] = useState<Date>(new Date());
  const [customEnd, setCustomEnd] = useState<Date>(new Date());

  // ---------- Get data based on active tab ----------
  let currentData;
  switch (activeTab) {
    case 'today':
      currentData = getTodayData();
      break;
    case 'week':
      currentData = getWeekData();
      break;
    case 'month':
      currentData = getMonthData();
      break;
    case 'custom':
      currentData = getCustomData(customStart, customEnd);
      break;
  }

  return (
    <SafeScreen>
    <ScrollView style={styles.container2}>
      <View style={styles.header}>
            <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.backText}>Edit Item</Text>
          </View>
      {/* ---------- Tab Navigation ---------- */}
      <View style={styles.tabsContainer}>
        {['today', 'week', 'month', 'custom'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as 'today' | 'week' | 'month' | 'custom')}
            style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* ---------- Custom Tab ---------- */}
      {activeTab === 'custom' && (
        <View style={[styles.card, {flexDirection:"row", justifyContent:"space-evenly",alignContent:"center"}]}>
          <View style={{alignItems:"center"}}>
            <Text style={styles.itemText}>Start Date:</Text>
            <DateTimePicker
              value={customStart}
              mode="date"
              display="default"
              onChange={(event, date) => {
                if (date) setCustomStart(date);
              }}
            />
          </View>
          <View style={{alignItems:"center"}}>
            <Text style={styles.itemText}>End Date:</Text>
            <DateTimePicker
              value={customEnd}
              mode="date"
              display="default"
              onChange={(event, date) => {
                if (date) setCustomEnd(date);
              }}
            />
          </View>
        </View>
      )}

      {/* ---------- Summary Cards ---------- */}
      <View style={styles.card}>
        <Text style={styles.text}>Total Sold:</Text>
        <Text style={styles.text2}>{currentData.totalSold}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.text}>Revenue:</Text>
        <Text style={styles.text2}>{currentData.revenue} Fbu</Text>
      </View>

      {/* ---------- Top Products Card ---------- */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Top Sold Products</Text>
        {currentData.topProducts.length === 0 ? (
          <Text style={styles.itemText}>No information Yet</Text>
        ) : (
          // Only show top 3 products
          currentData.topProducts.slice(0, 3).map((product) => (
            <View key={product.id} style={styles.productRow}>
              {/* Product Image */}
              <Image
                source={{ uri: product.image || "https://via.placeholder.com/50" }}
                style={styles.productImage}
              />
              {/* Name & Quantity */}
              <View style={{ marginLeft: 10, flexDirection:"row", justifyContent:"space-between",flex:1}}>
                <Text style={styles.text4}>{product.name}</Text>
                <Text style={styles.text3}>{product.sold}</Text>
              </View>
            </View>
          ))
        )}
      </View>

      {/* ---------- Out of Stock Card ---------- */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Out of Stock</Text>
        {currentData.outOfStock.length === 0 ? (
          <Text style={styles.itemText}>None</Text>
        ) : (
          currentData.outOfStock.map((product, index) => (
            <View key={product.id} style={[styles.productRow, {gap:10}]}>
              {/* Product Image */}
              <Image
                source={{ uri: product.image || "https://via.placeholder.com/50" }}
                style={styles.productImage}
              />              
              {/* Index Number */}
              <Text style={styles.text4}>{index + 1}.</Text>
              {/* Name */}
              <Text style={styles.text4}>{product.name}</Text>
            </View>
          ))
        )}
      </View>

      {/* ---------- Graph Placeholder ---------- */}
      {activeTab === 'month' && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Monthly Graph</Text>
          <View style={styles.graphPlaceholder}>
            <Text>Graph will go here</Text>
          </View>
        </View>
      )}


    </ScrollView>
    </SafeScreen>
  );
};


export default HistoryPage;
