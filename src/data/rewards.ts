import { DurationOption, StudySession } from "../types";

const rewardTable: Record<DurationOption, { exp: number; coins: number }> = {
  25: { exp: 10, coins: 10 },
  45: { exp: 20, coins: 18 },
  60: { exp: 30, coins: 25 },
  90: { exp: 40, coins: 35 }
};

export function calculateRewards(session: StudySession) {
  const base = rewardTable[session.duration];
  let coins = base.coins;

  if (session.hasBeforePhoto && session.hasAfterPhoto) {
    coins += 5;
  }

  if (session.mode === "好友共讀") {
    coins += 5;
  }

  return {
    exp: base.exp,
    coins
  };
}
