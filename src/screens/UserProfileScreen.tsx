import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { Card } from "../components/Card";
import { Screen } from "../components/Screen";
import { useAppState } from "../state/AppContext";
import { colors, spacing } from "../theme";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "UserProfile">;

export function UserProfileScreen({ navigation }: Props) {
  const { user, updateUserProfile } = useAppState();
  const [draftName, setDraftName] = useState(user.nickname);
  const [draftId, setDraftId] = useState(user.id);

  const saveProfile = () => {
    updateUserProfile({
      id: draftId.trim() || user.id,
      nickname: draftName.trim() || user.nickname
    });
    navigation.goBack();
  };

  return (
    <Screen>
      <Card>
        <View style={styles.identityRow}>
          <Image resizeMode="cover" source={require("../../figure/studyapp_logo.jpg")} style={styles.avatar} />
          <View style={styles.identityText}>
            <Text style={styles.name}>{user.nickname}</Text>
            <Text style={styles.id}>ID {user.id}</Text>
          </View>
        </View>
      </Card>

      <Card>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>名字</Text>
          <TextInput
            autoCapitalize="none"
            onChangeText={setDraftName}
            placeholder="輸入名字"
            placeholderTextColor={colors.muted}
            style={styles.input}
            value={draftName}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>ID</Text>
          <TextInput
            autoCapitalize="characters"
            onChangeText={setDraftId}
            placeholder="輸入 ID"
            placeholderTextColor={colors.muted}
            style={styles.input}
            value={draftId}
          />
        </View>
      </Card>

      <View style={styles.actions}>
        <AppButton title="取消" variant="ghost" style={styles.actionButton} onPress={() => navigation.goBack()} />
        <AppButton title="儲存" style={styles.actionButton} onPress={saveProfile} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  identityRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md
  },
  avatar: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    height: 72,
    width: 72
  },
  identityText: {
    flex: 1,
    gap: spacing.xs
  },
  name: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "900"
  },
  id: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "800"
  },
  field: {
    gap: spacing.xs
  },
  fieldLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "900"
  },
  input: {
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
    minHeight: 50,
    paddingHorizontal: spacing.md
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm
  },
  actionButton: {
    flex: 1
  }
});
