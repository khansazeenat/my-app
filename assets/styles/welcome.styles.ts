import { StyleSheet } from "react-native";
import { spacing } from "../../constants/colors";
import { COLORS } from "../../constants/colors";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background1,
    padding: 24,
  },
// logoimage
logoImage:{
  width: 250,
  alignSelf: "center",
  height:250
}, 

//titles
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
  },
  subtitleText:{
    textAlign: "center",
    fontSize:16,
    fontWeight: "medium",
    color:COLORS.text
  },

  normalText:{
    color:COLORS.primary,
    fontSize:14,
    textAlign: "center",
    fontWeight: "medium",
    
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.background1,
    fontSize: 18,
    fontWeight: "bold",
  },
  otherButton: {    
    backgroundColor: COLORS.background1,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    borderColor:COLORS.buttonBorder,
    borderWidth: 1,
  },
  otherButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "semibold",
    
  },
});
