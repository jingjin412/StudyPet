import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";
import { PhotoCheckIn } from "../components/PhotoCheckIn";
import { Screen } from "../components/Screen";
import { SectionTitle } from "../components/SectionTitle";
import { useAppState } from "../state/AppContext";
import { colors, spacing } from "../theme";
import { DurationOption, RootStackParamList, StudyMode, Subject } from "../types";

const subjects: Subject[] = ["國文", "英文", "數學", "自然", "社會", "其他"];
const durations: DurationOption[] = [25, 45, 60, 90];
const modes: StudyMode[] = ["個人讀書", "好友共讀"];

type Props = NativeStackScreenProps<RootStackParamList, "StartStudy">;

export function StartStudyScreen({ navigation }: Props) {
  const { startSession } = useAppState();
  const [subject, setSubject] = useState<Subject>("數學");
  const [duration, setDuration] = useState<DurationOption>(25);
  const [mode, setMode] = useState<StudyMode>("個人讀書");
  const [beforePhotoUri, setBeforePhotoUri] = useState<string>();

  const handleStart = () => {
    startSession({ subject, duration, mode, beforePhotoUri, hasBeforePhoto: Boolean(beforePhotoUri) });
    navigation.navigate("Focus");
  };

  return (
    <Screen>
      <Card>
        <Text style={styles.prompt}>拍下你接下來要讀的東西，讓寵物陪你完成這一段。</Text>
        <PhotoCheckIn
          title="開始前打卡"
          description="拍下你準備讀的內容，完成前後打卡可以獲得額外金幣。"
          photoUri={beforePhotoUri}
          taken={Boolean(beforePhotoUri)}
          onPhotoTaken={setBeforePhotoUri}
        />
      </Card>

      <Card>
        <SectionTitle>科目選擇</SectionTitle>
        <View style={styles.chipWrap}>
          {subjects.map((item) => (
            <Chip key={item} label={item} value={item} selected={subject === item} onSelect={setSubject} />
          ))}
        </View>
      </Card>

      <Card>
        <SectionTitle>時間選擇</SectionTitle>
        <View style={styles.chipWrap}>
          {durations.map((item) => (
            <Chip
              key={item}
              label={`${item} 分鐘`}
              value={item}
              selected={duration === item}
              onSelect={setDuration}
            />
          ))}
        </View>
        <Text style={styles.demoHint}>Demo 模式：{duration} 分鐘會縮短為 {duration} 秒。</Text>
      </Card>

      <Card>
        <SectionTitle>模式選擇</SectionTitle>
        <View style={styles.modeRow}>
          {modes.map((item) => (
            <Chip key={item} label={item} value={item} selected={mode === item} onSelect={setMode} />
          ))}
        </View>
      </Card>

      <AppButton title="開始專注" onPress={handleStart} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  prompt: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 26
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  modeRow: {
    gap: spacing.sm
  },
  demoHint: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19
  }
});
