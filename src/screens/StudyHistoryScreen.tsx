import { Image, StyleSheet, Text, View } from "react-native";

import { Card } from "../components/Card";
import { Screen } from "../components/Screen";
import { useAppState } from "../state/AppContext";
import { colors, spacing } from "../theme";

export function StudyHistoryScreen() {
  const { studyHistory } = useAppState();

  return (
    <Screen>
      <Text style={styles.title}>最近讀書紀錄</Text>
      <View style={styles.list}>
        {studyHistory.map((record, index) => (
          <Card key={`${record.date}-${record.subject}-${record.duration}-${index}`}>
            <Text style={styles.date}>{record.date}</Text>
            <Text style={styles.recordLine}>
              {record.subject}｜{record.duration} 分鐘｜{record.mode}
            </Text>
            <View style={styles.rewardRow}>
              <Text style={styles.rewardText}>EXP +{record.exp}</Text>
              <Text style={styles.rewardText}>金幣 +{record.coins}</Text>
            </View>
            <View style={styles.photoRow}>
              <PhotoThumb label="開始前" uri={record.beforePhotoUri} />
              <PhotoThumb label="結束後" uri={record.afterPhotoUri} />
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

function PhotoThumb({ label, uri }: { label: string; uri?: string }) {
  return (
    <View style={styles.photoThumbWrap}>
      <Text style={styles.photoLabel}>{label}</Text>
      <View style={styles.photoThumb}>
        {uri ? (
          <Image resizeMode="cover" source={{ uri }} style={styles.photoImage} />
        ) : (
          <Text style={styles.photoPlaceholder}>未打卡</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "900"
  },
  list: {
    gap: spacing.sm
  },
  date: {
    color: colors.primaryDark,
    fontSize: 18,
    fontWeight: "900"
  },
  recordLine: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 22
  },
  rewardRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  rewardText: {
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  photoRow: {
    flexDirection: "row",
    gap: spacing.sm
  },
  photoThumbWrap: {
    flex: 1,
    gap: spacing.xs
  },
  photoLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900"
  },
  photoThumb: {
    alignItems: "center",
    aspectRatio: 1.35,
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    overflow: "hidden"
  },
  photoImage: {
    ...StyleSheet.absoluteFillObject
  },
  photoPlaceholder: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800"
  }
});
