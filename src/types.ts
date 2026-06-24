export type StudyMode = "個人讀書" | "好友共讀";
export type CompletionStatus = "完成" | "部分完成" | "沒完成";
export type Subject = "國文" | "英文" | "數學" | "自然" | "社會" | "其他";
export type DurationOption = 25 | 45 | 60 | 90;
export type PetColor = "原色" | "白色" | "焦糖色" | "灰色";
export type PetItem = "圓眼鏡" | "小書包" | "小帽子";
export type ClassroomSeatId = "front-left" | "front-center" | "front-right" | "back-left" | "back-center" | "back-right";

export type RootStackParamList = {
  Home: undefined;
  StartStudy: undefined;
  Focus: undefined;
  Result: undefined;
  PetCloset: undefined;
  StudyRoom: undefined;
  StudyHistory: undefined;
  UserProfile: undefined;
};

export type User = {
  id: string;
  nickname: string;
  coins: number;
  todayFocusMinutes: number;
};

export type Pet = {
  name: string;
  type: string;
  level: number;
  exp: number;
  color: PetColor;
  equippedItems: PetItem[];
};

export type StudySession = {
  subject: Subject;
  duration: DurationOption;
  mode: StudyMode;
  hasBeforePhoto: boolean;
  beforePhotoUri?: string;
  hasAfterPhoto: boolean;
  afterPhotoUri?: string;
  completionStatus: CompletionStatus;
  earnedExp: number;
  earnedCoins: number;
};

export type FriendInRoom = {
  name: string;
  petType: string;
  readyStatus: boolean;
  seatId: ClassroomSeatId;
};

export type StudyRecord = {
  date: string;
  subject: Subject;
  duration: DurationOption;
  mode: StudyMode;
  exp: number;
  coins: number;
  beforePhotoUri?: string;
  afterPhotoUri?: string;
};
