import { useCallback, useRef, useState } from "react";
import type { Card } from "../configs/game.config";

export default function useCardInteractions(initialCards: Card[]) {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [isLocked, setIsLocked] = useState(false);
  const [isPreview, setIsPreview] = useState(true);

  const pendingRef = useRef<number[]>([]);

  const revealPreview = useCallback((duration = 2000) => {
    setIsPreview(true);
    setTimeout(() => setIsPreview(false), duration);
  }, []);

  const flipCard = useCallback(
    (id: number): "match" | "no-match" | "pending" | null => {
      if (pendingRef.current.length >= 2) return null;

      setCards((prev) => {
        const card = prev.find((c) => c.id === id);
        if (!card || card.flipped || card.match || isLocked) return prev;
        return prev.map((c) => (c.id === id ? { ...c, flipped: true } : c));
      });

      pendingRef.current = [...pendingRef.current, id];

      if (pendingRef.current.length === 2) {
        setIsLocked(true);
        const [aId, bId] = pendingRef.current;

        setCards((prev) => {
          const a = prev.find((c) => c.id === aId);
          const b = prev.find((c) => c.id === bId);

          if (!a || !b) return prev;

          if (a.pairId === b.pairId) {
            setTimeout(() => {
              setIsLocked(false);
              pendingRef.current = [];
            }, 300);
            return prev.map((c) =>
              c.pairId === a.pairId ? { ...c, match: true, flipped: true } : c,
            );
          } else {
            setTimeout(() => {
              setCards((prevCards) =>
                prevCards.map((c) =>
                  [aId, bId].includes(c.id) ? { ...c, flipped: false } : c,
                ),
              );
              setIsLocked(false);
              pendingRef.current = [];
            }, 800);
            return prev;
          }
        });

        const currentCards = cards;
        const a = currentCards.find((c) => c.id === aId);
        const b = currentCards.find((c) => c.id === bId);
        return a && b && a.pairId === b.pairId ? "match" : "no-match";
      }

      return "pending";
    },
    [isLocked, cards],
  );

  const reset = useCallback((newCards: Card[]) => {
    setCards([...newCards]);
    setIsLocked(false);
    setIsPreview(true);
    pendingRef.current = [];
  }, []);

  const allMatched = cards.every((c) => c.match);

  return {
    cards,
    isLocked,
    isPreview,
    flipCard,
    reset,
    revealPreview,
    allMatched,
  };
}
