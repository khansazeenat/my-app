// styles/create.styles.js
import { StyleSheet } from "react-native";
import { spacing } from "../../constants/colors";
import { COLORS} from '@/constants/colors'


export const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: COLORS.background1,
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
businessDetailheader:{
  flexDirection: 'row',         // Puts children in a row, not column
  alignItems: 'center',         // Vertically centers the back button and title
  justifyContent:'space-between',                    // Space between back button and title (optional)
  paddingVertical: 10, 
  marginBottom:10,         
},
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
  },
  otherButton: {
    backgroundColor: COLORS.background1,
    borderRadius: 12,
    borderColor:COLORS.buttonBorder,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.background1,
    fontSize: 18,
    fontWeight: "600",
  },
  saveDetailBtn:{
    backgroundColor: COLORS.add,
    borderRadius:99,
    padding: 5,
    width:70,
    height:30,
    alignItems:'center',
  },
  saveDetatailText:{
    color: COLORS.background1,
    fontSize: 18,
    
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
});
