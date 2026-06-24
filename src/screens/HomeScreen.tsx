import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, ImageBackground, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";

import { Screen } from "../components/Screen";
import { useAppState } from "../state/AppContext";
import { colors, spacing } from "../theme";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const homeIcons = {
  book: require("../../figure/icon_book.png"),
  clock: require("../../figure/icon_clock.png"),
  closet: require("../../figure/icon_closet.png"),
  friend: require("../../figure/icon_friend.png"),
  identity: require("../../figure/icon_identity.png"),
  money: require("../../figure/icon_money.png"),
  notebook: require("../../figure/icon_notebook.png"),
  pen: require("../../figure/icon_pen.png")
} satisfies Record<string, ImageSourcePropType>;

export function HomeScreen({ navigation }: Props) {
  const { user, pet, friendsInRoom } = useAppState();
  const friendsStudying = friendsInRoom.length;
  const expProgress = `${pet.exp}%` as `${number}%`;

  return (
    <ImageBackground
      imageStyle={styles.appBackgroundImage}
      resizeMode="cover"
      source={require("../../figure/background.png")}
      style={styles.appBackground}
    >
      <View pointerEvents="none" style={styles.backgroundVeil} />
      <Screen contentStyle={styles.screen} edges={["top", "bottom"]} safeAreaStyle={styles.transparentSafeArea} scroll={false}>
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
          source={require("../../figure/background_capy.png")}
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
                  <Image resizeMode="contain" source={homeIcons.pen} style={styles.editPetIcon} />
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

            <Image resizeMode="contain" source={require("../../figure/capy_study.png")} style={styles.capyImage} />
          </View>
        </ImageBackground>
      </View>

      <View style={styles.statsRow}>
        <StatItem label="今日專注" value={user.todayFocusMinutes} suffix="分鐘" icon={homeIcons.clock} />
        <StatItem label="金幣" value={user.coins} icon={homeIcons.money} />
        <StatItem label="朋友共讀中" value={friendsStudying} suffix="位" icon={homeIcons.friend} />
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => navigation.navigate("StartStudy")}
        style={({ pressed }) => [styles.primaryCta, pressed && styles.pressed]}
      >
        <Image resizeMode="contain" source={homeIcons.book} style={styles.primaryIcon} />
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
        <ShortcutTile label="寵物衣櫃" icon={homeIcons.closet} onPress={() => navigation.navigate("PetCloset")} />
        <ShortcutTile label="讀書紀錄" icon={homeIcons.notebook} onPress={() => navigation.navigate("StudyHistory")} />
        <ShortcutTile label="個人資料" icon={homeIcons.identity} onPress={() => navigation.navigate("UserProfile")} />
      </View>
      </Screen>
    </ImageBackground>
  );
}

function StatItem({
  icon,
  label,
  suffix,
  value
}: {
  icon: ImageSourcePropType;
  label: string;
  suffix?: string;
  value: number;
}) {
  return (
    <View style={styles.statItem}>
      <View style={styles.statIconCircle}>
        <Image resizeMode="contain" source={icon} style={styles.statIconImage} />
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

function ShortcutTile({ icon, label, onPress }: { icon: ImageSourcePropType; label: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.shortcutTile, pressed && styles.pressed]}>
      <View style={styles.shortcutIconBox}>
        <Image resizeMode="contain" source={icon} style={styles.shortcutIcon} />
      </View>
      <Text numberOfLines={1} adjustsFontSizeToFit style={styles.shortcutLabel}>
        {label}
      </Text>
    </Pressable>
  );
}

function UserIcon() {
  return (
    <Image resizeMode="contain" source={homeIcons.identity} style={styles.userIcon} />
  );
}

const styles = StyleSheet.create({
  appBackground: {
    flex: 1
  },
  appBackgroundImage: {
    opacity: 1
  },
  backgroundVeil: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,253,248,0.12)"
  },
  transparentSafeArea: {
    backgroundColor: "transparent"
  },
  screen: {
    backgroundColor: "transparent",
    gap: 11
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
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 40
  },
  userId: {
    color: "#766B63",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0
  },
  profileButton: {
    alignItems: "center",
    backgroundColor: "rgba(255,253,248,0.72)",
    borderColor: "#E8D8C2",
    borderRadius: 31,
    borderWidth: 2,
    height: 58,
    justifyContent: "center",
    marginLeft: spacing.md,
    width: 58
  },
  noticeDot: {
    backgroundColor: "#F27754",
    borderColor: "#FFFDF8",
    borderRadius: 9,
    borderWidth: 2,
    height: 15,
    position: "absolute",
    right: 2,
    top: 5,
    width: 15
  },
  userIcon: {
    height: 40,
    width: 40
  },
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.99 }]
  },
  heroCard: {
    backgroundColor: "rgba(255,248,234,0.26)",
    borderColor: "#E8D8C2",
    borderRadius: 28,
    borderWidth: 2,
    height: 258,
    overflow: "hidden"
  },
  heroBackgroundWrap: {
    flex: 1
  },
  heroBackground: {
    opacity: 1,
    transform: [{ scale: 1.05 }]
  },
  heroWash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,248,234,0.06)"
  },
  heroContent: {
    flex: 1,
    padding: 18
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
    fontSize: 27,
    fontWeight: "900",
    letterSpacing: 0
  },
  editPetButton: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderColor: "#E8D8C2",
    borderRadius: 18,
    borderWidth: 1,
    height: 35,
    justifyContent: "center",
    width: 35
  },
  editPetIcon: {
    height: 22,
    width: 22
  },
  heartPill: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.92)",
    borderColor: "#E8D8C2",
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  heart: {
    color: "#F08091",
    fontSize: 18,
    fontWeight: "900"
  },
  heartValue: {
    color: "#5C4A3C",
    fontSize: 18,
    fontWeight: "900"
  },
  levelPill: {
    alignSelf: "flex-start",
    backgroundColor: "#75A465",
    borderRadius: 16,
    marginTop: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    zIndex: 2
  },
  levelText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900"
  },
  expBlock: {
    marginTop: spacing.sm,
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
    fontSize: 12,
    fontWeight: "900"
  },
  expValue: {
    color: "#5B8E52",
    fontSize: 13,
    fontWeight: "900"
  },
  expTrack: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderColor: "#E8D8C2",
    borderRadius: 12,
    borderWidth: 2,
    height: 14,
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
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: "auto",
    maxWidth: "58%",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    zIndex: 2
  },
  traitText: {
    color: "#5A4638",
    flexShrink: 1,
    fontSize: 13,
    fontWeight: "900"
  },
  traitDivider: {
    backgroundColor: "#D8C6AD",
    height: 20,
    width: 1
  },
  capyImage: {
    bottom: 4,
    height: 206,
    position: "absolute",
    right: 8,
    width: "56%"
  },
  statsRow: {
    alignItems: "center",
    backgroundColor: "rgba(255,253,248,0.68)",
    borderColor: "#EEE1CE",
    borderRadius: 23,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 72,
    paddingVertical: spacing.sm
  },
  statItem: {
    alignItems: "center",
    borderRightColor: "#EADCC8",
    borderRightWidth: 1,
    flex: 1,
    flexDirection: "row",
    gap: spacing.xs,
    justifyContent: "center",
    minWidth: 0,
    paddingHorizontal: spacing.xs
  },
  statIconCircle: {
    alignItems: "center",
    backgroundColor: "#F4EFD9",
    borderColor: "#E6D8BE",
    borderRadius: 18,
    borderWidth: 1,
    height: 36,
    justifyContent: "center",
    width: 36
  },
  statIconImage: {
    height: 25,
    width: 25
  },
  statTextBlock: {
    minWidth: 0
  },
  statLabel: {
    color: "#746961",
    fontSize: 13,
    fontWeight: "900"
  },
  statValue: {
    color: "#4A3322",
    fontSize: 19,
    fontWeight: "900",
    letterSpacing: 0
  },
  statSuffix: {
    color: "#746961",
    fontSize: 11,
    fontWeight: "900"
  },
  primaryCta: {
    alignItems: "center",
    backgroundColor: "#79A965",
    borderBottomColor: "#5C8E52",
    borderBottomWidth: 4,
    borderRadius: 29,
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "center",
    minHeight: 70,
    paddingHorizontal: spacing.lg
  },
  primaryIcon: {
    height: 36,
    width: 36
  },
  ctaTextWrap: {
    alignItems: "center"
  },
  primaryCtaText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 0
  },
  primaryCtaSubtext: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 13,
    fontWeight: "800",
    marginTop: -2
  },
  roomCard: {
    alignItems: "center",
    backgroundColor: "rgba(255,253,248,0.72)",
    borderColor: "#E8D8C2",
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    minHeight: 104,
    padding: spacing.sm
  },
  roomThumb: {
    borderRadius: 16,
    height: 76,
    overflow: "hidden",
    width: 94
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
    fontSize: 19,
    fontWeight: "900"
  },
  publicPill: {
    backgroundColor: "#EEF5DF",
    borderColor: "#D8E8B9",
    borderRadius: 12,
    borderWidth: 1,
    color: "#5A8E4C",
    fontSize: 11,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: spacing.xs,
    paddingVertical: 2
  },
  roomMeta: {
    color: "#746961",
    fontSize: 12,
    fontWeight: "800"
  },
  friendFaces: {
    flexDirection: "row"
  },
  friendFace: {
    alignItems: "center",
    backgroundColor: "#FFF8EA",
    borderColor: "#E8D8C2",
    borderRadius: 17,
    borderWidth: 1,
    height: 34,
    justifyContent: "center",
    marginRight: -7,
    overflow: "hidden",
    width: 34
  },
  friendFaceImage: {
    height: 30,
    width: 30
  },
  joinButton: {
    alignItems: "center",
    backgroundColor: "#D7A06A",
    borderBottomColor: "#B9824F",
    borderBottomWidth: 3,
    borderRadius: 22,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: spacing.sm
  },
  joinText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900"
  },
  shortcutRow: {
    flexDirection: "row",
    gap: spacing.md
  },
  shortcutTile: {
    alignItems: "center",
    backgroundColor: "rgba(255,253,248,0.72)",
    borderColor: "#E8D8C2",
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    gap: spacing.xs,
    minHeight: 86,
    justifyContent: "center",
    paddingHorizontal: spacing.sm
  },
  shortcutIconBox: {
    alignItems: "center",
    backgroundColor: "#F7E9D3",
    borderRadius: 16,
    height: 40,
    justifyContent: "center",
    width: 46
  },
  shortcutIcon: {
    height: 31,
    width: 31
  },
  shortcutLabel: {
    color: "#5A4638",
    fontSize: 14,
    fontWeight: "900"
  }
});
