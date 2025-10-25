// styles/auth.styles.js
import { StyleSheet } from "react-native";
import { spacing  } from "../../constants/colors";
import { COLORS } from "../../constants/colors";



export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background1,
    padding: 24,
  },

//titles
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
  },
  normalTitle:{
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",

  },
  subtitleText:{
    textAlign: "center",
    fontSize:16,
    fontWeight: "medium",
    color:COLORS.text2
  },

//Inputs 
  inputWrapper: {
    marginBottom:spacing.sm, // space between inputs
  },
  label: {
    fontSize: 14,
    fontWeight: "medium",
    marginBottom: spacing.xs, // 4px space between label and input
    color: COLORS.text,
  },  
  inputTitle:{
    fontSize:14, 
    fontWeight:"medium",
  },
  input: {
    backgroundColor: COLORS.background1,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    fontSize: 14,
    color: COLORS.text,
    paddingHorizontal: 12,
    height:44,
  },
  errorInput: {
    borderColor: COLORS.remove,
  },


  linkText: {    
    marginTop:spacing.sm, // space between inputs
    color: COLORS.link,
    fontSize: 14,
    textAlign: "right",
    fontWeight:"medium",
  },

  //buttons
  placeHolderIcon:{
    color: COLORS.placeHolderText
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
  normalText:{
    color:COLORS.primary,
    fontSize:14,
    textAlign: "center",
    fontWeight: "medium",
    
  },
  orContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 14,   // spacing above and below the OR line
  gap: spacing.sm,               // space between line and text
  },
  line: {
    flex: 1,              // takes up remaining horizontal space
    height: 1,            // thickness of the line
    backgroundColor:COLORS.inputBorder, // gray line color
    alignSelf: 'center',  // vertically center with text
  },



  verificationContainer: {
    flex: 1,
    backgroundColor: COLORS.background1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  verificationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
  },
  verificationInput: {
    backgroundColor: COLORS.background1,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    fontSize: 16,
    color: COLORS.text,
    width: "100%",
    textAlign: "center",
    letterSpacing: 2,
  },
  // 🔴 Error styles
  errorBox: {
    backgroundColor: "#FFE5E5",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.remove,
    alignItems: "center",
    width: "100%",
  },
  errorText: {
    color: COLORS.text,
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
  },
});
