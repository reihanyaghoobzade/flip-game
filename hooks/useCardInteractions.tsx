import { useCallback, useEffect, useRef, useState } from "react";
import type { Card } from "../configs/game.config";

export default function useCardInteractions(initialCards: Card[]) {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [isLocked, setIsLocked] = useState(false);
  const [isPreview, setIsPreview] = useState(true);

  const cardsRef = useRef<Card[]>(initialCards);
  const pendingRef = useRef<number[]>([]);
  const isLockedRef = useRef(false);
  const lastResultRef = useRef<"match" | "no-match" | null>(null);

  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

  const revealPreview = useCallback((duration = 2000) => {
    setIsPreview(true);
    setTimeout(() => setIsPreview(false), duration);
  }, []);

  const flipCard = useCallback(
    (id: number): "match" | "no-match" | "pending" | null => {
      if (isLockedRef.current) {
        if (pendingRef.current.includes(id) && lastResultRef.current) {
          return lastResultRef.current;
        }
        return null;
      }

      if (pendingRef.current.length >= 2) return null;

      const current = cardsRef.current;
      const card = current.find((c) => c.id === id);
      if (!card || card.flipped || card.match) return null;

      const updatedAfterFlip = current.map((c) =>
        c.id === id ? { ...c, flipped: true } : c,
      );
      cardsRef.current = updatedAfterFlip;
      setCards(updatedAfterFlip);

      pendingRef.current = [...pendingRef.current, id];

      if (pendingRef.current.length === 2) {
        const [aId, bId] = pendingRef.current;
        const a = updatedAfterFlip.find((c) => c.id === aId)!;
        const b = updatedAfterFlip.find((c) => c.id === bId)!;

        let result: "match" | "no-match";

        if (a.pairId === b.pairId) {
          result = "match";
          const matched = updatedAfterFlip.map((c) =>
            c.pairId === a.pairId ? { ...c, match: true, flipped: true } : c,
          );
          cardsRef.current = matched;
          setCards(matched);

          lastResultRef.current = result;
          isLockedRef.current = true;
          setIsLocked(true);

          setTimeout(() => {
            isLockedRef.current = false;
            setIsLocked(false);
            pendingRef.current = [];
            lastResultRef.current = null;
          }, 300);
        } else {
          result = "no-match";

          lastResultRef.current = result;
          isLockedRef.current = true;
          setIsLocked(true);

          setTimeout(() => {
            const reverted = cardsRef.current.map((c) =>
              [aId, bId].includes(c.id) ? { ...c, flipped: false } : c,
            );
            cardsRef.current = reverted;
            setCards(reverted);

            isLockedRef.current = false;
            setIsLocked(false);
            pendingRef.current = [];
            lastResultRef.current = null;
          }, 800);
        }

        return result;
      }

      return "pending";
    },
    [],
  );

  const reset = useCallback((newCards: Card[]) => {
    const copy = [...newCards];
    cardsRef.current = copy;
    setCards(copy);
    isLockedRef.current = false;
    setIsLocked(false);
    setIsPreview(true);
    pendingRef.current = [];
    lastResultRef.current = null;
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