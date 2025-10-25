// /constants/colors.ts

import { SearchBar } from "react-native-screens";


export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const darkTheme = {
  primary: "#ffffff",
  background1: "#141414ff",
  background2: "#565656ff",
  line: "#bfb9b9ff",
  buttonBorder: "#3A3A3A",
  inputBorder: "#5a5959ff",
  text: "#ffffff",
  text2: "#B3B3B3",
  remove: "#FF5C5C",
  add: "#4CAF50",
  link: "#5C8AFF",
  placeHolderText:"#B3B3B3"
};


const lightTheme = {
  primary: "#000000",
  background1: "#ffffff",
  background2: "#E7E7E9",
  inputBorder: "#7F7F7F",
  buttonBorder: "#000000",
  line: "#B9B9B9",
  text: "#000000",
  text2: "#7F7F7F",
  remove: "#DC3545",
  add: "#2eb74eff",
  link: "#6d80fbf7",
  placeHolderText:"#7F7F7F",
  SearchBar:"#f6f5f3",
};

const THEMES = {
  dark: darkTheme,
  light: lightTheme,
};

export const COLORS = THEMES.light;
