import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "../theme";

export function PhotoCheckIn({
  title,
  description,
  taken,
  onTakePhoto
}: {
  title: string;
  description: string;
  taken: boolean;
  onTakePhoto: () => void;
}) {
  return (
    <View style={[styles.preview, taken && styles.previewTaken]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderIcon}>{taken ? "✓" : "📷"}</Text>
        <Text style={styles.placeholderText}>{taken ? "已加入打卡照片 placeholder" : "照片預覽區"}</Text>
      </View>
      <Pressable onPress={onTakePhoto} style={({ pressed }) => [styles.photoButton, pressed && styles.pressed]}>
        <Text style={styles.photoButtonText}>{taken ? "重新模擬拍照" : "模擬拍照打卡"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  preview: {
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.md
  },
  previewTaken: {
    backgroundColor: "#EEF6F0",
    borderColor: colors.primary
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
  },
  placeholder: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: colors.border,
    borderRadius: 8,
    borderStyle: "dashed",
    borderWidth: 1,
    gap: spacing.xs,
    minHeight: 120,
    justifyContent: "center"
  },
  placeholderIcon: {
    color: colors.primaryDark,
    fontSize: 30,
    fontWeight: "900"
  },
  placeholderText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0
  },
  photoButton: {
    alignItems: "center",
    backgroundColor: colors.blue,
    borderRadius: 18,
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: spacing.md
  },
  photoButtonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0
  },
  pressed: {
    opacity: 0.75
  }
});
