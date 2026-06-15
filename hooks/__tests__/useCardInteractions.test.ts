import useCardInteractions from "../useCardInteractions";
import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockCards = [
  {
    id: 1,
    pairId: 1,
    src: "",
    flipped: false,
    match: false,
  },
  {
    id: 2,
    pairId: 1,
    src: "",
    flipped: false,
    match: false,
  },
  {
    id: 3,
    pairId: 2,
    src: "",
    flipped: false,
    match: false,
  },
  {
    id: 4,
    pairId: 2,
    src: "",
    flipped: false,
    match: false,
  },
];

describe("useCardInteractions", () => {
  it("should flip first card and return pending", () => {
    const { result } = renderHook(() => useCardInteractions(mockCards));

    let status: ReturnType<typeof result.current.flipCard>;

    act(() => {
      status = result.current.flipCard(1);
    });

    expect(status!).toBe("pending");

    expect(result.current.cards.find((c) => c.id === 1)?.flipped).toBe(true);
  });

  it("should match two cards", () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useCardInteractions(mockCards));

    act(() => {
      result.current.flipCard(1);
    });

    let status;

    act(() => {
      status = result.current.flipCard(2);
    });

    expect(status).toBe("match");

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(
      result.current.cards.filter((c) => c.pairId === 1).every((c) => c.match),
    ).toBe(true);

    expect(result.current.isLocked).toBe(false);

    vi.useRealTimers();
  });

  it("should not allow flipping more than two cards at the same time", () => {
    const { result } = renderHook(() => useCardInteractions(mockCards));

    act(() => {
      result.current.flipCard(1);
      result.current.flipCard(3);
      result.current.flipCard(4);
    });

    const flipped = result.current.cards.filter((c) => c.flipped);

    expect(flipped.length).toBe(2);
  });

  it("should handle no-match and flip cards back after delay", () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useCardInteractions(mockCards));

    act(() => {
      result.current.flipCard(1);
      result.current.flipCard(3);
    });

    let status;
    act(() => {
      status = result.current.flipCard(3);
    });

    expect(status).toBe("no-match");

    act(() => {
      vi.advanceTimersByTime(800);
    });

    expect(result.current.cards.find((c) => c.id === 1)?.flipped).toBe(false);
    expect(result.current.cards.find((c) => c.id === 3)?.flipped).toBe(false);

    expect(result.current.isLocked).toBe(false);

    vi.useRealTimers();
  });

  it("should reset game state correctly", () => {
    const { result } = renderHook(() => useCardInteractions(mockCards));

    act(() => {
      result.current.flipCard(1);
      result.current.flipCard(2);
    });

    act(() => {
      result.current.reset(mockCards);
    });

    expect(result.current.cards.every((c) => !c.flipped && !c.match)).toBe(
      true,
    );

    expect(result.current.isLocked).toBe(false);
    expect(result.current.isPreview).toBe(true);
  });

  it("should show preview and hide it after duration", () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useCardInteractions(mockCards));

    act(() => {
      result.current.revealPreview(1000);
    });

    expect(result.current.isPreview).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.isPreview).toBe(false);

    vi.useRealTimers();
  });

  it("should return true when all cards are matched", () => {
    const matchedCards = mockCards.map((c) => ({ ...c, match: true }));

    const { result } = renderHook(() => useCardInteractions(matchedCards));

    expect(result.current.allMatched).toBe(true);
  });

  it("should not flip cards when locked", () => {
    const { result } = renderHook(() => useCardInteractions(mockCards));

    act(() => {
      result.current.flipCard(1);
      result.current.flipCard(2);
    });

    let status;

    act(() => {
      status = result.current.flipCard(3);
    });

    expect(status).toBeNull();
  });
});
