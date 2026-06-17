import { StyleSheet, Text } from "react-native";

import { colors } from "../theme";

export function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0
  }
});
