import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";
import { PhotoCheckIn } from "../components/PhotoCheckIn";
import { calculateRewards } from "../data/rewards";
import { Screen } from "../components/Screen";
import { SectionTitle } from "../components/SectionTitle";
import { useAppState } from "../state/AppContext";
import { colors, spacing } from "../theme";
import { CompletionStatus, RootStackParamList } from "../types";

const statuses: CompletionStatus[] = ["完成", "部分完成", "沒完成"];

type Props = NativeStackScreenProps<RootStackParamList, "Result">;

export function ResultScreen({ navigation }: Props) {
  const { studySession, pet, markAfterPhoto, setCompletionStatus, completeSession } = useAppState();

  const rewards = useMemo(() => (studySession ? calculateRewards(studySession) : { exp: 0, coins: 0 }), [studySession]);

  if (!studySession) {
    return (
      <Screen>
        <Card>
          <Text style={styles.message}>目前沒有可結算的讀書紀錄。</Text>
          <AppButton title="回首頁" onPress={() => navigation.replace("Home")} />
        </Card>
      </Screen>
    );
  }

  const handleBackHome = () => {
    completeSession();
    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  };

  return (
    <Screen>
      <Card>
        <Text style={styles.title}>你完成了一段專注，{pet.name}也變得更有精神了！</Text>
        <Text style={styles.meta}>
          本次讀書：{studySession.subject}｜{studySession.duration} 分鐘｜{studySession.mode}
        </Text>
      </Card>

      <PhotoCheckIn
        title="結束後打卡"
        description="拍下完成進度，前後都有照片會額外獲得金幣。"
        taken={studySession.hasAfterPhoto}
        onTakePhoto={markAfterPhoto}
      />

      <Card>
        <SectionTitle>完成狀態</SectionTitle>
        <View style={styles.chipWrap}>
          {statuses.map((status) => (
            <Chip
              key={status}
              label={status}
              value={status}
              selected={studySession.completionStatus === status}
              onSelect={setCompletionStatus}
            />
          ))}
        </View>
      </Card>

      <Card>
        <SectionTitle>獲得獎勵</SectionTitle>
        <View style={styles.rewardRow}>
          <View style={styles.rewardBox}>
            <Text style={styles.rewardValue}>+{rewards.exp}</Text>
            <Text style={styles.rewardLabel}>EXP</Text>
          </View>
          <View style={styles.rewardBox}>
            <Text style={styles.rewardValue}>+{rewards.coins}</Text>
            <Text style={styles.rewardLabel}>金幣</Text>
          </View>
        </View>
        <Text style={styles.rewardHint}>
          {studySession.hasBeforePhoto && studySession.hasAfterPhoto ? "前後拍照 +5 金幣" : "前後都有拍照可額外 +5 金幣"}
          {studySession.mode === "好友共讀" ? " · 好友共讀 +5 金幣" : ""}
        </Text>
      </Card>

      <AppButton title="回首頁" onPress={handleBackHome} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 30
  },
  message: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800"
  },
  meta: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  rewardRow: {
    flexDirection: "row",
    gap: spacing.md
  },
  rewardBox: {
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    padding: spacing.md
  },
  rewardValue: {
    color: colors.primaryDark,
    fontSize: 28,
    fontWeight: "900"
  },
  rewardLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800"
  },
  rewardHint: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19
  }
});
