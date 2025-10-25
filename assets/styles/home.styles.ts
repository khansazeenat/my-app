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
businessName:{
    color:COLORS.primary,
    fontSize:16,
    fontWeight:"regular",
},
businessImage:{
    borderRadius:'50%',
    backgroundColor:COLORS.primary,
    alignItems:'center',
    justifyContent:'center',
    height:60,
    width:60
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
    padding:spacing.sm,
    borderRadius:12,
    marginBottom:spacing.md
},
text:{
    color:COLORS.primary,
    fontSize:16,
    fontWeight:"regular",
}})