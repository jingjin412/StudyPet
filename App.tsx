import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppProvider } from "./src/state/AppContext";
import { FocusScreen } from "./src/screens/FocusScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { PetClosetScreen } from "./src/screens/PetClosetScreen";
import { ResultScreen } from "./src/screens/ResultScreen";
import { StartStudyScreen } from "./src/screens/StartStudyScreen";
import { StudyHistoryScreen } from "./src/screens/StudyHistoryScreen";
import { StudyRoomScreen } from "./src/screens/StudyRoomScreen";
import { UserProfileScreen } from "./src/screens/UserProfileScreen";
import { RootStackParamList } from "./src/types";
import { colors } from "./src/theme";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator
            screenOptions={{
              headerShadowVisible: false,
              headerStyle: { backgroundColor: colors.background },
              headerTitleStyle: { color: colors.text, fontWeight: "700" },
              headerTintColor: colors.text,
              contentStyle: { backgroundColor: colors.background }
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ contentStyle: { backgroundColor: "transparent" }, headerShown: false }}
            />
            <Stack.Screen name="StartStudy" component={StartStudyScreen} options={{ title: "開始讀書" }} />
            <Stack.Screen name="Focus" component={FocusScreen} options={{ title: "專注中", gestureEnabled: false }} />
            <Stack.Screen name="Result" component={ResultScreen} options={{ title: "讀書結算", gestureEnabled: false }} />
            <Stack.Screen name="PetCloset" component={PetClosetScreen} options={{ title: "寵物衣櫃" }} />
            <Stack.Screen name="StudyRoom" component={StudyRoomScreen} options={{ title: "共讀教室" }} />
            <Stack.Screen name="StudyHistory" component={StudyHistoryScreen} options={{ title: "讀書紀錄" }} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ title: "用戶資料" }} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}
