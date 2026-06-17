import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { Card } from "../components/Card";
import { Screen } from "../components/Screen";
import { useAppState } from "../state/AppContext";
import { colors, spacing } from "../theme";
import { ClassroomSeatId, FriendInRoom, RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "StudyRoom">;

type ClassroomSeat = {
  id: ClassroomSeatId;
  label: string;
  left: `${number}%`;
  top: `${number}%`;
};

const classroomSeats: ClassroomSeat[] = [
  { id: "back-left", label: "後左", left: "17%", top: "46%" },
  { id: "back-center", label: "後中", left: "42%", top: "43%" },
  { id: "back-right", label: "後右", left: "67%", top: "46%" },
  { id: "front-left", label: "前左", left: "15%", top: "60%" },
  { id: "front-center", label: "前中", left: "41%", top: "57%" },
  { id: "front-right", label: "前右", left: "68%", top: "60%" }
];

export function StudyRoomScreen({ navigation }: Props) {
  const { friendsInRoom, setFriendReady, setFriendSeat, startSession } = useAppState();
  const me = friendsInRoom.find((friend) => friend.name === "我");
  const allReady = friendsInRoom.every((friend) => friend.readyStatus);
  const seatedCount = friendsInRoom.filter((friend) => friend.seatId).length;

  const handleStartRoom = () => {
    startSession({
      subject: "其他",
      duration: 25,
      mode: "好友共讀",
      hasBeforePhoto: false
    });
    navigation.navigate("Focus");
  };

  return (
    <Screen>
      <Card>
        <Text style={styles.roomName}>晚自習 A 教室</Text>
        <Text style={styles.prompt}>選一個空位，讓你的 capy 和朋友一起坐下讀書。</Text>
        <Text style={styles.roomMeta}>
          {seatedCount}/{classroomSeats.length} 個座位已入座 · {allReady ? "大家都準備好了" : "還有人尚未準備"}
        </Text>
      </Card>

      <View style={styles.classroomFrame}>
        <ImageBackground
          imageStyle={styles.classroomImage}
          resizeMode="cover"
          source={require("../../figure/classroom.png")}
          style={styles.classroom}
        >
          {classroomSeats.map((seat) => {
            const friend = friendsInRoom.find((item) => item.seatId === seat.id);
            return (
              <SeatMarker
                friend={friend}
                key={seat.id}
                label={seat.label}
                left={seat.left}
                onSelect={() => setFriendSeat("我", seat.id)}
                selected={me?.seatId === seat.id}
                top={seat.top}
              />
            );
          })}
        </ImageBackground>
      </View>

      <View style={styles.memberList}>
        {friendsInRoom.map((friend) => (
          <View key={friend.name} style={styles.memberChip}>
            <View style={[styles.memberDot, friend.readyStatus ? styles.readyDot : styles.waitingDot]} />
            <Text style={styles.memberName}>{friend.name}</Text>
            <Text style={styles.memberSeat}>{seatLabel(friend.seatId)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <AppButton
          title={me?.readyStatus ? "取消準備" : "準備"}
          variant={me?.readyStatus ? "ghost" : "secondary"}
          onPress={() => setFriendReady("我", !(me?.readyStatus ?? false))}
        />
        <AppButton title={allReady ? "開始共讀" : "開始共讀（Demo）"} onPress={handleStartRoom} />
      </View>
    </Screen>
  );
}

function SeatMarker({
  friend,
  label,
  left,
  onSelect,
  selected,
  top
}: {
  friend?: FriendInRoom;
  label: string;
  left: `${number}%`;
  onSelect: () => void;
  selected: boolean;
  top: `${number}%`;
}) {
  if (friend) {
    return (
      <View style={[styles.seat, styles.occupiedSeat, selected && styles.mySeat, { left, top }]}>
        <Image resizeMode="contain" source={require("../../figure/capy_class.png")} style={styles.seatPet} />
        <View style={[styles.nameTag, friend.readyStatus ? styles.readyTag : styles.waitingTag]}>
          <Text style={styles.nameTagText}>{friend.name}</Text>
        </View>
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onSelect}
      style={({ pressed }) => [styles.seat, styles.emptySeat, pressed && styles.pressedSeat, { left, top }]}
    >
      <Text style={styles.emptySeatText}>{label}</Text>
    </Pressable>
  );
}

function seatLabel(seatId: ClassroomSeatId) {
  return classroomSeats.find((seat) => seat.id === seatId)?.label ?? "未入座";
}

const styles = StyleSheet.create({
  roomName: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "900"
  },
  prompt: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22
  },
  roomMeta: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: "900"
  },
  classroomFrame: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden"
  },
  classroom: {
    aspectRatio: 941 / 1672,
    backgroundColor: colors.surfaceAlt,
    width: "100%"
  },
  classroomImage: {
    borderRadius: 8
  },
  seat: {
    alignItems: "center",
    height: 78,
    justifyContent: "center",
    marginLeft: -39,
    marginTop: -39,
    position: "absolute",
    width: 78
  },
  occupiedSeat: {
    shadowColor: "#7B5F3E",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.16,
    shadowRadius: 8
  },
  mySeat: {
    backgroundColor: "rgba(255,248,237,0.5)",
    borderColor: colors.primary,
    borderRadius: 8,
    borderWidth: 2
  },
  emptySeat: {
    backgroundColor: "rgba(255,255,255,0.62)",
    borderColor: colors.primary,
    borderRadius: 8,
    borderStyle: "dashed",
    borderWidth: 1
  },
  pressedSeat: {
    opacity: 0.72,
    transform: [{ scale: 0.96 }]
  },
  emptySeatText: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: "900"
  },
  seatPet: {
    height: 58,
    width: 66
  },
  nameTag: {
    borderRadius: 14,
    borderWidth: 1,
    marginTop: -3,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2
  },
  readyTag: {
    backgroundColor: "#E8F2EA",
    borderColor: colors.primary
  },
  waitingTag: {
    backgroundColor: "#FFF2D6",
    borderColor: "#ECD7A8"
  },
  nameTagText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: "900"
  },
  memberList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  memberChip: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  memberDot: {
    borderRadius: 5,
    height: 10,
    width: 10
  },
  readyDot: {
    backgroundColor: colors.primary
  },
  waitingDot: {
    backgroundColor: colors.secondary
  },
  memberName: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "900"
  },
  memberSeat: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800"
  },
  actions: {
    gap: spacing.sm
  }
});
