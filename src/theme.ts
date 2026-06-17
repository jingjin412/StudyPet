import { StyleSheet } from "react-native";

export const colors = {
  background: "#FFF8ED",
  surface: "#FFFFFF",
  surfaceAlt: "#F8F5EF",
  primary: "#8FB996",
  primaryDark: "#5D8C68",
  secondary: "#DDB892",
  blue: "#A7C7D9",
  text: "#3E3E3E",
  muted: "#7B756E",
  border: "#E9DDCE",
  danger: "#C76D6D"
};

export const shadows = StyleSheet.create({
  soft: {
    shadowColor: "#7B5F3E",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3
  }
});

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 22,
  xl: 30
};
