import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

import { colors, spacing } from "../theme";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
};

export function AppButton({ title, onPress, variant = "primary", style }: AppButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.base, styles[variant], pressed && styles.pressed, style]}
    >
      <Text style={[styles.text, variant === "ghost" && styles.ghostText, variant === "danger" && styles.dangerText]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderRadius: 18,
    justifyContent: "center",
    minHeight: 50,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  primary: {
    backgroundColor: colors.primary
  },
  secondary: {
    backgroundColor: colors.secondary
  },
  ghost: {
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.border,
    borderWidth: 1
  },
  danger: {
    backgroundColor: "#FBEAEA",
    borderColor: "#F0C9C9",
    borderWidth: 1
  },
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.99 }]
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0
  },
  ghostText: {
    color: colors.text
  },
  dangerText: {
    color: colors.danger
  }
});
