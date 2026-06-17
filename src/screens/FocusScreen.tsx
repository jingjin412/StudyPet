import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { Card } from "../components/Card";
import { PetAvatar } from "../components/PetAvatar";
import { Screen } from "../components/Screen";
import { useAppState } from "../state/AppContext";
import { colors, spacing } from "../theme";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Focus">;

export function FocusScreen({ navigation }: Props) {
  const { studySession, pet, friendsInRoom } = useAppState();
  const [secondsLeft, setSecondsLeft] = useState<number>(studySession?.duration ?? 25);

  useEffect(() => {
    if (!studySession) {
      navigation.replace("Home");
      return;
    }

    setSecondsLeft(studySession.duration);
  }, [navigation, studySession]);

  useEffect(() => {
    if (!studySession) {
      return;
    }

    if (secondsLeft <= 0) {
      navigation.replace("Result");
      return;
    }

    const timer = setTimeout(() => setSecondsLeft((current) => current - 1), 1000);
    return () => clearTimeout(timer);
  }, [navigation, secondsLeft, studySession]);

  const displayTime = useMemo(() => {
    const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
    const seconds = (secondsLeft % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [secondsLeft]);

  if (!studySession) {
    return null;
  }

  const roomCount = friendsInRoom.length;

  return (
    <Screen scroll={false}>
      <View style={styles.top}>
        <Text style={styles.mode}>{studySession.mode}</Text>
        <Text style={styles.timer}>{displayTime}</Text>
        <Text style={styles.subject}>{studySession.subject} · 原設定 {studySession.duration} 分鐘</Text>
      </View>

      <Card>
        <PetAvatar type={pet.type} color={pet.color} items={pet.equippedItems} mood="study" />
        <Text style={styles.message}>手機先休息一下，{pet.name}會陪你讀完這一段。</Text>
        <Text style={styles.hint}>可以關閉螢幕，時間到會提醒你。</Text>
        {studySession.mode === "好友共讀" ? (
          <View style={styles.roomPill}>
            <Text style={styles.roomPillText}>目前共讀人數：{roomCount}</Text>
          </View>
        ) : null}
      </Card>

      <View style={styles.bottom}>
        <AppButton title="提前結束" variant="danger" onPress={() => navigation.replace("Result")} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: {
    alignItems: "center",
    gap: spacing.xs,
    paddingTop: spacing.lg
  },
  mode: {
    color: colors.primaryDark,
    fontSize: 15,
    fontWeight: "900"
  },
  timer: {
    color: colors.text,
    fontSize: 64,
    fontWeight: "900",
    letterSpacing: 0
  },
  subject: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700"
  },
  message: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 26,
    textAlign: "center"
  },
  hint: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center"
  },
  roomPill: {
    alignSelf: "center",
    backgroundColor: "#E8F2EA",
    borderColor: colors.primary,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  roomPillText: {
    color: colors.primaryDark,
    fontSize: 14,
    fontWeight: "900"
  },
  bottom: {
    marginTop: "auto"
  }
});
