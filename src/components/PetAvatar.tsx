import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "../theme";
import { PetColor, PetItem } from "../types";

export type PetMood = "normal" | "study" | "class";

const capyImages: Record<PetMood, ImageSourcePropType> = {
  normal: require("../../figure/capy_normal.png"),
  study: require("../../figure/capy_study.png"),
  class: require("../../figure/capy_class.png")
};

const colorMap: Record<PetColor, string> = {
  原色: "#DDB892",
  白色: "#F7F1EA",
  焦糖色: "#C9874A",
  灰色: "#B9B8B2"
};

export function PetAvatar({
  type,
  color = "原色",
  items = [],
  mood = "normal",
  size = "large"
}: {
  type: string;
  color?: PetColor;
  items?: PetItem[];
  mood?: PetMood;
  size?: "small" | "medium" | "large";
}) {
  return (
    <View style={[styles.wrap, styles[`${size}Wrap`], { backgroundColor: colorMap[color] }]}>
      <Image
        accessibilityLabel={`${type} ${mood}`}
        resizeMode="contain"
        source={capyImages[mood]}
        style={styles[`${size}Image`]}
      />
      {items.length > 0 ? (
        <View style={[styles.badge, size === "small" ? styles.smallBadge : null]}>
          <Text style={styles.badgeText}>{items.join("・")}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    overflow: "hidden"
  },
  largeWrap: {
    minHeight: 210,
    width: "100%"
  },
  mediumWrap: {
    minHeight: 154,
    width: "100%"
  },
  smallWrap: {
    height: 70,
    width: 70
  },
  largeImage: {
    height: 180,
    width: "100%"
  },
  mediumImage: {
    height: 132,
    width: "100%"
  },
  smallImage: {
    height: 62,
    width: 62
  },
  badge: {
    bottom: spacing.sm,
    backgroundColor: "rgba(255,255,255,0.82)",
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    maxWidth: "88%",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    position: "absolute"
  },
  smallBadge: {
    display: "none"
  },
  badgeText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0
  }
});
