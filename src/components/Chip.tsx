import { Pressable, StyleSheet, Text } from "react-native";

import { colors, spacing } from "../theme";

type ChipProps<T extends string | number> = {
  label: string;
  value: T;
  selected: boolean;
  onSelect: (value: T) => void;
};

export function Chip<T extends string | number>({ label, value, selected, onSelect }: ChipProps<T>) {
  return (
    <Pressable onPress={() => onSelect(value)} style={[styles.chip, selected && styles.selected]}>
      <Text style={[styles.text, selected && styles.selectedText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignItems: "center",
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    minHeight: 40,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  selected: {
    backgroundColor: "#E8F2EA",
    borderColor: colors.primary
  },
  text: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0
  },
  selectedText: {
    color: colors.primaryDark
  }
});
