import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";
import { PetAvatar } from "../components/PetAvatar";
import { Screen } from "../components/Screen";
import { SectionTitle } from "../components/SectionTitle";
import { useAppState } from "../state/AppContext";
import { colors, spacing } from "../theme";
import { PetColor, PetItem } from "../types";

const colorsOptions: PetColor[] = ["原色", "白色", "焦糖色", "灰色"];
const itemOptions: PetItem[] = ["圓眼鏡", "小書包", "小帽子"];

export function PetClosetScreen() {
  const { user, pet, changePetColor, togglePetItem } = useAppState();

  return (
    <Screen>
      <Card>
        <PetAvatar type={pet.type} color={pet.color} items={pet.equippedItems} />
        <View style={styles.metaRow}>
          <View>
            <Text style={styles.petName}>{pet.name} Lv. {pet.level}</Text>
            <Text style={styles.meta}>EXP {pet.exp}/100</Text>
          </View>
          <View style={styles.coinPill}>
            <Text style={styles.coinText}>{user.coins} 金幣</Text>
          </View>
        </View>
      </Card>

      <Card>
        <SectionTitle>更換顏色</SectionTitle>
        <View style={styles.chipWrap}>
          {colorsOptions.map((option) => (
            <Chip
              key={option}
              label={option}
              value={option}
              selected={pet.color === option}
              onSelect={changePetColor}
            />
          ))}
        </View>
      </Card>

      <Card>
        <SectionTitle>配件</SectionTitle>
        <Text style={styles.helper}>第一版先用 badge 顯示目前裝備，點選即可套用或卸下。</Text>
        <View style={styles.itemList}>
          {itemOptions.map((item) => {
            const equipped = pet.equippedItems.includes(item);
            return (
              <View key={item} style={styles.itemRow}>
                <View>
                  <Text style={styles.itemName}>{item}</Text>
                  <Text style={styles.itemMeta}>{equipped ? "已套用" : "可購買配件"}</Text>
                </View>
                <AppButton
                  title={equipped ? "卸下" : "套用"}
                  variant={equipped ? "ghost" : "secondary"}
                  style={styles.itemButton}
                  onPress={() => togglePetItem(item)}
                />
              </View>
            );
          })}
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  petName: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900"
  },
  meta: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700",
    marginTop: spacing.xs
  },
  coinPill: {
    backgroundColor: "#FFF2D6",
    borderColor: "#ECD7A8",
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  coinText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900"
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  helper: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19
  },
  itemList: {
    gap: spacing.sm
  },
  itemRow: {
    alignItems: "center",
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
    padding: spacing.md
  },
  itemName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900"
  },
  itemMeta: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
    marginTop: spacing.xs
  },
  itemButton: {
    minHeight: 42,
    minWidth: 84
  }
});
