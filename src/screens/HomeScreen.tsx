import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

import { Screen } from "../components/Screen";
import { useAppState } from "../state/AppContext";
import { colors, spacing } from "../theme";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  const { user, pet, friendsInRoom } = useAppState();
  const friendsStudying = friendsInRoom.length;
  const expProgress = `${pet.exp}%` as `${number}%`;

  return (
    <Screen contentStyle={styles.screen} edges={["top", "bottom"]} scroll={false}>
      <View style={styles.topBar}>
        <View style={styles.titleBlock}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.greeting}>
            嗨，{user.nickname}
          </Text>
          <Text numberOfLines={1} style={styles.userId}>
            ID {user.id}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate("UserProfile")}
          style={({ pressed }) => [styles.profileButton, pressed && styles.pressed]}
        >
          <UserIcon />
          <View style={styles.noticeDot} />
        </Pressable>
      </View>

      <View style={styles.heroCard}>
        <ImageBackground
          imageStyle={styles.heroBackground}
          resizeMode="cover"
          source={require("../../figure/classroom.png")}
          style={styles.heroBackgroundWrap}
        >
          <View style={styles.heroWash} />
          <View style={styles.heroContent}>
            <View style={styles.heroHeader}>
              <View style={styles.petTitleWrap}>
                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.petNickname}>
                  小書包
                </Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => navigation.navigate("PetCloset")}
                  style={({ pressed }) => [styles.editPetButton, pressed && styles.pressed]}
                >
                  <Text style={styles.editPetText}>筆</Text>
                </Pressable>
              </View>
              <View style={styles.heartPill}>
                <Text style={styles.heart}>♥</Text>
                <Text style={styles.heartValue}>98</Text>
              </View>
            </View>

            <View style={styles.levelPill}>
              <Text style={styles.levelText}>
                {pet.name} Lv.{pet.level}
              </Text>
            </View>

            <View style={styles.expBlock}>
              <View style={styles.expRow}>
                <Text style={styles.expLabel}>EXP</Text>
                <Text style={styles.expValue}>{pet.exp} / 100</Text>
              </View>
              <View style={styles.expTrack}>
                <View style={[styles.expFill, { width: expProgress }]} />
              </View>
            </View>

            <View style={styles.petTraits}>
              <Text style={styles.traitText}>{pet.color}</Text>
              <View style={styles.traitDivider} />
              <Text style={styles.traitText}>{pet.equippedItems.join("、") || "無配件"}</Text>
            </View>

            <Image resizeMode="contain" source={require("../../figure/capy_normal.png")} style={styles.capyImage} />
          </View>
        </ImageBackground>
      </View>

      <View style={styles.statsRow}>
        <StatItem label="今日專注" value={user.todayFocusMinutes} suffix="分鐘" icon="時" />
        <StatItem label="金幣" value={user.coins} icon="金" />
        <StatItem label="朋友共讀中" value={friendsStudying} suffix="位" icon="友" />
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => navigation.navigate("StartStudy")}
        style={({ pressed }) => [styles.primaryCta, pressed && styles.pressed]}
      >
        <Text style={styles.primaryIcon}>書</Text>
        <View style={styles.ctaTextWrap}>
          <Text style={styles.primaryCtaText}>開始讀書</Text>
          <Text style={styles.primaryCtaSubtext}>專注當下，和水豚一起成長！</Text>
        </View>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={() => navigation.navigate("StudyRoom")}
        style={({ pressed }) => [styles.roomCard, pressed && styles.pressed]}
      >
        <ImageBackground
          imageStyle={styles.roomThumbImage}
          resizeMode="cover"
          source={require("../../figure/classroom.png")}
          style={styles.roomThumb}
        >
          <View style={styles.roomThumbOverlay} />
        </ImageBackground>
        <View style={styles.roomInfo}>
          <View style={styles.roomTitleRow}>
            <Text numberOfLines={1} style={styles.roomTitle}>
              晚自習 A 教室
            </Text>
            <Text style={styles.publicPill}>公開</Text>
          </View>
          <Text style={styles.roomMeta}>{friendsStudying} 位朋友正在共讀</Text>
          <View style={styles.friendFaces}>
            {friendsInRoom.slice(0, 3).map((friend) => (
              <View key={friend.name} style={styles.friendFace}>
                <Image resizeMode="contain" source={require("../../figure/capy_class.png")} style={styles.friendFaceImage} />
              </View>
            ))}
          </View>
        </View>
        <View style={styles.joinButton}>
          <Text style={styles.joinText}>加入教室</Text>
        </View>
      </Pressable>

      <View style={styles.shortcutRow}>
        <ShortcutTile label="寵物衣櫃" icon="衣" onPress={() => navigation.navigate("PetCloset")} />
        <ShortcutTile label="讀書紀錄" icon="錄" onPress={() => navigation.navigate("StudyHistory")} />
        <ShortcutTile label="個人資料" icon="人" onPress={() => navigation.navigate("UserProfile")} />
      </View>
    </Screen>
  );
}

function StatItem({
  icon,
  label,
  suffix,
  value
}: {
  icon: string;
  label: string;
  suffix?: string;
  value: number;
}) {
  return (
    <View style={styles.statItem}>
      <View style={styles.statIconCircle}>
        <Text style={styles.statIconText}>{icon}</Text>
      </View>
      <View style={styles.statTextBlock}>
        <Text numberOfLines={1} style={styles.statLabel}>
          {label}
        </Text>
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.statValue}>
          {value}
          {suffix ? <Text style={styles.statSuffix}> {suffix}</Text> : null}
        </Text>
      </View>
    </View>
  );
}

function ShortcutTile({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.shortcutTile, pressed && styles.pressed]}>
      <View style={styles.shortcutIconBox}>
        <Text style={styles.shortcutIcon}>{icon}</Text>
      </View>
      <Text numberOfLines={1} adjustsFontSizeToFit style={styles.shortcutLabel}>
        {label}
      </Text>
    </Pressable>
  );
}

function UserIcon() {
  return (
    <View style={styles.userIcon}>
      <View style={styles.userIconHead} />
      <View style={styles.userIconBody} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#FFFDF8",
    gap: 10
  },
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  titleBlock: {
    flex: 1,
    minWidth: 0
  },
  greeting: {
    color: "#4A3322",
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 48
  },
  userId: {
    color: "#766B63",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 0
  },
  profileButton: {
    alignItems: "center",
    backgroundColor: "#FFFDF8",
    borderColor: "#E8D8C2",
    borderRadius: 36,
    borderWidth: 3,
    height: 68,
    justifyContent: "center",
    marginLeft: spacing.md,
    width: 68
  },
  noticeDot: {
    backgroundColor: "#F27754",
    borderColor: "#FFFDF8",
    borderRadius: 9,
    borderWidth: 2,
    height: 18,
    position: "absolute",
    right: 2,
    top: 5,
    width: 18
  },
  userIcon: {
    alignItems: "center",
    backgroundColor: "#EAF3DC",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    width: 50
  },
  userIconHead: {
    backgroundColor: "#629255",
    borderRadius: 9,
    height: 18,
    width: 18
  },
  userIconBody: {
    backgroundColor: "#629255",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 17,
    marginTop: 3,
    width: 32
  },
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.99 }]
  },
  heroCard: {
    backgroundColor: "#FFF8EA",
    borderColor: "#E8D8C2",
    borderRadius: 30,
    borderWidth: 2,
    height: 300,
    overflow: "hidden"
  },
  heroBackgroundWrap: {
    flex: 1
  },
  heroBackground: {
    opacity: 0.78,
    transform: [{ scale: 1.12 }]
  },
  heroWash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,248,234,0.36)"
  },
  heroContent: {
    flex: 1,
    padding: 22
  },
  heroHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 2
  },
  petTitleWrap: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: spacing.sm,
    minWidth: 0
  },
  petNickname: {
    color: "#4A3322",
    flexShrink: 1,
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 0
  },
  editPetButton: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderColor: "#E8D8C2",
    borderRadius: 22,
    borderWidth: 1,
    height: 42,
    justifyContent: "center",
    width: 42
  },
  editPetText: {
    color: "#B17A47",
    fontSize: 16,
    fontWeight: "900"
  },
  heartPill: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.92)",
    borderColor: "#E8D8C2",
    borderRadius: 25,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  heart: {
    color: "#F08091",
    fontSize: 20,
    fontWeight: "900"
  },
  heartValue: {
    color: "#5C4A3C",
    fontSize: 20,
    fontWeight: "900"
  },
  levelPill: {
    alignSelf: "flex-start",
    backgroundColor: "#75A465",
    borderRadius: 18,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    zIndex: 2
  },
  levelText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900"
  },
  expBlock: {
    marginTop: spacing.md,
    width: "44%",
    zIndex: 2
  },
  expRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.xs
  },
  expLabel: {
    color: "#6E6258",
    fontSize: 13,
    fontWeight: "900"
  },
  expValue: {
    color: "#5B8E52",
    fontSize: 14,
    fontWeight: "900"
  },
  expTrack: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderColor: "#E8D8C2",
    borderRadius: 12,
    borderWidth: 2,
    height: 18,
    overflow: "hidden"
  },
  expFill: {
    backgroundColor: "#77A86B",
    borderRadius: 10,
    height: "100%"
  },
  petTraits: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.94)",
    borderColor: "#E8D8C2",
    borderRadius: 23,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: "auto",
    maxWidth: "58%",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    zIndex: 2
  },
  traitText: {
    color: "#5A4638",
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "900"
  },
  traitDivider: {
    backgroundColor: "#D8C6AD",
    height: 20,
    width: 1
  },
  capyImage: {
    bottom: 12,
    height: 230,
    position: "absolute",
    right: 8,
    width: "58%"
  },
  statsRow: {
    alignItems: "center",
    backgroundColor: "#FFFDF8",
    borderColor: "#EEE1CE",
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: "row",
    paddingVertical: spacing.sm
  },
  statItem: {
    alignItems: "center",
    borderRightColor: "#EADCC8",
    borderRightWidth: 1,
    flex: 1,
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
    minWidth: 0,
    paddingHorizontal: spacing.sm
  },
  statIconCircle: {
    alignItems: "center",
    backgroundColor: "#F4EFD9",
    borderColor: "#E6D8BE",
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    width: 40
  },
  statIconText: {
    color: "#5F9556",
    fontSize: 15,
    fontWeight: "900"
  },
  statTextBlock: {
    minWidth: 0
  },
  statLabel: {
    color: "#746961",
    fontSize: 12,
    fontWeight: "900"
  },
  statValue: {
    color: "#4A3322",
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: 0
  },
  statSuffix: {
    color: "#746961",
    fontSize: 13,
    fontWeight: "900"
  },
  primaryCta: {
    alignItems: "center",
    backgroundColor: "#79A965",
    borderBottomColor: "#5C8E52",
    borderBottomWidth: 4,
    borderRadius: 31,
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "center",
    minHeight: 74,
    paddingHorizontal: spacing.lg
  },
  primaryIcon: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "900"
  },
  ctaTextWrap: {
    alignItems: "center"
  },
  primaryCtaText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 0
  },
  primaryCtaSubtext: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 14,
    fontWeight: "800",
    marginTop: -2
  },
  roomCard: {
    alignItems: "center",
    backgroundColor: "#FFFDF8",
    borderColor: "#E8D8C2",
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    minHeight: 112,
    padding: spacing.sm
  },
  roomThumb: {
    borderRadius: 16,
    height: 88,
    overflow: "hidden",
    width: 108
  },
  roomThumbImage: {
    borderRadius: 16,
    transform: [{ scale: 1.12 }]
  },
  roomThumbOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,231,191,0.18)"
  },
  roomInfo: {
    flex: 1,
    gap: spacing.xs,
    minWidth: 0
  },
  roomTitleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm
  },
  roomTitle: {
    color: "#4A3322",
    flex: 1,
    fontSize: 22,
    fontWeight: "900"
  },
  publicPill: {
    backgroundColor: "#EEF5DF",
    borderColor: "#D8E8B9",
    borderRadius: 12,
    borderWidth: 1,
    color: "#5A8E4C",
    fontSize: 12,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: spacing.xs,
    paddingVertical: 2
  },
  roomMeta: {
    color: "#746961",
    fontSize: 13,
    fontWeight: "800"
  },
  friendFaces: {
    flexDirection: "row"
  },
  friendFace: {
    alignItems: "center",
    backgroundColor: "#FFF8EA",
    borderColor: "#E8D8C2",
    borderRadius: 19,
    borderWidth: 1,
    height: 38,
    justifyContent: "center",
    marginRight: -7,
    overflow: "hidden",
    width: 38
  },
  friendFaceImage: {
    height: 34,
    width: 34
  },
  joinButton: {
    alignItems: "center",
    backgroundColor: "#D7A06A",
    borderBottomColor: "#B9824F",
    borderBottomWidth: 3,
    borderRadius: 24,
    justifyContent: "center",
    minHeight: 50,
    paddingHorizontal: spacing.md
  },
  joinText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900"
  },
  shortcutRow: {
    flexDirection: "row",
    gap: spacing.sm
  },
  shortcutTile: {
    alignItems: "center",
    backgroundColor: "#FFFDF8",
    borderColor: "#E8D8C2",
    borderRadius: 22,
    borderWidth: 1,
    flex: 1,
    gap: spacing.xs,
    minHeight: 94,
    justifyContent: "center",
    paddingHorizontal: spacing.sm
  },
  shortcutIconBox: {
    alignItems: "center",
    backgroundColor: "#F7E9D3",
    borderRadius: 18,
    height: 46,
    justifyContent: "center",
    width: 52
  },
  shortcutIcon: {
    color: "#8B623F",
    fontSize: 20,
    fontWeight: "900"
  },
  shortcutLabel: {
    color: "#5A4638",
    fontSize: 17,
    fontWeight: "900"
  }
});
