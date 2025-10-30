// styles/create.styles.js
import { StyleSheet } from "react-native";
import { spacing,COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({

container: {
    flex: 1,
    backgroundColor: COLORS.background2,
    padding: 20,
},
headerContainer:{
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: spacing.md,
    gap:spacing.md,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor:COLORS.background1,
    marginHorizontal:-20,
    marginTop:-20,
},
  header:{
  flexDirection: 'row',         // Puts children in a row, not column
  alignItems: 'center',         // Vertically centers the back button and title
  gap: 10,                      // Space between back button and title (optional)
  paddingVertical: 10, 
  marginBottom:10,         
},  
  backText: {
    color:COLORS.primary,
    fontSize: 20,
    fontWeight: "regular",

  },
businessName:{
    color:COLORS.primary,
    fontSize:16,
    fontWeight:"bold",
},
businessImage:{
    borderRadius:'50%',
    borderWidth: 1,
    alignItems:'center',
    justifyContent:'center',
    height:60,
    width:60,
    borderColor:COLORS.placeHolderText,
},    

activitiesTitle: {
    fontSize:24,
    fontWeight:"bold",
    color:COLORS.primary,
},
timeText: {
    color:COLORS.primary,
    fontSize:12,
    fontWeight:"regular",
    textAlign:'right',
    marginRight:spacing.sm,
    marginBottom:spacing.xs
},
textContainer:{
    backgroundColor:COLORS.background1,
    padding:20,
    borderRadius:12,
    marginBottom:spacing.md,    
    justifyContent:'space-between',
    // 👇 Tiny, soft, natural shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2, // for Android
},
text:{
    color:COLORS.primary,
    fontSize:16,
    fontWeight:"regular",
}
,
text2:{
    color:COLORS.primary,
    fontSize:24,
    fontWeight:"bold",
},
button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    marginTop:20,
    width:200,
    alignSelf:"center",
  },
  buttonText: {
    color: COLORS.background1,
    fontSize: 14,
    fontWeight: "bold",
  },
//Stock page Styles
  container2: {
    flex: 1,
    padding: 20,
    backgroundColor:COLORS.background2,
  },
    tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth:0,
    borderRadius:99,
  },
  tabButtonActive: {
    backgroundColor:COLORS.background1,
    borderWidth: 1,
    borderColor:COLORS.placeHolderText,
  },
  tabText: {
    fontWeight: "500",
    color: COLORS.placeHolderText,
  },
  tabTextActive: {
    fontWeight: "bold",
    color: COLORS.primary,
  },
  card: {    
    backgroundColor:COLORS.background1,
    padding:20,
    borderRadius:12,
    marginBottom:spacing.md,    
    justifyContent:'space-between',
    // 👇 Tiny, soft, natural shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2, // for Android
  },
  sectionTitle: {    
    color:COLORS.primary,
    fontSize:16,
    fontWeight:"regular",
  },
  itemText: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 4,
  },
  graphPlaceholder: {
    height: 150,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  productRow: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 10,
},
productImage: {
  borderRadius: 6,
  backgroundColor: COLORS.background2,
  width:48,
  height:48,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 6,
},
text3:{
    color:COLORS.primary,
    fontSize:14,
    fontWeight:"bold",
},
text4:{
    color:COLORS.primary,
    fontSize:14,
},
})