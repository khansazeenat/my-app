// styles profile /create.styles.js
import { StyleSheet } from "react-native";
import { spacing} from "../../constants/colors";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: COLORS.background1,
    padding: 20,
},

//search
searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.SearchBar,
    borderRadius: 12,
    height: 40,
    marginBottom:5,
  },
  searchIcon: {
    marginHorizontal:5,
  },
  SearchInput: {
    borderRadius: 12,
    height: 40,
    padding:10,
    width:"90%",
    fontSize: 16,
    backgroundColor: COLORS.SearchBar,
  },

divider2: {
  height: 1,
  backgroundColor: COLORS.line,
  marginVertical: 10,
},
//stockStuff
itemRow: {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 5,
  backgroundColor:"white",
  padding:10,
  borderRadius:12,
  // 👇 Tiny, soft, natural shadow
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  shadowRadius: 3,
  elevation: 2, // for Android
},

stockDetails:{
  justifyContent:"space-evenly",
},
stockSection: {
  backgroundColor:COLORS.SearchBar,
  padding:10,
  borderRadius:12,
  height:40,
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
  alignSelf:"stretch",
  marginLeft: "auto" 
},
itemImage: {
  borderRadius: 6,
  backgroundColor: COLORS.background2,
  width:48,
  height:48,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 6,
},
itemImageIcon: {
    width:24,
    height:24
},
itemName:{
    color:COLORS.primary,
    fontSize:16,
    fontWeight:"regular",
},
itemStock:{
    color:COLORS.placeHolderText,
    fontSize:14,
    fontWeight:"regular",
},

btnText:{
  fontWeight:'regular',
  fontSize:18,
  color:COLORS.primary,
},
addBtn: {
  width:20,
  height:20,
  justifyContent: "center",
  alignItems: "center",

},

//separator in Flatist
separator: {
  height: "100%",
  backgroundColor:COLORS.placeHolderText,
  width:1,
},

// Cart
cartContainer:{
  marginTop:5,
},
totalContainer:{
  backgroundColor:COLORS.background2,
  padding:10,
  borderTopLeftRadius: 12,  
  borderTopRightRadius: 12,  
},
totalItemsContainer:{
  backgroundColor:COLORS.background1,
  alignContent:"center",
  flexDirection:"row",
  justifyContent:"space-around",
  padding:8,
    // 👇 Tiny, soft, natural shadow
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  shadowRadius: 3,
  elevation: 2, // for Android
},
clearBtn:{
  padding:8,
  borderRadius:12,
  backgroundColor:COLORS.SearchBar,
},
comfirmBtn:{
  backgroundColor:COLORS.add,
  borderRadius:12,
  padding:8,
},
totalText:{
  fontWeight:'semibold',
  fontSize:20,
  color:COLORS.primary,
},
clearText:{
  marginHorizontal:10,
  fontWeight:'semibold',
  fontSize:20,
  color:COLORS.placeHolderText,
},
comfirmText:{
  marginHorizontal:10,
  fontWeight:'semibold',
  fontSize:20,
  color:COLORS.background1,
},


//edit an item
inputTitle:{
  fontSize:14,
  fontWeight:"regular",
},
input: {
    backgroundColor: COLORS.background1,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    fontSize: 16,
    color: COLORS.text,
  },
  errorInput: {
    borderColor: COLORS.remove,
  },
  button: {
    backgroundColor: COLORS.primary,
    opacity:0.5,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  otherButton: {
    backgroundColor: COLORS.background1,
    borderRadius: 12,
    borderColor:COLORS.buttonBorder,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: COLORS.background1,
    fontSize: 18,
    fontWeight: "600",
  },
  otherButtonText: {
    color: COLORS.background1,
    padding: 5,
  },
  backIcon: {
    height: 24,
    width: 24
  },
  backText: {
    color:COLORS.primary,
    fontSize: 20,
    fontWeight: "regular",

  },

  //menu
  section:{
    backgroundColor:COLORS.background2,
  },
  menuTextbg:{
    color:COLORS.background1,
  },
  menuText:{
    color:COLORS.primary,
    fontSize: 18,
    fontWeight: "regular",
  },
});