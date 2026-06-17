import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import { calculateRewards } from "../data/rewards";
import {
  ClassroomSeatId,
  DurationOption,
  FriendInRoom,
  Pet,
  PetColor,
  PetItem,
  StudyRecord,
  StudySession,
  Subject,
  User
} from "../types";

type StartSessionInput = {
  subject: Subject;
  duration: DurationOption;
  mode: StudySession["mode"];
  hasBeforePhoto: boolean;
};

type AppContextValue = {
  user: User;
  pet: Pet;
  studySession: StudySession | null;
  friendsInRoom: FriendInRoom[];
  studyHistory: StudyRecord[];
  startSession: (input: StartSessionInput) => void;
  updateUserProfile: (profile: Pick<User, "id" | "nickname">) => void;
  markAfterPhoto: () => void;
  setCompletionStatus: (status: StudySession["completionStatus"]) => void;
  completeSession: () => void;
  changePetColor: (color: PetColor) => void;
  togglePetItem: (item: PetItem) => void;
  setFriendReady: (name: string, ready: boolean) => void;
  setFriendSeat: (name: string, seatId: ClassroomSeatId) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

const initialUser: User = {
  id: "CAPY-0429",
  nickname: "小晴",
  coins: 120,
  todayFocusMinutes: 45
};

const initialPet: Pet = {
  name: "水豚",
  type: "水豚",
  level: 3,
  exp: 35,
  color: "原色",
  equippedItems: ["小書包"]
};

const initialFriends: FriendInRoom[] = [
  { name: "我", petType: "水豚", readyStatus: true, seatId: "front-center" },
  { name: "小安", petType: "水豚", readyStatus: true, seatId: "back-left" },
  { name: "阿哲", petType: "水豚", readyStatus: false, seatId: "back-right" }
];

const initialHistory: StudyRecord[] = [
  { date: "4/29", subject: "數學", duration: 45, mode: "好友共讀", exp: 20, coins: 23 },
  { date: "4/28", subject: "英文", duration: 25, mode: "個人讀書", exp: 10, coins: 15 }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(initialUser);
  const [pet, setPet] = useState<Pet>(initialPet);
  const [studySession, setStudySession] = useState<StudySession | null>(null);
  const [friendsInRoom, setFriendsInRoom] = useState<FriendInRoom[]>(initialFriends);
  const [studyHistory, setStudyHistory] = useState<StudyRecord[]>(initialHistory);

  const startSession = (input: StartSessionInput) => {
    const session: StudySession = {
      ...input,
      hasAfterPhoto: false,
      completionStatus: "完成",
      earnedExp: 0,
      earnedCoins: 0
    };

    setStudySession(session);
  };

  const updateUserProfile = (profile: Pick<User, "id" | "nickname">) => {
    setUser((current) => ({ ...current, ...profile }));
  };

  const markAfterPhoto = () => {
    setStudySession((current) => (current ? { ...current, hasAfterPhoto: true } : current));
  };

  const setCompletionStatus = (status: StudySession["completionStatus"]) => {
    setStudySession((current) => (current ? { ...current, completionStatus: status } : current));
  };

  const completeSession = () => {
    if (!studySession || studySession.earnedExp > 0 || studySession.earnedCoins > 0) {
      return;
    }

    const rewards = calculateRewards(studySession);
    const completed: StudySession = {
      ...studySession,
      earnedExp: rewards.exp,
      earnedCoins: rewards.coins
    };

    setStudySession(completed);
    setUser((previous) => ({
      ...previous,
      coins: previous.coins + rewards.coins,
      todayFocusMinutes: previous.todayFocusMinutes + studySession.duration
    }));

    setPet((previous) => {
      const nextExp = previous.exp + rewards.exp;
      const levelGain = Math.floor(nextExp / 100);
      return {
        ...previous,
        exp: nextExp % 100,
        level: previous.level + levelGain
      };
    });

    setStudyHistory((previous) => [
      {
        date: "今天",
        subject: studySession.subject,
        duration: studySession.duration,
        mode: studySession.mode,
        exp: rewards.exp,
        coins: rewards.coins
      },
      ...previous
    ]);
  };

  const changePetColor = (color: PetColor) => {
    setPet((current) => ({ ...current, color }));
  };

  const togglePetItem = (item: PetItem) => {
    setPet((current) => {
      const hasItem = current.equippedItems.includes(item);
      return {
        ...current,
        equippedItems: hasItem
          ? current.equippedItems.filter((equippedItem) => equippedItem !== item)
          : [...current.equippedItems, item]
      };
    });
  };

  const setFriendReady = (name: string, ready: boolean) => {
    setFriendsInRoom((current) =>
      current.map((friend) => (friend.name === name ? { ...friend, readyStatus: ready } : friend))
    );
  };

  const setFriendSeat = (name: string, seatId: ClassroomSeatId) => {
    setFriendsInRoom((current) => {
      const seatTaken = current.some((friend) => friend.name !== name && friend.seatId === seatId);

      if (seatTaken) {
        return current;
      }

      return current.map((friend) => (friend.name === name ? { ...friend, seatId } : friend));
    });
  };

  const value = useMemo(
    () => ({
      user,
      pet,
      studySession,
      friendsInRoom,
      studyHistory,
      startSession,
      updateUserProfile,
      markAfterPhoto,
      setCompletionStatus,
      completeSession,
      changePetColor,
      togglePetItem,
      setFriendReady,
      setFriendSeat
    }),
    [user, pet, studySession, friendsInRoom, studyHistory]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppState must be used within AppProvider");
  }

  return context;
}
