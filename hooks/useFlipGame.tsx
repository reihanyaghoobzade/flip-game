import { useCallback, useEffect, useRef, useState } from "react";
import {
  generateCards,
  LEVELS,
  type Card,
  type Level,
} from "../configs/game.config";
import useCountdownTimer from "./useCountdownTimer";
import useCardInteractions from "./useCardInteractions";

type GameStatus = "idle" | "playing" | "won" | "lost";

const getInitialCards = (level: Level): Card[] => {
  const { grid } = LEVELS[level];
  const pairCount = (grid * grid) / 2;
  return generateCards(pairCount);
};

export default function useFlipGame(level: Level) {
  const { moves: maxMoves, time: maxTime } = LEVELS[level];


  const [status, setStatus] = useState<GameStatus>("idle");
  const [moves, setMoves] = useState<number>(maxMoves);
  const [roundId, setRoundId] = useState(0);

  const initialCards = useRef(getInitialCards(level));

  const {
    cards,
    isLocked,
    isPreview,
    flipCard,
    reset: resetCards,
    revealPreview,
    allMatched,
  } = useCardInteractions(initialCards.current);

  const handleTimerFinish = useCallback(() => {
    setStatus((prev) => (prev === "playing" ? "lost" : prev));
  }, []);

  const {
    timer,
    start: startTimer,
    stop: stopTimer,
    reset: resetTimer,
  } = useCountdownTimer(maxTime, handleTimerFinish);

  useEffect(() => {
    revealPreview(2000);
  }, [roundId, revealPreview]);

  useEffect(() => {
    if (status !== "playing") return;

    if (allMatched) {
      stopTimer();
      setStatus("won");
    } else if (moves <= 0) {
      stopTimer();
      setStatus("lost");
    }
  }, [allMatched, moves, status, stopTimer]);

  const onClickCard = useCallback(
    (id: number) => {
      if (isPreview) return;

      if (status === "idle") {
        setStatus("playing");
        startTimer();
      }

      const result = flipCard(id);
      if (result !== null) {
        setMoves((prev) => prev - 1);
      }
    },
    [isPreview, status, flipCard, startTimer],
  );

  const restart = useCallback(() => {
    stopTimer();
    resetTimer(maxTime);
    resetCards(getInitialCards(level));
    setMoves(maxMoves);
    setStatus("idle");
    setRoundId((prev) => prev + 1);
  }, [level, maxMoves, maxTime, stopTimer, resetTimer, resetCards]);

  return {
    cards,
    moves,
    timer,
    status,
    isLocked,
    isPreview,
    onClickCard,
    restart,
  };
}
