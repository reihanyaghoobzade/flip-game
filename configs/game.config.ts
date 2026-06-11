import { cardImageSrc } from "../utils/cardAssets";
import { shuffle } from "../utils/shuffle";

export const LEVELS = {
  easy: { grid: 4, moves: 40, time: 120, label: "آسان" },
  medium: { grid: 6, moves: 40, time: 120, label: "متوسط" },
  hard: { grid: 8, moves: 60, time: 120, label: "سخت" },
};

export type Level = keyof typeof LEVELS;

export type Card = {
  id: number;
  pairId: number;
  src: string;
  flipped: boolean;
  match: boolean;
};

export const generateCards = (pairCount: number): Card[] => {
  const pairs = Array.from({ length: pairCount }, (_, i) => {
    const pairId = i + 1;
    const imageSource = cardImageSrc(pairId);
    return [
      {
        id: pairId * 2 - 1,
        pairId,
        src: imageSource,
        flipped: false,
        match: false,
      },
      {
        id: pairId * 2,
        pairId,
        src: imageSource,
        flipped: false,
        match: false,
      },
    ];
  });

  return shuffle(pairs.flat());
};
