import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import SafeScreen from "@/assets/components/SafeScreen";
import { COLORS } from "../../constants/colors";
import { styles } from "@/assets/styles/home.styles";
import { useSoldItems, SoldItem } from "../../context/SoldItemsContext";
import { getTodayData, getWeekData, getMonthData, getCustomData } from "../../context/history";

const HistoryPage = () => {
  const router = useRouter();
  const { soldItems} = useSoldItems();

  // ---------- State ----------
  const [activeTab, setActiveTab] = useState<"today" | "week" | "month" | "custom">("today");
  const [customStart, setCustomStart] = useState<Date>(new Date());
  const [customEnd, setCustomEnd] = useState<Date>(new Date());

  // ---------- Compute current data based on active tab ----------
  const currentData = useMemo(() => {
    switch (activeTab) {
      case "today":
        return getTodayData(soldItems);
      case "week":
        return getWeekData(soldItems);
      case "month":
        return getMonthData(soldItems);
      case "custom":
        return getCustomData(soldItems, customStart, customEnd);
      default:
        return { totalSold: 0, revenue: 0, topProducts: [], outOfStock: [] };
    }
  }, [activeTab, soldItems, customStart, customEnd]);

  return (
    <SafeScreen>
      <ScrollView style={styles.container2}>
        {/* ---------- Header ---------- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.backText}>Stock Details</Text>
        </View>

        {/* ---------- Tabs ---------- */}
        <View style={styles.tabsContainer}>
          {["today", "week", "month", "custom"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab as "today" | "week" | "month" | "custom")}
              style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ---------- Custom Date Picker ---------- */}
        {activeTab === "custom" && (
          <View
            style={[
              styles.card,
              { flexDirection: "row", justifyContent: "space-evenly", alignContent: "center" },
            ]}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={styles.itemText}>Start Date:</Text>
              <DateTimePicker
                value={customStart}
                mode="date"
                display="default"
                onChange={(event, date) => date && setCustomStart(date)}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.itemText}>End Date:</Text>
              <DateTimePicker
                value={customEnd}
                mode="date"
                display="default"
                onChange={(event, date) => date && setCustomEnd(date)}
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

        {/* ---------- Top Products ---------- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Top Sold Products</Text>
          {currentData.topProducts.length === 0 ? (
            <Text style={styles.itemText}>No information yet</Text>
          ) : (
            currentData.topProducts.slice(0, 3).map((product) => (
              <View key={product.id} style={styles.productRow}>
                <Image
                  source={{ uri: product.image || "https://via.placeholder.com/50" }}
                  style={styles.productImage}
                />
                <View style={{ marginLeft: 10, flexDirection: "row", justifyContent: "space-between", flex: 1 }}>
                  <Text style={styles.text4}>{product.name}</Text>
                  <Text style={styles.text3}>{product.sold}</Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* ---------- Out of Stock ---------- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Out of Stock</Text>
          {currentData.outOfStock.length === 0 ? (
            <Text style={styles.itemText}>None</Text>
          ) : (
            currentData.outOfStock.map((product, index) => (
              <View key={product.id} style={[styles.productRow, { gap: 10 }]}>
                <Image
                  source={{ uri: product.image || "https://via.placeholder.com/50" }}
                  style={styles.productImage}
                />
                <Text style={styles.text4}>{index + 1}.</Text>
                <Text style={styles.text4}>{product.name}</Text>
              </View>
            ))
          )}
        </View>

        {/* ---------- Monthly Graph Placeholder ---------- */}
        {activeTab === "month" && (
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
