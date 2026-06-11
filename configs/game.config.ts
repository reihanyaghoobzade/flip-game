export const LEVELS = {
  easy: { grid: 4, moves: 40, time: 120, label: "آسان" },
  medium: { grid: 6, moves: 40, time: 120, label: "متوسط" },
  hard: { grid: 8, moves: 40, time: 120, label: "سخت" },
};

export type Level = keyof typeof LEVELS;
