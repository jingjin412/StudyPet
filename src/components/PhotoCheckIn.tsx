import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "../theme";

export function PhotoCheckIn({
  title,
  description,
  photoUri,
  taken,
  onPhotoTaken
}: {
  title: string;
  description: string;
  photoUri?: string;
  taken: boolean;
  onPhotoTaken: (photoUri: string) => void;
}) {
  const [isOpeningCamera, setIsOpeningCamera] = useState(false);

  const takePhoto = async () => {
    if (isOpeningCamera) {
      return;
    }

    setIsOpeningCamera(true);

    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("需要相機權限", "請允許相機權限，才能完成拍照打卡。");
      setIsOpeningCamera(false);
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 0.8
      });

      if (result.canceled || !result.assets[0]?.uri) {
        return;
      }

      onPhotoTaken(result.assets[0].uri);
    } finally {
      setIsOpeningCamera(false);
    }
  };

  return (
    <View style={[styles.preview, taken && styles.previewTaken]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.placeholder}>
        {photoUri ? (
          <Image resizeMode="cover" source={{ uri: photoUri }} style={styles.photoPreview} />
        ) : (
          <>
            <Text style={styles.placeholderIcon}>相機</Text>
            <Text style={styles.placeholderText}>照片預覽區</Text>
          </>
        )}
      </View>
      <Pressable onPress={takePhoto} style={({ pressed }) => [styles.photoButton, pressed && styles.pressed]}>
        <Text style={styles.photoButtonText}>{isOpeningCamera ? "開啟相機中..." : taken ? "重新拍照打卡" : "拍照打卡"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  preview: {
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.md
  },
  previewTaken: {
    backgroundColor: "#EEF6F0",
    borderColor: colors.primary
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
  },
  placeholder: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: colors.border,
    borderRadius: 8,
    borderStyle: "dashed",
    borderWidth: 1,
    gap: spacing.xs,
    height: 150,
    justifyContent: "center",
    overflow: "hidden"
  },
  placeholderIcon: {
    color: colors.primaryDark,
    fontSize: 30,
    fontWeight: "900"
  },
  placeholderText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0
  },
  photoPreview: {
    ...StyleSheet.absoluteFillObject
  },
  photoButton: {
    alignItems: "center",
    backgroundColor: colors.blue,
    borderRadius: 18,
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: spacing.md
  },
  photoButtonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0
  },
  pressed: {
    opacity: 0.75
  }
});
