import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { Card } from "../components/Card";
import { PetAvatar } from "../components/PetAvatar";
import { Screen } from "../components/Screen";
import { colors, spacing } from "../theme";
import { RootStackParamList } from "../types";
import { useAppState } from "../state/AppContext";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  const { user, pet, friendsInRoom } = useAppState();
  const friendsStudying = friendsInRoom.length;

  return (
    <Screen contentStyle={styles.screen} edges={["top", "bottom"]} scroll={false}>
      <View style={styles.topBar}>
        <View style={styles.hero}>
          <Image resizeMode="cover" source={require("../../figure/studyapp_logo.jpg")} style={styles.logo} />
          <View style={styles.heroText}>
            <Text style={styles.greeting}>嗨，{user.nickname}</Text>
            <Text style={styles.subtitle}>ID {user.id}</Text>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate("UserProfile")}
          style={({ pressed }) => [styles.userButton, pressed && styles.pressed]}
        >
          <View style={styles.userIcon}>
            <View style={styles.userIconHead} />
            <View style={styles.userIconBody} />
          </View>
          <Text style={styles.userButtonText}>用戶</Text>
        </Pressable>
      </View>

      <Card style={styles.petCard}>
        <PetAvatar type={pet.type} color={pet.color} items={pet.equippedItems} mood="normal" size="medium" />
        <View style={styles.petHeader}>
          <Text style={styles.petName}>目前寵物：{pet.name} Lv. {pet.level}</Text>
          <Text style={styles.petMeta}>EXP {pet.exp}/100 · {pet.color}</Text>
        </View>
      </Card>

      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{user.todayFocusMinutes}</Text>
          <Text style={styles.statLabel}>今日專注分鐘</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{user.coins}</Text>
          <Text style={styles.statLabel}>金幣</Text>
        </View>
      </View>

      <Card>
        <Text style={styles.roomText}>現在有 {friendsStudying} 位朋友正在共讀</Text>
        <Text style={styles.roomSubtext}>大家都帶著寵物入座了，準備好就開始共讀吧。</Text>
      </Card>

      <View style={styles.actions}>
        <AppButton title="開始讀書" onPress={() => navigation.navigate("StartStudy")} />
        <AppButton title="加入共讀教室" variant="secondary" onPress={() => navigation.navigate("StudyRoom")} />
        <View style={styles.twoColumn}>
          <AppButton title="寵物衣櫃" variant="ghost" style={styles.flexButton} onPress={() => navigation.navigate("PetCloset")} />
          <AppButton title="讀書紀錄" variant="ghost" style={styles.flexButton} onPress={() => navigation.navigate("StudyHistory")} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: spacing.sm
  },
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between"
  },
  hero: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: spacing.md,
    minWidth: 0
  },
  logo: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    height: 58,
    width: 58
  },
  heroText: {
    flex: 1,
    gap: spacing.xs,
    minWidth: 0
  },
  greeting: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 0
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 20
  },
  userButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 28,
    borderWidth: 1,
    flexShrink: 0,
    gap: 2,
    height: 54,
    justifyContent: "center",
    width: 54
  },
  userIcon: {
    alignItems: "center",
    height: 22,
    justifyContent: "center",
    width: 22
  },
  userIconHead: {
    backgroundColor: colors.primaryDark,
    borderRadius: 6,
    height: 10,
    width: 10
  },
  userIconBody: {
    backgroundColor: colors.primaryDark,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 9,
    marginTop: 2,
    width: 18
  },
  userButtonText: {
    color: colors.primaryDark,
    fontSize: 10,
    fontWeight: "900"
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }]
  },
  petCard: {
    gap: spacing.sm,
    padding: spacing.sm
  },
  petHeader: {
    gap: spacing.xs
  },
  petName: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 0
  },
  petMeta: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700"
  },
  statsGrid: {
    flexDirection: "row",
    gap: spacing.md
  },
  statBox: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    padding: spacing.sm
  },
  statValue: {
    color: colors.primaryDark,
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 0
  },
  statLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
    marginTop: spacing.xs
  },
  roomText: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "900"
  },
  roomSubtext: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
  },
  actions: {
    gap: spacing.sm
  },
  twoColumn: {
    flexDirection: "row",
    gap: spacing.sm
  },
  flexButton: {
    flex: 1
  }
});
