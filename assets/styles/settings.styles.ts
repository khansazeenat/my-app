// styles/create.styles.js
import { StyleSheet } from "react-native";
import { spacing} from "../../constants/colors";
import { COLORS } from "../../constants/colors";


export const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: COLORS.background2,
    padding: 20,
    justifyContent:"flex-start",
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
    fontWeight: "bold",
    textAlign:"center"
  },
  menuTextbg:{
    backgroundColor:COLORS.background1,
    padding:spacing.sm,
    borderRadius:12
  },
  menuText:{
    color:COLORS.primary,
    fontSize: 16,
    fontWeight: "regular",
    marginLeft: 10,

  },
  //separator
separator: {
  height: 1,
  backgroundColor: 'rgba(60, 60, 67, 0.36)',
  marginVertical: 6,
  marginLeft: 30,
},
overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)", // dimmed background
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background1 || "#F5F5F5",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 30,
  },
  dragLine: {
    width: 60,
    height: 4,
    backgroundColor: "rgba(0,0,0,0.2)",
    alignSelf: "center",
    borderRadius: 2,
    marginVertical: 8,
  },
  menuContainer: {
    backgroundColor:COLORS.background1,
    borderRadius: 12,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuSeparator: {
    height: 1,
    marginLeft: 40,
    marginRight: 6,
    backgroundColor: "rgba(60,60,67,0.36)",
  },


//subscription specific
subscriptionbody:{
  backgroundColor:COLORS.background1,
  padding:20,
  borderRadius:12,
},
  title: {
    fontSize: 24,
    color: COLORS.text,
  },
    subtitleText:{
    fontSize:16,
    fontWeight: "medium",
    color:COLORS.text2
  },
 activeText:{
    color:COLORS.primary,
    fontSize:24,
    textAlign: "center",
    fontWeight: "bold",    
  },
  contactContainer:{
    flexDirection:"row",
    alignItems:'center',
    marginTop:10,
    justifyContent:'flex-start',
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    marginTop:10
  },
  buttonText: {
    color: COLORS.background1,
    fontSize: 18,
    fontWeight: "bold",
  },
});
